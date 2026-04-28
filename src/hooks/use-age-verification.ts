// SPDX-FileCopyrightText: 2025 European Commission
//
// SPDX-License-Identifier: Apache-2.0

import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { decode } from '../lib/cbor';
import { AV_NAMESPACE, DEFAULT_AGE_CLAIM } from '../lib/constants';
import {
  executeDcApiVerification,
  isDcApiAvailable,
  prepareDcApiChallenge,
} from '../lib/dc-api';
import {
  CreatePresentationRequest,
  GetPresentationState,
} from '../lib/presentation';
import {
  DcApiDeviceResponse,
  Line,
  Page,
  PresentationState,
  TrustInfo,
  VerifiedAttribute,
} from '../lib/types';

const POLL_INTERVAL_MS = 1500;

export function useAgeVerification(ageRequirement: string = DEFAULT_AGE_CLAIM) {
  const dcApiSupported = useMemo(() => isDcApiAvailable(), []);
  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const [verifiedData, setVerifiedData] = useState<VerifiedAttribute[] | null>(
    null
  );
  const [trustInfo, setTrustInfo] = useState<TrustInfo[] | null>(null);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  const query = useQuery({
    queryKey: ['proofRequest', ageRequirement],
    queryFn: () => CreatePresentationRequest(ageRequirement),
    refetchOnWindowFocus: false,
    enabled: !dcApiSupported,
  });

  const dcChallenge = useQuery({
    queryKey: ['dcChallenge', ageRequirement],
    queryFn: () => prepareDcApiChallenge(ageRequirement),
    refetchOnWindowFocus: false,
    enabled: dcApiSupported,
  });

  const state = useQuery({
    queryKey: ['proofState', query.data?.transaction_id],
    queryFn: () => GetPresentationState(query.data.transaction_id),
    enabled: !!query.data?.transaction_id && !verificationCompleted,
    refetchInterval: POLL_INTERVAL_MS,
  });

  const processVerificationResult = useCallback(
    (data: DcApiDeviceResponse | PresentationState) => {
      if ('pages' in data) {
        const allLines = data.pages.flatMap((page: Page) => page.lines);
        setVerifiedData(allLines);

        const issuerLine = allLines.find((line: Line) => line.key === 'Issuer');
        const isTrusted = issuerLine
          ? !String(issuerLine.value).includes('Not in trust list')
          : false;

        setTrustInfo([
          {
            issuer_in_trusted_list: isTrusted,
            is_fully_trusted: isTrusted,
          },
        ] as TrustInfo[]);
        setVerificationCompleted(true);
        return;
      }

      if ('vp_token' in data) {
        if (data.trust_info) {
          setTrustInfo(data.trust_info);
        }
        try {
          const decodedData = decode(data.vp_token.proof_of_age);
          const firstAttestation = decodedData[0];
          if (
            firstAttestation &&
            firstAttestation.kind === 'single' &&
            firstAttestation.attributes
          ) {
            setVerifiedData(firstAttestation.attributes);
            setVerificationCompleted(true);
          }
        } catch (error) {
          console.error('Failed to decode attestation:', error);
          setVerificationError(
            error instanceof Error
              ? error.message
              : 'Failed to decode attestation'
          );
        }
      }
    },
    []
  );

  const runDcApiVerification = useCallback(async () => {
    setVerificationError(null);
    try {
      if (!dcChallenge.data) {
        throw new Error('Challenge not ready. Please try again.');
      }
      const result = await executeDcApiVerification(dcChallenge.data);
      if (result) {
        processVerificationResult(result);
      }
    } catch (error) {
      console.error('DC API verification failed:', error);
      setVerificationError(
        error instanceof Error
          ? error.message
          : 'Verification failed. Please try again.'
      );
    }
  }, [dcChallenge.data, processVerificationResult]);

  useEffect(() => {
    if (state.data && state.data.vp_token && state.data.vp_token.proof_of_age) {
      processVerificationResult(state.data);
    }

    return () => {
      setVerifiedData(null);
      setTrustInfo(null);
    };
  }, [state.data, processVerificationResult]);

  const isAgeVerified =
    !!verifiedData &&
    verifiedData.some((item) => {
      const keyMatch =
        item.key === `${AV_NAMESPACE}:${ageRequirement}` ||
        item.key === ageRequirement;
      const val = item.value;
      const normalizedVal =
        typeof val === 'string' ? val.replace(/"/g, '') : val;
      const valueTrue =
        normalizedVal === true ||
        normalizedVal === 'true' ||
        normalizedVal === 1 ||
        normalizedVal === '1';
      return keyMatch && valueTrue;
    });

  const isAgeVerifiedAndFullyTrusted =
    isAgeVerified && trustInfo?.[0]?.is_fully_trusted;

  return {
    dcApiSupported,
    dcApiReady: !!dcChallenge.data,
    presentationRequest: query.data?.request as string | undefined,
    presentationReady: dcApiSupported || !!query.data,
    verifiedData,
    verificationCompleted,
    verificationError,
    isAgeVerifiedAndFullyTrusted,
    runDcApiVerification,
  };
}
