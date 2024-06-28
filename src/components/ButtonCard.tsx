import Image from 'next/image';

interface IProps {
  title: string;
  subtitle?: string;
  urlIcon: string;
  onClick(): void;
}

export function ButtonCard({ title, subtitle, urlIcon, onClick }: IProps) {
  return (
    <div
      onClick={() => onClick()}
      className="flex border p-4 border-gray-800 gap-3 items-center rounded-lg bg-gray-900 shadow-sm hover:bg-gray-950"
    >
      <div className="bg-gray-800 rounded-lg p-2">
        <Image width={32} height={32} src={urlIcon} alt="icon card" />
      </div>

      <div>
        <h1 className="font-sans font-bold text-lg">{title}</h1>
        {subtitle && (
          <h4 className="font-mono  text-center text-xs text-gray-500">
            {subtitle}
          </h4>
        )}
      </div>
    </div>
  );
}
