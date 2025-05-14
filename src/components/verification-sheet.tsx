import { Dialog, ScrollArea } from 'radix-ui';
import EuWallet from '../assets/eu-wallet.svg';
import { QRCodeSVG } from 'qrcode.react';

export function VerificationSheet() {
  return (
    <>
      <div className="bg-sheet-header flex h-20 justify-evenly">
        <div className="px-4 py-2">
          <span className="text-xs text-gray-400">Step 1</span>
          <p className="text-primary text-lg font-bold">Age Verification</p>
        </div>
        <div className="px-4 py-2">
          <span className="text-xs text-gray-400">Step 2</span>
          <p className="text-primary/50 text-lg font-bold">Buy Ticket</p>
        </div>
        <div className="px-4 py-2">
          <span className="text-xs text-gray-400">Step 3</span>
          <p className="text-primary/50 text-lg font-bold">Your Seat</p>
        </div>
      </div>
      <div className="bg-sheet-header-step flex h-20 items-center justify-evenly">
        <h3 className="text-primary text-lg font-bold">Age Verification</h3>
        <img src={EuWallet} />
      </div>
      <Dialog.Close asChild>
        <button
          aria-label="Close"
          className="absolute top-24 right-4 cursor-pointer p-4 font-bold text-gray-600">
          ✕
        </button>
      </Dialog.Close>
      <ScrollArea.Root className="h-[calc(100vh-160px)] w-full overflow-auto px-8 pb-8">
        <h4 className="text-xl font-bold text-black">
          This film requires a proof of age
        </h4>
        <p className="mt-2 text-black">
          You must be at least 18 years old to purchase cinema tickets for this
          film. Your age will also be checked before you enter the cinema on the
          day of the screening.
        </p>
        <QRCodeSVG value="placeholder only" className="h-90 w-full py-8" />
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
