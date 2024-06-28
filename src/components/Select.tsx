interface IOptions {
  label: string;
  value: string;
}

interface IProps {
  label: string;
  options: Array<IOptions>;
  onChange(value: string): void;
  placeholder?: string;
  value: string;
  containerStyle?: string;
}

export function Select({
  label,
  onChange,
  options,
  containerStyle,
  placeholder,
  value,
}: IProps) {
  return (
    <div className={containerStyle}>
      <label
        htmlFor="hs-floating-input-email-value"
        className="mb-1 ml-1 text-sm text-gray-300"
      >
        {label}
      </label>
      <select
        data-hs-select={`{
        "placeholder": "${placeholder ?? ''}",
        "toggleTag": "<button type=\\"button\\"></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-amber-500 focus:ring-amber-500 before:absolute before:inset-0 before:z-[1] dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400",
        "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-700 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500 dark:bg-gray-900 dark:border-gray-700",
        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:text-gray-200 dark:focus:bg-gray-800",
        "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span><span class=\\"hidden hs-selected:block\\"><svg class=\\"flex-shrink-0 size-3.5 text-amber-600 dark:text-amber-500\\" xmlns=\\"http:.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><polyline points=\\"20 6 9 17 4 12\\"/></svg></span></div>",
        "extraMarkup": "<div class=\\"absolute top-1/2 end-3 -translate-y-1/2\\"><svg class=\\"flex-shrink-0 size-3.5 text-gray-500 dark:text-gray-500\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"m7 15 5 5 5-5\\"/><path d=\\"m7 9 5-5 5 5\\"/></svg></div>"
        }`}
        className="hidden"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option value={''}>{''}</option>
        {options.map(({ label, value }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
