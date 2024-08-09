import { ForwardedRef, HTMLAttributes, useMemo, useState } from 'react';

import { TIconTypes } from '@/models/appTypes';

import { Eye, EyeOff } from 'lucide-react';

import { Input as InputUI } from './ui/input';
import { Label } from './ui/label';

type TDivElement = Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

interface IProps extends TDivElement {
  label: string;
  value: string;
  onChange(value: string): void;
  disabled?: boolean;
  onError?: string;
  onHelper?: string;
  password?: boolean;
  placeholder?: string;
  type?: 'text' | 'number' | 'search' | 'email' | 'url' | 'tel';
  inputRef?: ForwardedRef<HTMLInputElement>;
}

export function Input({
  label,
  onChange,
  value,
  disabled,
  onHelper,
  onError,
  placeholder,
  password,
  className,
  type = 'text',
  inputRef,
}: IProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [passwordIsVisible, setPasswordIsVisible] = useState(password);

  const inputOnError = useMemo(() => {
    return onError ? 'border-red-500 dark:border-red-950' : '';
  }, [onError]);

  const labelOnerror = useMemo(() => {
    return onError ? 'text-red-500 dark:text-red-900' : 'text-slate-500';
  }, [onError]);

  const EyeIcon = useMemo((): TIconTypes => {
    return passwordIsVisible ? Eye : EyeOff;
  }, [passwordIsVisible]);

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
      <div
        className={`flex h-10 items-center rounded-md border ${inputOnError} border-input border-slate-600 pr-3 transition-all ease-in-out ${isFocused ? 'border-2 border-slate-500' : ''}`}
      >
        <InputUI
          ref={inputRef}
          id={label}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          type={password && passwordIsVisible ? 'password' : type}
          min={type === 'number' ? '0' : undefined}
          className={`${inputOnError} bg-transparent text-slate-100 placeholder:text-slate-300 dark:bg-transparent`}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {password && (
          <EyeIcon
            onClick={() => setPasswordIsVisible((pS) => !pS)}
            className="cursor-pointer text-slate-400"
          />
        )}
      </div>
      {onError && (
        <span className="text-xs italic text-red-600 dark:text-red-900">
          {onError ?? ''}
        </span>
      )}
      {onHelper && (
        <span className="text-xs italic text-slate-400 dark:text-slate-400">
          {onHelper ?? ''}
        </span>
      )}
    </div>
  );
}
