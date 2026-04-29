// SPDX-FileCopyrightText: 2025 European Commission
//
// SPDX-License-Identifier: Apache-2.0

const WALLET_SCHEME = 'eudi-openid4vp';

export function parseJwtAndCreateWalletUri(token: string): string {
  if (!token) {
    throw new Error('Token is undefined or empty');
  }
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Token does not have the expected 3 parts');
  }
  const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  const parsed = JSON.parse(jsonPayload);

  return (
    `${WALLET_SCHEME}://?` +
    'response_type=' +
    parsed.response_type +
    '&response_mode=' +
    parsed.response_mode +
    '&client_id=redirect_uri' +
    encodeURIComponent(':' + parsed.response_uri) +
    '&response_uri=' +
    encodeURIComponent(parsed.response_uri) +
    '&dcql_query=' +
    encodeURIComponent(JSON.stringify(parsed.dcql_query)) +
    '&nonce=' +
    parsed.nonce +
    '&state=' +
    parsed.state
  );
}
