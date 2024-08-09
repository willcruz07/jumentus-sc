import { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigation } from '@/hook/useNavigation';
import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';
import { useMatches } from '@/store/useMatches';
import dayjs from 'dayjs';

export function MatchCard() {
  const { navigateTo } = useNavigation();
  const {
    startListenerOfOnGoingMatches,
    waitingForEvent,
    inProgress,
    date,
    inMatchingVote,
  } = useMatches();
  const { currentUser } = useAuth();

  const [matchInProgress, setMatchInProgress] = useState(false);

  useEffect(() => {
    const unsubscribe = startListenerOfOnGoingMatches();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setMatchInProgress(!(!inProgress && !waitingForEvent));
  }, [waitingForEvent, inProgress]);

  const title = useMemo(() => {
    if (inMatchingVote) {
      return 'Acessar votação';
    }

    return matchInProgress ? 'Partida' : 'Criar partida';
  }, [matchInProgress, inMatchingVote]);

  const handleNavigate = useCallback(() => {
    if (matchInProgress || inMatchingVote) {
      return navigateTo(ROUTES.AUTHENTICATED.MATCH_DETAILS);
    }
    return navigateTo(ROUTES.AUTHENTICATED.MATCH_CREATE);
  }, [matchInProgress, navigateTo, inMatchingVote]);

  const isAdmin = useMemo(
    () => currentUser?.email?.includes('admin@'),
    [currentUser]
  );

  if (!inMatchingVote && !inProgress && !waitingForEvent && !isAdmin)
    return null;

  return (
    <div
      onClick={handleNavigate}
      className="mt-6 flex flex-col rounded-lg border border-gray-800 bg-gray-900 p-4 shadow-sm hover:bg-gray-950"
    >
      <h1 className="text-center font-sans text-lg font-semibold text-slate-300">
        {title}
      </h1>
      {waitingForEvent && (
        <>
          <h4 className="text-center font-mono text-xs text-gray-500">
            Este evento ainda não começou
          </h4>
          {date && (
            <h4 className="mt-1 text-center font-mono text-xs text-gray-500">
              {dayjs(date).format('DD/MM/YYYY')}
            </h4>
          )}
        </>
      )}

      {matchInProgress && !waitingForEvent && (
        <div className="mt-3 flex flex-row items-center self-center">
          <div className="rounded-lg bg-gray-800 p-2">
            <div className="h-10 w-10 rounded-lg bg-red-600" />
          </div>

          <div className="flex items-center px-6">
            <h1 className="text-4xl font-bold">1</h1>

            <div className="flex flex-col items-center px-4">
              <div className="flex flex-row gap-2">
                <span className="font-sans text-2xl font-semibold">x</span>
              </div>

              <h3 className="mt-1 text-center font-mono text-sm text-gray-500">
                07:00
              </h3>
            </div>

            <h1 className="text-4xl font-bold">1</h1>
          </div>

          <div className="rounded-lg bg-gray-800 p-2">
            <div className="h-10 w-10 rounded-lg bg-blue-600" />
          </div>
        </div>
      )}
    </div>
  );
}
