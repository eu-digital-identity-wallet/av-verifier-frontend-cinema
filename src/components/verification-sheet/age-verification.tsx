import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { parseJwtAndCreateWalletUri } from '../../lib/wallet-uri';

interface AgeVerificationProps {
  verified: boolean;
  data?: string;
  dcApiSupported: boolean;
  onDcApiClick: () => void;
  minAge: string;
  dcApiReady: boolean;
}

export function AgeVerification({
  verified,
  data,
  dcApiSupported,
  onDcApiClick,
  minAge,
  dcApiReady,
}: AgeVerificationProps) {
  const [dcApiClicked, setDcApiClicked] = useState(false);

  return (
    <>
      <h4 className="text-xl font-bold text-black">
        This film requires a proof of age
      </h4>
      <p className="mt-2 text-black">
        You must be at least {minAge} years old to purchase cinema tickets for
        this film. Your age will also be checked before you enter the cinema on
        the day of the screening.
      </p>

      {!verified && (
        <>
          {dcApiSupported ? (
            <div className="my-8">
              {!dcApiClicked ? (
                <button
                  disabled={!dcApiReady}
                  onClick={() => {
                    setDcApiClicked(true);
                    onDcApiClick();
                  }}
                  className="w-full rounded-lg bg-[#FAA71F] px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#e0951a] disabled:cursor-not-allowed disabled:opacity-50">
                  {dcApiReady ? 'Verify your age' : 'Preparing...'}
                </button>
              ) : (
                <p className="text-center text-gray-600">
                  Please follow the prompts on your device...
                </p>
              )}
            </div>
          ) : data ? (
            <QRCodeSVG
              value={parseJwtAndCreateWalletUri(data)}
              className="h-90 w-full py-8"
              aria-label="Scan with your wallet app"
            />
          ) : null}
        </>
      )}

      <h4 className="text-xl font-bold text-black">How it works:</h4>
      {dcApiSupported ? (
        <>
          <p className="mt-4 text-black">1. Click the button above.</p>
          <p className="text-black">
            2. Choose your Age Verification credential.
          </p>
          <p className="text-black">3. Approve sharing your age information.</p>
        </>
      ) : (
        <>
          <p className="mt-4 text-black">
            1. Open the Age Verification App on your smartphone.
          </p>
          <p className="text-black">2. Scan the QR code above.</p>
          <p className="text-black">3. Follow the instructions in the app.</p>
        </>
      )}
      <p className="mt-12 text-black">
        Once verified, this page will refresh automatically.
        <br /> 🔒 Your data is secure and will not be shared without your
        consent. Don't have the app yet? Download it on Googleplay or Appstore.
      </p>
    </>
  );
}
