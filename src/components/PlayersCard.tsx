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
  manOfTheMatch,
  shitOfTheMatch,
}: IPlayer) {
  return (
    <div className="shadow-s flex flex-col items-center gap-4 rounded-lg border border-gray-800 bg-gray-900 pt-4">
      <div className="flex w-full justify-around">
        <div className="flex flex-col items-center gap-2">
          <h5 className="font-sans text-sm font-bold text-slate-500">
            Man of the match
          </h5>
          <h6 className="text-lg font-bold text-gray-400">
            {manOfTheMatch ?? '0'}
          </h6>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <img
            className="inline-block size-24 rounded-full object-cover"
            src={`/img/players/${fullName?.toLowerCase().replace(' ', '_')}.jpg`}
            alt="Image Description"
            onError={(e: any) => {
              e.target.onerror === null;
              e.target.src = '/img/logo.png';
            }}
          />
          <h1 className="overflow-hidden text-ellipsis text-nowrap font-sans text-xl text-gray-400">
            {name}
          </h1>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h5 className="font-sans text-sm font-bold text-slate-500">
            Baranga
          </h5>
          <h6 className="text-lg font-bold text-gray-400">
            {shitOfTheMatch ?? '0'}
          </h6>
        </div>
      </div>

      <div className="flex w-full flex-row gap-3 rounded-lg border border-gray-800 bg-gray-900 p-2 shadow-sm">
        <div className="grid w-full grid-cols-5">
          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-bold text-slate-200">
              Jogos
            </h5>
            <h6 className="font-sans text-sm text-gray-400">{matches}</h6>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-bold text-slate-200">Gols</h5>
            <h6 className="font-sans text-sm text-gray-400">{goals}</h6>
          </div>

          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-bold text-slate-200">
              Assist.
            </h5>
            <h6 className="font-sans text-sm text-gray-400">{assists}</h6>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-bold text-slate-200">
              Faltas
            </h5>
            <h6 className="font-sans text-sm text-gray-400">{tackles}</h6>
          </div>
          <div className="flex flex-col items-center gap-1">
            <h5 className="font-sans text-sm font-bold text-slate-200">
              Defes.
            </h5>
            <h6 className="font-sans text-sm text-gray-400">{saves}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
