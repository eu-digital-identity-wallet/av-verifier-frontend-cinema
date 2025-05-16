import clsx from 'clsx';
import ChevronDown from '../assets/chevron-down.svg';

interface SelectBoxProps {
  borderColor?: string;
  amount: number;
  price: string;
}

export function SelectBox({
  borderColor = 'border-green-500',
  amount,
  price,
}: SelectBoxProps) {
  return (
    <div>
      <div
        className={clsx(
          'flex h-20 w-20 items-center justify-center gap-1 border-2',
          borderColor
        )}>
        <p className="text-black">{amount}</p>
        <img src={ChevronDown} />
      </div>
      <p className="my-2 text-center text-sm text-gray-500">{price} €</p>
    </div>
  );
}
