import clsx from 'clsx';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  text: string;
}

export function Button({ text, className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx('border-primary border-3 px-6 py-2', className)}
      {...props}>
      {text}
    </button>
  );
}
