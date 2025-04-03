/* eslint-disable @typescript-eslint/no-unused-expressions */
import Logo from '@/assets/logo.png';
import { IPlayersScoreOnTheDay } from '@/store/useMatches/types';

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
      onClick={() => (onClick && onClick(name)) || (onEditPlayer && onEditPlayer())}
      className={`flex bg-${teamColor} flex-col overflow-hidden rounded-lg border border-gray-800 shadow-sm hover:opacity-80`}
    >
      <div className="flex flex-row justify-between overflow-hidden">
        <img
          className="size-24 object-cover"
          src={`/players/${fullName?.toLowerCase().replace(' ', '_')}.jpg`}
          alt="Image Description"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError={(e: any) => {
            e.target.onerror === null;
            e.target.src = Logo;
          }}
        />

        <h1 className="mt-4 mr-4 text-center text-xl font-bold text-slate-100 drop-shadow-lg">
          {fullName}
        </h1>
      </div>

      <div
        // onClick={() => onEditPlayer && onEditPlayer()}
        className="flex w-full flex-row gap-3 border border-gray-800 bg-gray-900 p-2 shadow-sm hover:bg-gray-950"
      >
        <div className="grid w-full grid-cols-4">
          <div className="flex flex-col items-center gap-1">
            <h5 className="text-base font-bold text-slate-200">Gols</h5>
            <h6 className="text-base text-slate-400">{goals}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="text-base font-bold text-slate-300">Assist.</h5>
            <h6 className="text-base text-gray-400">{assists}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="text-base font-bold text-slate-300">Faltas</h5>
            <h6 className="text-base text-gray-400">{tackles}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="text-base font-bold text-slate-300">Defesas</h5>
            <h6 className="text-base text-gray-400">{saves}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
