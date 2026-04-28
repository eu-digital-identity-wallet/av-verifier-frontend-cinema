import { Separator } from 'radix-ui';
import { SelectBox } from '../select-box';
import { Button } from '../ui/button';

export function BuyTickets({ onNext }: { onNext: () => void }) {
  return (
    <div className="mt-4">
      <h4 className="text-xl font-bold text-black">
        Thank you for verifying your age, you can now purchase your tickets
      </h4>
      <div className="mt-8">
        <div className="grid grid-cols-5 items-center gap-4 text-center text-sm text-black">
          <div />
          <p>
            Super <br /> Sparpreis
          </p>
          <p>Sparpreis</p>
          <p>Regular</p>
          <p>Premium</p>
        </div>
        <Separator.Root
          className="my-2 h-[1px] w-full bg-gray-300"
          orientation="horizontal"
        />
        <div className="grid grid-cols-5 gap-4">
          <p className="text-lg text-black">
            Tickets
            <br /> <span className="text-sm text-gray-600">18+</span>
          </p>
          <SelectBox amount={1} price="9,99" borderColor="border-green-500" />
          <SelectBox amount={0} price="11,99" borderColor="border-blue-500" />
          <SelectBox amount={0} price="12,99" borderColor="border-black" />
          <SelectBox amount={0} price="15,99" borderColor="border-primary" />
        </div>
        <Separator.Root
          className="mt-2 mb-6 h-[1px] w-full bg-gray-300"
          orientation="horizontal"
        />
        <div className="flex justify-between">
          <p className="text-lg text-black">
            Tickets
            <br />{' '}
            <span className="text-sm text-gray-600">
              3 bis einschl. <br /> 11 Jahre
            </span>
          </p>
          <p className="text-gray-600">Nicht vorhanden</p>
          <div />
        </div>
        <Separator.Root
          className="my-6 h-[1px] w-full bg-gray-300"
          orientation="horizontal"
        />
        <div className="flex justify-between">
          <p className="text-lg text-black">
            Gesamt
            <br />
            <span className="text-sm text-gray-600">
              Exklusive 10 % Onlinevorverkaufsgebühr
            </span>
          </p>
          <p className="text-black">9,99 €</p>
        </div>
        <Button
          onClick={onNext}
          text="Next"
          className="mt-8 w-full text-black"
        />
      </div>
    </div>
  );
}
