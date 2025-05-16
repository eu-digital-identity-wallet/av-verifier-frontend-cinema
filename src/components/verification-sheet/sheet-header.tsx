import { Dialog } from 'radix-ui';
import clsx from 'clsx';
import EuWallet from '../../assets/eu-wallet.svg';

export function SheetHeader({ buyTickets }: { buyTickets: boolean }) {
  return (
    <>
      <div className="bg-sheet-header flex h-20 justify-evenly">
        <div className="px-4 py-2">
          <span className="text-xs text-gray-400">Step 1</span>
          <p
            className={clsx(
              'text-lg',
              buyTickets
                ? 'text-primary/50 font-bold'
                : 'text-primary font-bold'
            )}>
            Age Verification
          </p>
        </div>
        <div className="px-4 py-2">
          <span className="text-xs text-gray-400">Step 2</span>
          <p
            className={clsx(
              'text-lg',
              buyTickets
                ? 'text-primary font-bold'
                : 'text-primary/50 font-bold'
            )}>
            Buy Ticket
          </p>
        </div>
        <div className="px-4 py-2">
          <span className="text-xs text-gray-400">Step 3</span>
          <p className="text-primary/50 text-lg font-bold">Your Seat</p>
        </div>
      </div>
      <div
        className={clsx(
          'bg-sheet-header-step flex h-20 items-center',
          buyTickets ? 'justify-start pl-8' : 'justify-evenly'
        )}>
        <h3 className="text-primary text-lg font-bold">
          {buyTickets ? 'Buy Ticket' : 'Age Verification'}
        </h3>
        {!buyTickets && <img src={EuWallet} />}
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
