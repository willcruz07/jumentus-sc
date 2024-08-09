import * as React from 'react';

import {
  Select as SelectUI,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Label } from './ui/label';

export interface ISelectOptions {
  label: string;
  value: string;
}

interface IProps {
  label: string;
  value: string;
  onChange(value: string): void;
  placeholder?: string;
  options: Array<ISelectOptions>;
  onError?: string;
  disabled?: boolean;
}

export function Select({
  label,
  onChange,
  options,
  value,
  placeholder,
  onError,
  disabled,
}: IProps) {
  const labelOnerror = React.useMemo(() => {
    return onError ? 'text-red-500 dark:text-red-900' : 'text-slate-500';
  }, [onError]);

  return (
    <div className="flex flex-col gap-2 bg-transparent dark:bg-transparent">
      <Label
        className={`${labelOnerror}`}
        aria-disabled={disabled}
        htmlFor={label}
      >
        {label}
      </Label>

      <SelectUI value={value} onValueChange={(v) => onChange(v)}>
        <SelectTrigger className="h-10 border-slate-600 bg-transparent text-slate-300 outline-none placeholder:text-slate-300 focus-within:ring-0 focus:border-2 focus:border-slate-800 focus:ring-0 focus:ring-transparent dark:bg-transparent">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem
                className="cursor-pointer text-slate-800"
                key={opt.value}
                value={opt.value}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </SelectUI>
      {onError && (
        <span className="text-xs italic text-red-600 dark:text-red-900">
          {onError ?? ''}
        </span>
      )}
    </div>
  );
}
