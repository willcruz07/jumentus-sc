/* eslint-disable @next/next/no-img-element */

import { IPlayer } from '@/store/usePlayers/types';

export function PlayersCard({
  assists,
  matches,
  fullName,
  goals,
  name,
  saves,
  tackles,
}: IPlayer) {
  return (
    <div className="shadow-s mt-1 flex flex-row items-center rounded-lg border border-gray-800 bg-gray-900">
      <div className="flex min-w-20 flex-col items-center justify-center gap-1 pl-3 pr-6">
        <img
          className="inline-block size-10 rounded-full object-cover"
          src={`/img/players/${fullName?.toLowerCase().replace(' ', '_')}.jpg`}
          alt="Image Description"
          onError={(e: any) => {
            e.target.onerror === null;
            e.target.src = '/img/logo.png';
          }}
        />
        <h1 className="overflow-hidden text-ellipsis text-nowrap font-sans text-xs text-gray-400">
          {name}
        </h1>
      </div>

      <div className="mb-2 mr-2 mt-2 flex w-full flex-row gap-3 rounded-lg border border-gray-800 bg-gray-900 p-2 shadow-sm">
        <div className="grid w-full grid-cols-5">
          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-semibold">Jogos</h5>
            <h6 className="font-sans text-sm text-gray-400">{matches}</h6>
          </div>
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
