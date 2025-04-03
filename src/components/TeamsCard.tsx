import { ITeamDetails } from '@/store/useMatches/types';

interface IProps extends ITeamDetails {
  teamColor: string;
  numberTeam: string;
  onClick?(): void;
}

export function TeamsCard({
  teamColor,
  draw,
  goalsConceded,
  goalsScored,
  numberTeam,
  onClick,
  loss,
  win,
}: IProps) {
  return (
    <div
      style={{ backgroundColor: teamColor }}
      className="flex flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-900 shadow-sm"
    >
      <div className={`flex p-4`}>
        <h1 className="text-2xl font-black text-white">{`Time - ${numberTeam}`}</h1>
      </div>

      <div
        onClick={() => onClick && onClick()}
        className="flex w-full flex-row gap-3 rounded-tl-lg rounded-tr-lg border border-gray-800 bg-gray-900 py-2 shadow-sm"
      >
        <div className="grid w-full grid-cols-6">
          <div className="flex flex-col items-center gap-1">
            <h5 className="text-base font-bold text-slate-300">V.</h5>
            <h6 className="text-base text-slate-500">{win}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="text-base font-bold text-slate-300">E.</h5>
            <h6 className="text-base text-slate-500">{draw}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="text-base font-bold text-slate-300">D.</h5>
            <h6 className="text-base text-slate-500">{loss}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="text-base font-bold text-slate-300">GP.</h5>
            <h6 className="text-base text-slate-500">{goalsScored}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="text-base font-bold text-slate-300">GC.</h5>
            <h6 className="text-base text-slate-500">{goalsConceded}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="text-base font-bold text-slate-300">SG.</h5>
            <h6 className="text-base text-slate-500">
              {goalsScored - goalsConceded >= 0
                ? goalsScored - goalsConceded
                : goalsScored - goalsConceded}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
