import { HTMLAttributes } from 'react';

import { LoaderCircle } from 'lucide-react';

import { Button as ButtonUi } from './ui/button';

type TButtonElement = Pick<HTMLAttributes<HTMLButtonElement>, 'className'>;
type TVariants =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';

interface IProps extends TButtonElement {
  label: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  variant?: TVariants;
  onClick?(): void;
  lefIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button({
  label,
  onClick,
  variant = 'default',
  type = 'button',
  className,
  lefIcon,
  rightIcon,
  isLoading,
  disabled,
}: IProps) {
  const bgVariant: Record<TVariants, string> = {
    default:
      'flex justify-center w-full py-3 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none',
    outline: 'border-2 dark:text-slate-400 dark:hover:bg-slate-900',
    secondary:
      'bg-slate-800 transition-all ease-in-out text-slate-200 hover:bg-slate-900 dark:from-slate-800 dark:to-slate-600 dark:text-slate-300',
    destructive: '',
    ghost: '',
    link: '',
  };
  return (
    <ButtonUi
      disabled={isLoading || disabled}
      type={type}
      variant={variant}
      onClick={onClick}
      className={`h-12 text-sm font-semibold outline-none ${bgVariant[variant]} ${className}`}
    >
      {isLoading ? (
        <LoaderCircle className="animate-spin text-slate-100" />
      ) : (
        <>
          {lefIcon}
          {label}
          {rightIcon}
        </>
      )}
    </ButtonUi>
  );
}
