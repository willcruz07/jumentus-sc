/* eslint-disable @next/next/no-img-element */

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
    <div className="mt-1 flex flex-row items-center rounded-lg border border-gray-800 bg-gray-900 shadow-sm">
      <div className="flex min-w-20 flex-col items-center gap-1 pl-3 pr-6">
        <div className="rounded-lg bg-gray-800 p-1">
          <div
            style={{ backgroundColor: teamColor }}
            className={`flex h-10 w-9 items-center justify-center rounded-lg`}
          >
            <h1 className="text-2xl font-black text-white">{numberTeam}</h1>
          </div>
        </div>
      </div>

      <div
        onClick={() => onClick && onClick()}
        className="mb-2 mr-2 mt-2 flex w-full flex-row gap-3 rounded-lg border border-gray-800 bg-gray-900 p-2 shadow-sm"
      >
        <div className="grid w-full grid-cols-6">
          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">V.</h5>
            <h6 className="font-sans text-sm text-gray-400">{win}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">E.</h5>
            <h6 className="font-sans text-sm text-gray-400">{draw}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">D.</h5>
            <h6 className="font-sans text-sm text-gray-400">{loss}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">GP.</h5>
            <h6 className="font-sans text-sm text-gray-400">{goalsScored}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">GC.</h5>
            <h6 className="font-sans text-sm text-gray-400">{goalsConceded}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">SG.</h5>
            <h6 className="font-sans text-sm text-gray-400">
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
