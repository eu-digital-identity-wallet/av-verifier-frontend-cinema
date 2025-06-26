import { QRCodeSVG } from 'qrcode.react';

export function AgeVerification({
  verified,
  data,
}: {
  verified: boolean;
  data: string;
}) {
  return (
    <>
      <h4 className="text-xl font-bold text-black">
        This film requires a proof of age
      </h4>
      <p className="mt-2 text-black">
        You must be at least 18 years old to purchase cinema tickets for this
        film. Your age will also be checked before you enter the cinema on the
        day of the screening.
      </p>
      {!verified && data && (
        <QRCodeSVG
          value={parseJwtAndCreateUri(data)}
          className="h-90 w-full py-8"
        />
      )}
      <h4 className="text-xl font-bold text-black">How it works:</h4>
      <p className="mt-4 text-black">
        1. Open the Age Verification App on your Smartphone.
      </p>
      <p className="text-black">2. Use the app to scan the QR code above.</p>
      <p className="text-black">
        3. Follow the instructions in the app to complete the verification.
      </p>
      <p className="mt-12 text-black">
        Once verified, this page will refresh automatically.
        <br /> 🔒 Your data is secure and will not be shared without your
        consent. Don't have the app yet? Download it on Googleplay or Appstore.
      </p>
    </>
  );
}

function parseJwtAndCreateUri(token: string): string {
  console.log('token:', token);
  if (!token) {
    throw new Error('Token is undefined or empty');
  }
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Token does not have the expected 3 parts');
  }
  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );
  const parsed = JSON.parse(jsonPayload);

  console.log(parsed);

  const request_new =
    'av' +
    '://' +
    '?client_id=redirect_uri:' +
    parsed.response_uri +
    '&response_type=' +
    parsed.response_type +
    '&response_mode=' +
    parsed.response_mode +
    '&response_uri=' +
    parsed.response_uri +
    '&presentation_definition_uri=' +
    parsed.presentation_definition_uri +
    '&dcql=null' +
    //parsed.dcql_query +
    '&nonce=' +
    parsed.nonce +
    '&state=' +
    parsed.state;

  console.log(request_new);

  return request_new;
}
