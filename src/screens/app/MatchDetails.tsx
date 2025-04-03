/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { CircleMinus, CirclePlus, Pause, Play } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { MainContainer } from '@/components/MainContainer';
import { MatchingVote } from '@/components/MatchingVote';
import { ModalConfirmFinishDay } from '@/components/ModalConfirmFinishDay';
import { ModalConfirmFinishMatch } from '@/components/ModalConfirmFinishMatch';
import { ITeamProps, ModalMatchScores } from '@/components/ModalMatchScores';
import { ModalPlayerScore } from '@/components/ModalPlayerScores';
import { ModalDefineMatch } from '@/components/ModalStartMatch';
import { PlayerHistoryCard } from '@/components/PlayersHistoryCard';
import { TeamsCard } from '@/components/TeamsCard';
import { getTeamColors } from '@/lib/utils';
import { useAuth } from '@/store/useAuth';
import { useMatches } from '@/store/useMatches';
import {
  IMatchInProgress,
  IMatchScores,
  IPlayersScoreOnTheDay,
  ITeamDetails,
  ITeams,
} from '@/store/useMatches/types';

dayjs.extend(duration);

export function MatchDetails() {
  const startListenerOfOnGoingMatches = useMatches((state) => state.startListenerOfOnGoingMatches);
  const teamScoresOnTheDay = useMatches((state) => state.teamScoresOnTheDay);
  const inProgress = useMatches((state) => state.inProgress);
  const match = useMatches((state) => state.matchInProgress);
  const startMatch = useMatches((state) => state.startMatch);
  const pauseMatch = useMatches((state) => state.pauseMatch);
  const restartMatch = useMatches((state) => state.restartMatch);
  const setGoals = useMatches((state) => state.setGoals);
  const matchTeams = useMatches((state) => state.matchTeams);
  const inMatchingVote = useMatches((state) => state.inMatchingVote);
  const setPlayersScoreOnTheDay = useMatches((state) => state.setPlayersScoreOnTheDay);
  const setPlayerWhoScored = useMatches((state) => state.setPlayerWhoScored);
  const setFinishMatch = useMatches((state) => state.setFinishMatch);
  const setFinishDay = useMatches((state) => state.setFinishDay);
  const waitingForEvent = useMatches((state) => state.waitingForEvent);
  const setTeamScoresOnTheDay = useMatches((state) => state.setTeamScoresOnTheDay);
  const playersScoreOnTheDay = useMatches((state) => state.playersScoreOnTheDay);

  const { currentUser } = useAuth();

  const [modalDefineMatch, setModalDefineMatch] = useState(false);
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState('');
  const [playerSelected, setPlayerSelected] = useState<IPlayersScoreOnTheDay>();
  const [teamSelected, setTeamSelected] =
    useState<Omit<ITeamProps, 'onConfirm' | 'onCancel' | 'isVisible'>>();
  const [modalPlayerScore, setModalPlayerScore] = useState(false);
  const [modalMatchScore, setModalMatchScore] = useState(false);
  const [modalFinishMatch, setModalFinishMatch] = useState(false);
  const [modalFinishDay, setModalFinishDay] = useState(false);

  const [matchInProgress, setMatchInProgress] = useState<IMatchInProgress>();

  useEffect(() => {
    if (match) {
      setMatchInProgress(match);
    }
  }, [match]);

  useEffect(() => {
    let timerId = null;
    if (matchInProgress?.startTime) {
      console.log(matchInProgress);
      const calcTime = () => {
        const now = dayjs();
        const diff = now.diff(matchInProgress?.startTime);
        const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

        return `${minutes}:${seconds}`;
      };

      console.log('START');
      timerId = setInterval(() => {
        setTimer(calcTime());
      }, 1000);
    }

    if ((!matchInProgress?.started || matchInProgress == null) && !!timerId) {
      clearInterval(timerId);

      if (!matchInProgress) {
        setTimer('00:00');
      }
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      timerId && clearInterval(timerId);
    };
  }, [matchInProgress?.startTime, matchInProgress?.started]);

  useEffect(() => {
    const unsubscribe = startListenerOfOnGoingMatches();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExecutionTimer = () => {
    if (matchInProgress?.started) {
      return pauseMatch();
    }

    if (!matchInProgress?.pausedTime) {
      return startMatch();
    }

    return restartMatch();
  };

  const handleDefineGoals = (goals: [number, number]) => {
    setGoals(goals);
  };

  const handleConfirmFinishMatch = () => {
    setFinishMatch();
    setTimer('00:00');
    setModalFinishMatch(false);
    setMatchInProgress(undefined);
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
    () => currentUser?.email?.includes('wellenchorao') || currentUser?.email?.includes('will@'),
    [currentUser],
  );

  if (!inMatchingVote && !inProgress && !waitingForEvent) {
    return (
      <MainContainer>
        <Header canGoBack />
        <h1 className="mt-32 text-center text-2xl">Nada disponível aqui ainda</h1>
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
      <div className="mt-8 flex w-full max-w-prose flex-col self-center">
        {!matchInProgress && (
          <Button label="Definir confronto" onClick={() => setModalDefineMatch(true)} />
        )}

        {inProgress && matchInProgress && (
          <>
            <div className="mt-2 mb-4 flex w-full flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900 py-6 shadow-sm">
              <div className="flex flex-col items-center">
                {
                  <button
                    type="button"
                    onClick={handleExecutionTimer}
                    className="mb-2 flex items-center justify-center rounded-full border border-gray-200 p-2 text-gray-200"
                  >
                    {matchInProgress?.started ? <Pause /> : <Play />}
                  </button>
                }
                <h3 className="mb-4 text-center text-2xl text-gray-400">{timer}</h3>
              </div>

              <div className="flex flex-row items-center self-center">
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-3 text-gray-600">
                    {
                      <button
                        type="button"
                        onClick={() => {
                          const goal = matchInProgress.goals[0] + 1;
                          handleDefineGoals([goal, matchInProgress.goals[1]]);
                        }}
                      >
                        <CirclePlus />
                      </button>
                    }
                    {
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
                    }
                  </div>
                  <div className="rounded-lg bg-gray-800 p-2">
                    <div
                      style={{
                        backgroundColor: getTeamColors(matchInProgress.teams?.[0]),
                      }}
                      className={`flex h-full w-10 items-center justify-center rounded-lg`}
                    >
                      <h1 className="text-xl font-black text-slate-200">
                        {matchInProgress?.teams?.[0].toString().split('_')[1]}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="flex items-center px-6">
                  <h1 className="text-5xl font-bold text-slate-100">
                    {matchInProgress.goals?.[0]}
                  </h1>

                  <div className="flex flex-col items-center px-4">
                    <div className="flex flex-row gap-2">
                      <span className="font-sans text-2xl font-semibold text-slate-400">x</span>
                    </div>
                  </div>

                  <h1 className="text-5xl font-bold text-slate-100">
                    {matchInProgress.goals?.[1]}
                  </h1>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="rounded-lg bg-gray-800 p-2">
                    <div
                      style={{
                        backgroundColor: getTeamColors(matchInProgress.teams?.[1]),
                      }}
                      className={`flex h-full w-10 items-center justify-center rounded-lg`}
                    >
                      <h1 className="text-xl font-black text-slate-200">
                        {matchInProgress.teams?.[1].toString().split('_')[1]}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 text-gray-600">
                    {
                      <button
                        type="button"
                        onClick={() => {
                          const goal = matchInProgress.goals[1] + 1;
                          handleDefineGoals([matchInProgress.goals[0], goal]);
                        }}
                      >
                        <CirclePlus />
                      </button>
                    }
                    {
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
                    }
                  </div>
                </div>
              </div>
            </div>

            {matchInProgress && (
              <Button
                className="my-2"
                label="Finalizar partida"
                onClick={() => setModalFinishMatch(true)}
              />
            )}
          </>
        )}

        <div className="mt-4 flex flex-col gap-8">
          {teamScoresOnTheDay && (
            <div className="flex flex-col gap-4">
              <h1 className="text-lg text-gray-300">Times</h1>
              {Object.entries(teamScoresOnTheDay)
                .sort(([a], [b]) => (a.split('_')?.[1] < b.split('_')?.[1] ? -1 : 0))
                .map(([key, data]) => {
                  const team = data as ITeamDetails;
                  return (
                    <TeamsCard
                      key={key}
                      {...team}
                      onClick={() => {
                        // if (!isAdmin) return;
                        setTeamSelected({
                          draw: team.draw,
                          goalsConceded: team.goalsConceded,
                          goalsDifference: team.goalsConceded,
                          goalsScored: team.goalsConceded,
                          loss: team.loss,
                          teamColor: getTeamColors(key as keyof IMatchScores),
                          win: team.win,
                          numberTeam: key.split('_')?.[1] ?? '',
                        });
                        setModalMatchScore(true);
                      }}
                      numberTeam={key.split('_')?.[1] ?? ''}
                      teamColor={getTeamColors(key as keyof IMatchScores)}
                    />
                  );
                })}
            </div>
          )}

          <div className="flex flex-col">
            {playersScoreOnTheDay && playersScoreOnTheDay.length > 0 && (
              <div className="mb-3 flex flex-col gap-3">
                <Input
                  type="text"
                  value={search}
                  id="search"
                  onChange={(s) => setSearch(s.target.value)}
                  label="Pesquisar:"
                />
              </div>
            )}

            {playersScoreOnTheDay && (
              <div className="mt-4 flex flex-col gap-2">
                <h1 className="text-lg text-gray-300">Jogadores</h1>
                {playersScoreOnTheDay
                  ?.filter((player) => player.name.toLowerCase().includes(search.toLowerCase()))
                  ?.sort((a, b) => a.name.localeCompare(b.name))
                  ?.map((player) => {
                    return (
                      <PlayerHistoryCard
                        onEditPlayer={() => {
                          // if (!isAdmin) return;
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
                        manOfTheMatch={0}
                        shitOfTheMatch={0}
                        teamColor={getTeamColors(getPlayerTeam(player.fullName) as keyof ITeams)}
                      />
                    );
                  })}
              </div>
            )}
          </div>

          {isAdmin && (
            <Button
              className="my-2"
              variant="secondary"
              label="Finalizar todas as partidas"
              onClick={() => setModalFinishDay(true)}
            />
          )}
        </div>

        <ModalDefineMatch
          isVisible={modalDefineMatch}
          onCancel={() => setModalDefineMatch(false)}
          onConfirm={() => setModalDefineMatch(false)}
        />

        {playerSelected && (
          <ModalPlayerScore
            isVisible={modalPlayerScore}
            assists={playerSelected?.assists}
            goals={playerSelected?.goals}
            fullName={playerSelected?.fullName}
            name={playerSelected?.name}
            saves={playerSelected?.saves}
            tackles={playerSelected?.tackles}
            manOfTheMatch={0}
            shitOfTheMatch={0}
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

        {teamSelected && teamScoresOnTheDay && (
          <ModalMatchScores
            isVisible={modalMatchScore}
            draw={teamScoresOnTheDay[`team_${teamSelected.numberTeam}` as keyof IMatchScores].draw}
            teamColor={teamSelected.teamColor}
            win={teamScoresOnTheDay[`team_${teamSelected.numberTeam}` as keyof IMatchScores].win}
            goalsDifference={
              teamScoresOnTheDay[`team_${teamSelected.numberTeam}` as keyof IMatchScores]
                .goalsConceded
            }
            goalsScored={
              teamScoresOnTheDay[`team_${teamSelected.numberTeam}` as keyof IMatchScores]
                .goalsScored
            }
            loss={teamScoresOnTheDay[`team_${teamSelected.numberTeam}` as keyof IMatchScores].loss}
            numberTeam={teamSelected.numberTeam}
            goalsConceded={
              teamScoresOnTheDay[`team_${teamSelected.numberTeam}` as keyof IMatchScores]
                .goalsConceded
            }
            onCancel={() => setModalMatchScore(false)}
            onConfirm={(data) => {
              setModalMatchScore(false);
              setTeamScoresOnTheDay({
                draw: data.draw,
                goalsConceded: data.goalsConceded,
                goalsDifference: data.goalsDifference,
                goalsScored: data.goalsScored,
                loss: data.loss,
                team: `team_${teamSelected.numberTeam}` as any,
                win: data.win,
              });
            }}
          />
        )}
      </div>

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
