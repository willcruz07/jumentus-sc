type TVariant = 'solid' | 'outlined' | 'text';

interface IProps {
  text: string;
  variant: TVariant;
  onClick(): void;
  icon?: React.ReactNode;
  containerStyle?: string;
}

export function Button({
  text,
  variant = 'solid',
  onClick,
  containerStyle,
}: IProps) {
  const className: Record<TVariant, string> = {
    solid:
      'flex justify-center w-full py-3 px-4 items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none',
    outlined:
      'flex justify-center w-full py-3 px-4 items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800',

    text: 'flex justify-center w-full py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700',
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className[variant]} ${containerStyle}`}
    >
      {text}
    </button>
  );
}

export function ButtonIcon({ onClick, text, icon }: IProps) {
  return (
    <button
      className="flex h-min items-center gap-2 rounded-lg border border-gray-400 px-5 py-3 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:hover:bg-neutral-800"
      type="button"
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
