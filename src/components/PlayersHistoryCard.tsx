import { IPlayersScoreOnTheDay } from '@/store/useMatches/types';

/* eslint-disable @next/next/no-img-element */
interface IProps extends IPlayersScoreOnTheDay {
  onClick?(value: string): void;
  onEditPlayer?(): void;
  teamColor?: string;
}

export function PlayerHistoryCard({
  fullName,
  name,
  assists,
  goals,
  saves,
  tackles,
  onClick,
  teamColor,
  onEditPlayer,
}: IProps) {
  
  return (
    <div
      onClick={() => onClick && onClick(name)}
      style={{ backgroundColor: teamColor ?? '#111827' }}
      className={`mt-1 flex flex-row items-center rounded-lg border border-gray-800 py-1 shadow-sm`}
    >
      <div className="ml-1 flex min-w-20 flex-col items-center gap-1 pl-3 pr-6">
        <img
          className="inline-block size-12 rounded-full object-cover"
          src={`/img/players/${fullName?.toLowerCase().replace(' ', '_')}.jpg`}
          alt="Image Description"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError={(e: any) => {
            e.target.onerror === null;
            e.target.src = '/img/logo.png';
          }}
        />

        <h1 className="w-24 truncate text-nowrap text-center font-sans text-sm font-bold text-white drop-shadow-lg">
          {name}
        </h1>
      </div>

      <div
        onClick={() => onEditPlayer && onEditPlayer()}
        className="mb-2 mr-2 mt-2 flex w-full flex-row gap-3 rounded-lg border border-gray-800 bg-gray-900 p-2 shadow-sm hover:bg-gray-950"
      >
        <div className="grid w-full grid-cols-4">
          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">Gols</h5>
            <h6 className="font-sans text-sm text-gray-400">{goals}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">assists.</h5>
            <h6 className="font-sans text-sm text-gray-400">{assists}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">Desar.</h5>
            <h6 className="font-sans text-sm text-gray-400">{tackles}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">Defes.</h5>
            <h6 className="font-sans text-sm text-gray-400">{saves}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
