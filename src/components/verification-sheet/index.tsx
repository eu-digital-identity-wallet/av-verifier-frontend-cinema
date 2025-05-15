import { ScrollArea } from 'radix-ui';
import { QRCodeSVG } from 'qrcode.react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  CreatePresentationRequest,
  GetPresentationState,
} from '../../lib/presentation';
import { SheetHeader } from './sheet-header';

export default function VerificationSheet() {
  const [verified, setVerified] = useState(false);

  const query = useQuery({
    queryKey: ['proofRequest'],
    queryFn: async () => CreatePresentationRequest(),
    refetchOnWindowFocus: false,
  });

  const state = useQuery({
    queryKey: ['proofState', query.data?.transaction_id],
    queryFn: async () => GetPresentationState(query.data.transaction_id),
    enabled: !!query.data?.transaction_id && !verified,
    refetchInterval: 1500,
  });

  if (!verified && state.data === true) {
    setVerified(true);
  }

  return (
    <>
      <SheetHeader />

      <ScrollArea.Root className="h-[calc(100vh-160px)] w-full overflow-auto px-8 pb-8">
        <h4 className="text-xl font-bold text-black">
          This film requires a proof of age
        </h4>
        <p className="mt-2 text-black">
          You must be at least 18 years old to purchase cinema tickets for this
          film. Your age will also be checked before you enter the cinema on the
          day of the screening.
        </p>
        {!verified && query.data && query.data.transaction_id && (
          <QRCodeSVG
            value={`eudi-openid4vp://?client_id=${encodeURIComponent(
              query.data.client_id
            )}&request_uri=${encodeURIComponent(
              query.data.request_uri
            )}&request_uri_method=${encodeURIComponent(query.data.request_uri_method)}`}
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
          consent. Don't have the app yet? Download it on Googleplay or
          Appstore.
        </p>
      </ScrollArea.Root>
    </>
  );
}
