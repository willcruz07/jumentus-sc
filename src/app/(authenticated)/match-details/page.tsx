'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { MainContainer } from '@/components/MainContainer';
import { ModalPlayerScore } from '@/components/ModalPlayerScores';
import { PlayerHistoryCard } from '@/components/PlayersHistoryCard';
import { Select } from '@/components/Select';
import { TeamsCard } from '@/components/TeamsCard';

import {
  ITimeRemaining,
  calculateTimeRemaining,
  getTeamColors,
} from '@/utils/lib';

import { useAuth } from '@/store/useAuth';
import { useMatches } from '@/store/useMatches';
import {
  IMatchScores,
  IPlayersScoreOnTheDay,
  ITeamDetails,
  ITeams,
} from '@/store/useMatches/types';
import dayjs, { Dayjs } from 'dayjs';
import { CircleMinus, CirclePlus, Pause, Play } from 'lucide-react';

import { MatchingVote } from './components/MatchingVote';
import { ModalConfirmFinishDay } from './components/ModalConfirmFinishDay';
import { ModalConfirmFinishMatch } from './components/ModalConfirmFinishMatch';
import { ModalDefineMatch } from './components/ModalStartMatch';

export default function MatchDetails() {
  const {
    startListenerOfOnGoingMatches,
    teamScoresOnTheDay,
    inProgress,
    matchInProgress,
    startMatch,
    pauseMatch,
    restartMatch,
    setGoals,
    matchTeams,
    inMatchingVote,
    setPlayersScoreOnTheDay,
    setPlayerWhoScored,
    setFinishMatch,
    setFinishDay,
    waitingForEvent,
    playersScoreOnTheDay,
  } = useMatches();
  const { currentUser } = useAuth();

  const [modalDefineMatch, setModalDefineMatch] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<keyof IPlayersScoreOnTheDay>('name');
  const [countDown, setCountDown] = useState<ITimeRemaining>();
  const [playerSelected, setPlayerSelected] = useState<IPlayersScoreOnTheDay>();
  const [modalPlayerScore, setModalPlayerScore] = useState(false);
  const [modalFinishMatch, setModalFinishMatch] = useState(false);
  const [modalFinishDay, setModalFinishDay] = useState(false);

  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (matchInProgress?.pausedTime && matchInProgress?.started) {
      const pauseDuration = dayjs().diff(
        dayjs(matchInProgress?.pausedTime),
        'second'
      );

      const newStartTime = dayjs(matchInProgress.startTime).add(
        pauseDuration,
        'second'
      );

      return startCountDown(newStartTime);
    }

    if (matchInProgress?.startTime && matchInProgress.started) {
      return startCountDown(dayjs(matchInProgress?.startTime));
    }

    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    matchInProgress?.startTime,
    matchInProgress?.started,
    matchInProgress?.pausedTime,
  ]);

  const startCountDown = (date: Dayjs) => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      if (matchInProgress?.started) {
        const remaining = calculateTimeRemaining(date);
        if (remaining.total <= 0) {
          clearInterval(intervalId.current as NodeJS.Timeout);
        }

        if (remaining.minutes >= 0 && remaining.seconds >= 0) {
          setCountDown(remaining);
        }
      }
    }, 1000);
  };

  useEffect(() => {
    const unsubscribe = startListenerOfOnGoingMatches();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExecutionTimer = () => {
    if (matchInProgress?.started) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      return pauseMatch();
    }

    if (!matchInProgress?.pausedTime) {
      return startMatch();
    }

    return restartMatch();
  };

  const sortPlayers = (
    a: IPlayersScoreOnTheDay,
    b: IPlayersScoreOnTheDay,
    prop: keyof IPlayersScoreOnTheDay
  ) => {
    if (typeof a[prop] === 'string' && typeof b[prop] === 'string') {
      return (a[prop] as string).localeCompare(b[prop] as string);
    } else if (typeof a[prop] === 'number' && typeof b[prop] === 'number') {
      return (b[prop] as number) - (a[prop] as number);
    }
    return 0;
  };

  const handleDefineGoals = (goals: [number, number]) => {
    setGoals(goals);
  };

  const handleConfirmFinishMatch = () => {
    setFinishMatch();
    setModalFinishMatch(false);
  };

  const handleConfirmFinishDay = () => {
    setFinishDay();
  };

  const getPlayerTeam = (fullName: string) => {
    if (!matchTeams) return undefined;

    for (const team in matchTeams) {
      if (matchTeams[team as keyof ITeams].includes(fullName)) {
        return team;
      }
    }
    return null;
  };

  const isAdmin = useMemo(
    () =>
      currentUser?.email?.includes('admin') ||
      currentUser?.email?.includes('will@'),
    [currentUser]
  );

  if (!inMatchingVote && !inProgress && !waitingForEvent) {
    return (
      <MainContainer>
        <Header canGoBack />
        <h1 className="mt-32 text-center text-2xl">
          Nada disponível aqui ainda
        </h1>
      </MainContainer>
    );
  }

  if (inMatchingVote) {
    return (
      <MainContainer>
        <Header canGoBack />
        <MatchingVote />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Header canGoBack />

      {!matchInProgress && (
        <Button
          containerStyle="my-6"
          text="Definir confronto"
          onClick={() => setModalDefineMatch(true)}
          variant="solid"
        />
      )}

      {inProgress && matchInProgress && (
        <>
          <div className="mb-4 mt-2 flex w-full flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900 py-6 shadow-sm">
            <div className="flex flex-col items-center">
              {isAdmin && (
                <button
                  type="button"
                  onClick={handleExecutionTimer}
                  className="mb-2 flex items-center justify-center rounded-full border border-gray-200 p-2 text-gray-200"
                >
                  {matchInProgress?.started ? <Pause /> : <Play />}
                </button>
              )}
              <h3 className="mb-4 text-center font-mono text-2xl text-gray-400">
                {!countDown || isNaN(countDown.minutes)
                  ? '--:--'
                  : `${countDown?.minutes}:${countDown?.seconds?.toString()?.padStart(2, '0')}`}
              </h3>
            </div>

            <div className="flex flex-row items-center self-center">
              <div className="flex flex-row gap-3">
                <div className="flex flex-col gap-3 text-gray-600">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        const goal = matchInProgress.goals[0] + 1;
                        handleDefineGoals([goal, matchInProgress.goals[1]]);
                      }}
                    >
                      <CirclePlus />
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        const goal =
                          matchInProgress.goals[0] > 0
                            ? matchInProgress.goals[0] - 1
                            : matchInProgress.goals[0];

                        handleDefineGoals([goal, matchInProgress.goals[1]]);
                      }}
                    >
                      <CircleMinus />
                    </button>
                  )}
                </div>
                <div className="rounded-lg bg-gray-800 p-2">
                  <div
                    style={{
                      backgroundColor: getTeamColors(
                        matchInProgress.teams?.[0]
                      ),
                    }}
                    className={`flex h-full w-10 items-center justify-center rounded-lg`}
                  >
                    <h1 className="text-l font-black text-gray-800">
                      {matchInProgress?.teams?.[0].toString().split('_')[1]}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="flex items-center px-6">
                <h1 className="text-5xl font-bold">
                  {matchInProgress.goals?.[0]}
                </h1>

                <div className="flex flex-col items-center px-4">
                  <div className="flex flex-row gap-2">
                    <span className="font-sans text-2xl font-semibold">x</span>
                  </div>
                </div>

                <h1 className="text-5xl font-bold">
                  {matchInProgress.goals?.[1]}
                </h1>
              </div>

              <div className="flex flex-row gap-3">
                <div className="rounded-lg bg-gray-800 p-2">
                  <div
                    style={{
                      backgroundColor: getTeamColors(
                        matchInProgress.teams?.[1]
                      ),
                    }}
                    className={`flex h-full w-10 items-center justify-center rounded-lg`}
                  >
                    <h1 className="text-l font-black text-gray-800">
                      {matchInProgress.teams?.[1].toString().split('_')[1]}
                    </h1>
                  </div>
                </div>
                <div className="flex flex-col gap-3 text-gray-600">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        const goal = matchInProgress.goals[1] + 1;
                        handleDefineGoals([matchInProgress.goals[0], goal]);
                      }}
                    >
                      <CirclePlus />
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        const goal =
                          matchInProgress.goals[1] > 0
                            ? matchInProgress.goals[1] - 1
                            : matchInProgress.goals[1];

                        handleDefineGoals([matchInProgress.goals[0], goal]);
                      }}
                    >
                      <CircleMinus />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {matchInProgress && isAdmin && (
            <Button
              containerStyle="my-2"
              text="Finalizar partida"
              onClick={() => setModalFinishMatch(true)}
              variant="outlined"
            />
          )}
        </>
      )}

      <div className="mt-4 flex flex-col gap-8">
        {teamScoresOnTheDay && (
          <div className="flex flex-col gap-2">
            <h1 className="font-sans text-sm text-gray-300">Times</h1>
            {Object.entries(teamScoresOnTheDay).map(([key, data]) => {
              const team = data as ITeamDetails;
              return (
                <TeamsCard
                  key={key}
                  {...team}
                  numberTeam={key.split('_')?.[1] ?? ''}
                  teamColor={getTeamColors(key as keyof IMatchScores)}
                />
              );
            })}
          </div>
        )}

        <div className="flex flex-col">
          {playersScoreOnTheDay && playersScoreOnTheDay.length > 0 && (
            <div className="mx-3 mb-3 flex flex-col gap-3">
              <Select
                value={sort}
                placeholder="Ordenação"
                label="Ordenar por:"
                options={[
                  {
                    label: 'Nome',
                    value: 'name',
                  },
                  {
                    label: 'Gols',
                    value: 'goals',
                  },
                  {
                    label: 'Jogos',
                    value: 'matches',
                  },
                  {
                    label: 'assistsencias',
                    value: 'assists',
                  },
                  {
                    label: 'Desarmes',
                    value: 'tackles',
                  },
                  {
                    label: 'Defesas',
                    value: 'saves',
                  },
                ]}
                onChange={(value) => setSort(value as any)}
              />

              <Input
                type="text"
                value={search}
                onChange={setSearch}
                label="Pesquisar"
              />
            </div>
          )}

          {playersScoreOnTheDay && (
            <div className="flex flex-col gap-2">
              <h1 className="font-sans text-sm text-gray-300">Jogadores</h1>
              {playersScoreOnTheDay
                ?.filter((player) =>
                  player.name.toLowerCase().includes(search.toLowerCase())
                )
                ?.sort((a, b) => sortPlayers(a, b, sort))
                ?.map((player) => {
                  return (
                    <PlayerHistoryCard
                      onEditPlayer={() => {
                        if (!isAdmin) return;

                        setPlayerSelected({ ...player });
                        setModalPlayerScore(true);
                      }}
                      key={player.fullName}
                      assists={player.assists}
                      fullName={player.fullName}
                      goals={player.goals}
                      name={player.name}
                      saves={player.saves}
                      tackles={player.tackles}
                      teamColor={getTeamColors(
                        getPlayerTeam(player.fullName) as keyof ITeams
                      )}
                    />
                  );
                })}
            </div>
          )}
        </div>

        {isAdmin && (
          <Button
            containerStyle="my-2"
            text="Finalizar"
            onClick={() => setModalFinishDay(true)}
            variant="outlined"
          />
        )}
      </div>

      <ModalDefineMatch
        isVisible={modalDefineMatch}
        onCancel={() => setModalDefineMatch(false)}
        onConfirm={() => setModalDefineMatch(false)}
      />

      {playerSelected && matchInProgress && (
        <ModalPlayerScore
          isVisible={modalPlayerScore}
          assists={playerSelected?.assists}
          goals={playerSelected?.goals}
          fullName={playerSelected?.fullName}
          name={playerSelected?.name}
          saves={playerSelected?.saves}
          tackles={playerSelected?.tackles}
          onCancel={() => setModalPlayerScore(false)}
          onConfirm={(data) => {
            if (data.goals > playerSelected.goals) {
              setPlayerWhoScored(playerSelected?.fullName);
            }

            setModalPlayerScore(false);
            setPlayersScoreOnTheDay({
              ...playerSelected,
              ...data,
            });
          }}
        />
      )}

      <ModalConfirmFinishMatch
        onConfirm={handleConfirmFinishMatch}
        isVisible={modalFinishMatch}
        onCancel={() => setModalFinishMatch(false)}
      />

      <ModalConfirmFinishDay
        onConfirm={handleConfirmFinishDay}
        isVisible={modalFinishDay}
        onCancel={() => setModalFinishDay(false)}
      />
    </MainContainer>
  );
}
