import { HTMLInputTypeAttribute } from 'react';

interface IProps {
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  onChange(value: string): void;
}

export function Input({ label, type, onChange, value }: IProps) {
  return (
    <div className="relative">
      <input
        type={type}
        id="hs-floating-input-email-value"
        className="peer block w-full rounded-lg border-gray-700 p-4 text-sm placeholder:text-transparent autofill:pb-2 autofill:pt-6 focus:border-amber-600 focus:pb-2 focus:pt-6 focus:ring-amber-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-neutral-400 dark:focus:ring-neutral-600 [&:not(:placeholder-shown)]:pb-2 [&:not(:placeholder-shown)]:pt-6"
        placeholder=""
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label
        htmlFor="hs-floating-input-email-value"
        className="pointer-events-none absolute start-0 top-0 h-full origin-[0_0] truncate border border-transparent p-4 text-sm transition duration-100 ease-in-out peer-focus:-translate-y-1.5 peer-focus:translate-x-0.5 peer-focus:scale-90 peer-focus:text-gray-500 peer-disabled:pointer-events-none peer-disabled:opacity-50 peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:translate-x-0.5 peer-[:not(:placeholder-shown)]:scale-90 peer-[:not(:placeholder-shown)]:text-gray-500 dark:text-neutral-500 dark:peer-focus:text-neutral-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500"
      >
        {label}
      </label>
    </div>
  );
}
