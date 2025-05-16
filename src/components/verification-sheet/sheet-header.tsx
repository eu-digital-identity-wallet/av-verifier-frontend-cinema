import { Dialog } from 'radix-ui';
import EuWallet from '../../assets/eu-wallet.svg';

export function SheetHeader() {
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
    </>
  );
}
