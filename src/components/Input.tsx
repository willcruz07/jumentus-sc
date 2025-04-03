import { InputHTMLAttributes } from 'react';

import { Input as InputUI } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function Input({ label, id, type, ...rest }: IProps) {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={id} className="text-slate-300">
        {label}
      </Label>
      <InputUI className="text-slate-300" id={id} type={type} {...rest} />
    </div>
  );
}
