import { useMemo } from 'react';

import { useAuth } from '@/store/useAuth';
import { IPlayersScoreOnTheDay } from '@/store/useMatches/types';
import { CircleMinus, CirclePlus } from 'lucide-react';

/* eslint-disable @next/next/no-img-element */
export interface IPlayersOfTheMatch extends IPlayersScoreOnTheDay {
  votes: number;
  onAddVote(): void;
  onSubtract(): void;
}
export function CardsVotes({
  fullName,
  assists,
  goals,
  saves,
  tackles,
  onAddVote,
  votes,
  onSubtract,
}: IPlayersOfTheMatch) {
  const { currentUser } = useAuth();

  const isAdmin = useMemo(
    () =>
      currentUser?.email?.includes('admin') ||
      currentUser?.email?.includes('will@'),
    [currentUser]
  );
  return (
    <div className="mt-1 flex flex-col items-center rounded-lg border border-gray-800 bg-gray-900 pt-6 shadow-sm">
      <div className="mb-4 flex min-w-20 flex-col items-center">
        <img
          className="mb-2 inline-block size-28 rounded-full object-cover"
          src={`/img/players/${fullName?.toLowerCase().replace(' ', '_')}.jpg`}
          alt="Image Description"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError={(e: any) => {
            e.target.onerror === null;
            e.target.src = '/img/logo.png';
          }}
        />
        <h1 className="overflow-hidden text-ellipsis text-nowrap font-sans text-2xl text-gray-200">
          {fullName}
        </h1>
      </div>

      <div className="flex w-full flex-row gap-3 rounded-lg border border-gray-800 bg-gray-900 p-2 shadow-sm">
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

      <div className="my-6 flex flex-row items-center gap-3 text-gray-300">
        {isAdmin && (
          <button type="button" onClick={() => onSubtract()}>
            <CircleMinus />
          </button>
        )}

        <h1 className="text-3xl font-bold">{votes}</h1>

        {isAdmin && (
          <button type="button" onClick={() => onAddVote()}>
            <CirclePlus />
          </button>
        )}
      </div>
    </div>
  );
}
