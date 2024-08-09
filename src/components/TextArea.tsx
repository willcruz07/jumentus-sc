import { HTMLAttributes, useMemo } from 'react';

import { Label } from './ui/label';
import { Textarea as TextAreaUI } from './ui/textarea';

type TDivElement = Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

interface IProps extends TDivElement {
  label: string;
  value: string;
  onChange(value: string): void;
  disabled?: boolean;
  onError?: string;
  placeholder?: string;
}

export function TextArea({
  label,
  onChange,
  value,
  disabled,
  onError,
  placeholder,
  className,
}: IProps) {
  const inputOnError = useMemo(() => {
    return onError ? 'border-red-500 dark:border-red-950' : '';
  }, [onError]);

  const labelOnerror = useMemo(() => {
    return onError ? 'text-red-500 dark:text-red-900' : 'text-slate-500';
  }, [onError]);

  return (
    <div
      className={`flex flex-col gap-2 bg-transparent dark:bg-transparent ${className}`}
    >
      <Label
        aria-disabled={disabled}
        className={` ${labelOnerror}`}
        htmlFor={label}
      >
        {label}
      </Label>
      <TextAreaUI
        id={label}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={`${inputOnError} border-slate-500'focus:ring-transparent border-input border-slate-600 bg-transparent text-slate-300 outline-none transition-all ease-in-out placeholder:text-slate-300 focus-within:ring-0 focus:border-2 focus-visible:border-slate-500 focus-visible:ring-0 dark:bg-transparent`}
        onChange={(e) => onChange(e.target.value)}
      />
      {onError && (
        <span className="text-xs italic text-red-600 dark:text-red-900">
          {onError ?? ''}
        </span>
      )}
    </div>
  );
}
