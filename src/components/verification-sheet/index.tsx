import { useEffect, useState } from 'react';
import {
  CreatePresentationRequest,
  GetPresentationState,
} from '../../lib/presentation';
import { useQuery } from '@tanstack/react-query';
import { SheetHeader } from './sheet-header';
import { ScrollArea } from 'radix-ui';
import { AgeVerification } from './age-verification';
import { VerificationSuccess } from './verification-success';
import { VerificationFailure } from './verification-failure';
import { BuyTickets } from './buy-tickets';
import { decode } from '../../lib/cbor';
import { TrustInfo } from '../../lib/types';

export function VerificationSheet() {
  const [verificationCompleted, setVerificationCompleted] = useState(false);
  const [buyTickets, setBuyTickets] = useState(false);
  const [verifiedData, setVerifiedData] = useState<
    | {
        key: string;
        value: string | number | boolean;
      }[]
    | null
  >(null);
  const [trustInfo, setTrustInfo] = useState<TrustInfo[] | null>(null);

  const query = useQuery({
    queryKey: ['proofRequest'],
    queryFn: async () => CreatePresentationRequest(),
    refetchOnWindowFocus: false,
  });

  const state = useQuery({
    queryKey: ['proofState', query.data?.transaction_id],
    queryFn: async () => GetPresentationState(query.data.transaction_id),
    enabled: !!query.data?.transaction_id && !verificationCompleted,
    refetchInterval: 1500,
  });

  const isAgeOver18AndFullyTrusted = verifiedData
    ? verifiedData.filter(
        (item) => item.key === 'eu.europa.ec.av.1:age_over_18'
      )[0]?.value === 'true' && trustInfo?.[0]?.is_fully_trusted
    : false;

  useEffect(() => {
    if (state.data && state.data.vp_token && state.data.vp_token.proof_of_age) {
      if (state.data.trust_info) {
        setTrustInfo(state.data.trust_info);
      }

      try {
        const decodedData = decode(state.data.vp_token.proof_of_age);
        console.log('decodedData:', decodedData);
        if (decodedData.length > 0) {
          const firstAttestation = decodedData[0];
          if (
            firstAttestation.kind === 'single' &&
            firstAttestation.attributes
          ) {
            setVerifiedData(firstAttestation.attributes);
            setVerificationCompleted(true);
          }
        }
      } catch (error) {
        console.error('Failed to decode attestation:', error);
      }
    }

    return () => {
      setVerifiedData(null);
      setTrustInfo(null);
    };
  }, [state.data]);

  if (!query.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SheetHeader buyTickets={buyTickets} />
      <ScrollArea.Root className="h-[calc(100vh-160px)] w-full overflow-auto px-8 pb-8">
        {!verificationCompleted && query.data?.request ? (
          <AgeVerification
            verified={verificationCompleted}
            data={query?.data.request}
          />
        ) : verificationCompleted && !isAgeOver18AndFullyTrusted ? (
          <VerificationFailure />
        ) : !buyTickets ? (
          <VerificationSuccess setBuyTicket={setBuyTickets} />
        ) : (
          <BuyTickets />
        )}
      </ScrollArea.Root>
    </>
  );
}
