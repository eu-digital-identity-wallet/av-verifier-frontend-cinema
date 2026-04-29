// SPDX-FileCopyrightText: 2025 European Commission
//
// SPDX-License-Identifier: Apache-2.0

import {
  DcApiDeviceResponse,
  DcApiResponse,
  IdentityRequestProvider,
} from './types';
import { AV_DOC_TYPE, DC_API_PROTOCOL } from './constants';

const dcApiVerifierUrl = import.meta.env.VITE_DC_API_VERIFIER_BASE_URL;

export class DcApiUnavailableError extends Error {
  constructor() {
    super('Age verification is not available on this browser.');
    this.name = 'DcApiUnavailableError';
  }
}

export function isDcApiAvailable(): boolean {
  return (
    typeof window['DigitalCredential' as keyof Window] !== 'undefined' &&
    typeof navigator.credentials?.get === 'function'
  );
}

export async function prepareDcApiChallenge(
  claim: string = 'age_over_18'
): Promise<DcApiResponse> {
  const challengeResponse = await fetch(
    `${dcApiVerifierUrl}/verifier/dcBegin`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        format: 'mdoc',
        docType: AV_DOC_TYPE,
        requestId: claim,
        protocol: DC_API_PROTOCOL,
        origin: window.location.origin,
        host: window.location.host,
        signRequest: true,
        encryptResponse: true,
      }),
    }
  );

  if (!challengeResponse.ok) {
    throw new Error(
      `Failed to get challenge from dc-api: ${challengeResponse.status} ${challengeResponse.statusText}`
    );
  }
  return (await challengeResponse.json()) as DcApiResponse;
}

export async function executeDcApiVerification(
  challenge: DcApiResponse
): Promise<DcApiDeviceResponse | undefined> {
  if (!isDcApiAvailable()) {
    throw new DcApiUnavailableError();
  }

  const providers: IdentityRequestProvider[] = [
    {
      protocol: challenge.dcRequestProtocol,
      data: JSON.parse(challenge.dcRequestString),
    },
  ];

  const credentialsResponse = (await navigator.credentials.get({
    digital: { requests: providers },
    mediation: 'required',
  })) as DigitalCredential | null;

  if (!credentialsResponse) {
    return undefined;
  }
  return completeDcApiSession(challenge.sessionId, credentialsResponse);
}

async function completeDcApiSession(
  sessionId: string,
  credential: DigitalCredential
): Promise<DcApiDeviceResponse> {
  const dataStr =
    typeof credential.data === 'string'
      ? credential.data
      : JSON.stringify(credential.data);

  const response = await fetch(`${dcApiVerifierUrl}/verifier/dcGetData`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sessionId,
      credentialProtocol: credential.protocol,
      credentialResponse: dataStr,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Backend verification failed: ${response.status} ${errorText}`
    );
  }

  return (await response.json()) as DcApiDeviceResponse;
}
