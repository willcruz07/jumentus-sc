import clsx from 'clsx';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';
import { useMatches } from '@/store/useMatches';

export function MatchCard() {
  const navigate = useNavigate();

  const {
    startListenerOfOnGoingMatches,
    matchInProgress,
    waitingForEvent,
    inProgress,
    date,
    inMatchingVote,
  } = useMatches();
  const { currentUser, emailsAdmins } = useAuth();

  useEffect(() => {
    const unsubscribe = startListenerOfOnGoingMatches();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = useMemo(() => {
    if (inMatchingVote) {
      return 'Acessar votação';
    }

    return inProgress ? 'Partida' : 'Criar partida';
  }, [inProgress, inMatchingVote]);

  const handleNavigate = useCallback(() => {
    if (inProgress || inMatchingVote) {
      return navigate(ROUTES.AUTHENTICATED.MATCH_DETAILS);
    }
    return navigate(ROUTES.AUTHENTICATED.MATCH_CREATE);
  }, [inProgress, inMatchingVote, navigate]);

  const isAdmin = useMemo(
    () =>
      currentUser?.email?.includes('wellenchorao@gmail.com') ||
      currentUser?.email?.includes('admin') ||
      emailsAdmins.includes(currentUser?.email ?? ''),
    [currentUser, emailsAdmins],
  );

  if (!inMatchingVote && !inProgress && !waitingForEvent && !isAdmin) return null;

  return (
    <div
      onClick={handleNavigate}
      className="mt-6 flex cursor-pointer flex-col rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-sm hover:bg-gray-950"
    >
      <h1 className="text-center text-2xl font-semibold text-slate-300">{title}</h1>
      {waitingForEvent && (
        <>
          <h4 className="mt-2 text-center text-xs text-gray-500">Este evento ainda não começou</h4>
          {date && (
            <h4 className="mt-1 text-center text-xs text-gray-500">
              {dayjs(date).format('DD/MM/YYYY')}
            </h4>
          )}
        </>
      )}

      {matchInProgress && inProgress && !waitingForEvent && (
        <div className="mt-3 flex flex-row items-center self-center">
          <div className="rounded-lg bg-gray-800 p-1">
            <div
              className={clsx(`flex h-14 w-14 items-center justify-center rounded-sm`, {
                'bg-blue-800': matchInProgress?.teams?.[0] == 'team_1',
                'bg-yellow-600': matchInProgress?.teams?.[0] == 'team_2',
                'bg-pink-700': matchInProgress?.teams?.[0] == 'team_3',
              })}
            />
          </div>

          <div className="flex items-center px-6">
            <h1 className="text-6xl font-bold text-slate-200">{matchInProgress?.goals[0]}</h1>

            <div className="flex flex-col items-center px-4">
              <div className="flex flex-row gap-2">
                <span className="font-sans text-2xl font-semibold text-slate-300">x</span>
              </div>
            </div>

            <h1 className="text-6xl font-bold text-slate-200">{matchInProgress?.goals[1]}</h1>
          </div>

          <div className="rounded-lg bg-gray-800 p-1">
            <div
              className={clsx(`flex h-14 w-14 items-center justify-center rounded-sm`, {
                'bg-blue-800': matchInProgress?.teams?.[1] == 'team_1',
                'bg-yellow-600': matchInProgress?.teams?.[1] == 'team_2',
                'bg-pink-700': matchInProgress?.teams?.[1] == 'team_3',
              })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
