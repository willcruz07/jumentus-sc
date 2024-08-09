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
      className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-sm hover:bg-gray-950"
    >
      <div className="rounded-lg bg-gray-800 p-2">
        <Image width={32} height={32} src={urlIcon} alt="icon card" />
      </div>

      <div>
        <h1 className="font-sans text-lg font-bold text-slate-300">{title}</h1>
        {subtitle && (
          <h4 className="text-center font-mono text-xs text-slate-300">
            {subtitle}
          </h4>
        )}
      </div>
    </div>
  );
}
