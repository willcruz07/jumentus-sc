/* eslint-disable @typescript-eslint/no-explicit-any */
import { FIREBASE } from '@/paths';
import { dbFirestore } from '@/service/firebase/config';
import dayjs from 'dayjs';
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { StoreApi, UseBoundStore, create } from 'zustand';

import { setLoadingState } from '../helpers/setStates';
import { usePlayers } from '../usePlayers';
import { IMatchInProgress, IMatchState, TActions, TState } from './types';

export const useMatches: UseBoundStore<StoreApi<TState & TActions>> = create<
  TState & TActions
>((set) => ({
  errors: {} as TState['errors'],
  loading: {} as TState['loading'],

  finishedMatches: [],
  inProgress: false,
  waitingForEvent: false,
  matchInProgress: undefined,
  matchPlayers: undefined,
  matchTeams: undefined,
  playerOfTheDay: null,
  worstPlayerOfTheDay: null,
  teamScoresOnTheDay: undefined,
  playersScoreOnTheDay: [],
  date: undefined,
  votesBestPlayers: [],
  votesWorstPlayers: [],

  createMatch: async (data) => {
    const allPlayers = usePlayers.getState().allPlayers;

    setLoadingState(useMatches, 'createMatch', true);
    try {
      const docRef = collection(dbFirestore, FIREBASE.COLLECTIONS.MATCHES);
      await addDoc(docRef, {
        votesBestPlayers: [],
        votesWorstPlayers: [],
        inProgress: false,
        waitingForEvent: true,
        inMatchingVote: false,
        date: Timestamp.fromDate(data.date) as any,
        createdAt: dayjs().toDate(),
        matchPlayers: {
          players: data.players.players,
          goalKeepers: data.players.goalKeepers,
        },
        matchTeams: data.teams,
        teamScoresOnTheDay: {
          team_1: {
            win: 0,
            draw: 0,
            loss: 0,
            goalsConceded: 0,
            goalsScored: 0,
            goalsDifference: 0,
          },
          team_2: {
            win: 0,
            draw: 0,
            loss: 0,
            goalsConceded: 0,
            goalsScored: 0,
            goalsDifference: 0,
          },
          team_3: {
            win: 0,
            draw: 0,
            loss: 0,
            goalsConceded: 0,
            goalsScored: 0,
            goalsDifference: 0,
          },
        },
        matchInProgress: null,
        finishedMatches: [],
        playerOfTheDay: null,
        worstPlayerOfTheDay: null,
        playersScoreOnTheDay: [
          ...data.players.goalKeepers,
          ...data.players.players,
        ].map((player) => ({
          fullName: player,
          name: allPlayers.find((p) => p.fullName === player)?.name ?? player,
          assists: 0,
          goals: 0,
          saves: 0,
          tackles: 0,
          manOfTheMatch: 0,
          shitOfTheMatch: 0,
        })),
      } as IMatchState);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'createMatch', false);
    }
  },

  startMatch: async () => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'startMatch', true);
    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );

      await updateDoc(docRef, {
        matchInProgress: {
          ...details.matchInProgress,
          started: true,
          startTime: dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss')).toDate(),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'startMatch', false);
    }
  },

  restartMatch: async () => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'restartMatch', true);
    try {
      const pauseDuration = dayjs().diff(
        dayjs(details.matchInProgress?.pausedTime),
        'second'
      );

      const newStartTime = dayjs(details.matchInProgress?.startTime).add(
        pauseDuration,
        'second'
      );

      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );

      await updateDoc(docRef, {
        matchInProgress: {
          ...details.matchInProgress,
          pausedTime: null,
          started: true,
          startTime: newStartTime.toDate(), // atualize o startTime para o novo horário ajustado
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'restartMatch', false);
    }
  },

  pauseMatch: async () => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'pauseMatch', true);

    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );

      await updateDoc(docRef, {
        matchInProgress: {
          ...details.matchInProgress,
          started: false,
          pausedTime: dayjs().toDate(),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'pauseMatch', false);
    }
  },

  setTeamScoresOnTheDay: async (data) => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'setTeamScoresOnTheDay', true);
    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );

      await updateDoc(docRef, {
        teamScoresOnTheDay: {
          ...details.teamScoresOnTheDay,
          [data.team]: {
            draw: data.draw,
            goalsConceded: data.goalsConceded,
            goalsDifference: data.goalsDifference,
            goalsScored: data.goalsScored,
            loss: data.loss,
            win: data.win,
          },
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'setTeamScoresOnTheDay', true);
    }
  },

  setPlayerWhoScored: async (name) => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'setPlayerWhoScored', true);
    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );

      if (details?.matchInProgress) {
        await updateDoc(docRef, {
          matchInProgress: {
            ...details.matchInProgress,
            playersWhoScored: [
              ...(details.matchInProgress?.playersWhoScored ?? []),
              name,
            ],
          },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'setPlayerWhoScored', true);
    }
  },

  setGoals: async (data) => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'pauseMatch', true);

    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );

      await updateDoc(docRef, {
        matchInProgress: {
          ...details.matchInProgress,
          goals: data,
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'pauseMatch', false);
    }
  },

  setPlayersScoreOnTheDay: async (player) => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'setPlayersScoreOnTheDay', true);
    try {
      const playerScore = details.playersScoreOnTheDay.find(
        (findPlayer) =>
          findPlayer.fullName.toLowerCase() === player.fullName.toLowerCase()
      );

      const playerList = details.playersScoreOnTheDay.filter(
        (findPlayer) =>
          findPlayer.fullName.toLowerCase() !== player.fullName.toLowerCase()
      );

      if (!playerScore) return;

      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );

      await updateDoc(docRef, {
        playersScoreOnTheDay: [
          ...playerList,
          {
            ...player,
            goals: player.goals,
            assists: player.assists,
            tackles: player.tackles,
            saves: player.saves,
          },
        ],
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'setPlayersScoreOnTheDay', false);
    }
  },

  setMatch: async (data) => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'setMatch', false);
    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );
      await updateDoc(docRef, {
        inProgress: true,
        matchInProgress: {
          time: '7:00',
          started: false,
          teams: data,
          endTime: null,
          goals: [0, 0],
          playersWhoScored: [],
          startTime: null,
        } as IMatchInProgress,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'setMatch', false);
    }
  },

  setFinishMatch: async () => {
    const setPlayer = usePlayers.getState().setPlayers;

    const details = useMatches.getState();
    setLoadingState(useMatches, 'setFinishMatch', true);

    const calculateTeamScores = (details: any, teamIndex: number) => {
      const teamId = details.matchInProgress?.teams[teamIndex] as string;

      const goalsScored =
        (details.teamScoresOnTheDay[teamId]?.goalsScored ?? 0) +
        (details.matchInProgress?.goals[teamIndex] ?? 0);
      const goalsConceded =
        (details.teamScoresOnTheDay[teamId]?.goalsConceded ?? 0) +
        (details.matchInProgress?.goals[1 - teamIndex] ?? 0);
      const goalsDifference = goalsScored - goalsConceded;

      let draw = details.teamScoresOnTheDay[teamId]?.draw ?? 0;
      let loss = details.teamScoresOnTheDay[teamId]?.loss ?? 0;
      let win = details.teamScoresOnTheDay[teamId]?.win ?? 0;

      if (
        details.matchInProgress.goals[0] === details.matchInProgress.goals[1]
      ) {
        draw += 1;
      }
      if (
        details.matchInProgress.goals[teamIndex] >
        details.matchInProgress.goals[teamIndex === 0 ? 1 : 0]
      ) {
        win += 1;
      }
      if (
        details.matchInProgress.goals[teamIndex] <
        details.matchInProgress.goals[teamIndex === 0 ? 1 : 0]
      ) {
        loss += 1;
      }

      return {
        ...details.teamScoresOnTheDay[teamId],
        goalsScored,
        goalsConceded,
        goalsDifference,
        draw,
        loss,
        win,
      };
    };

    const teamScoresOnTheDay = {
      ...details.teamScoresOnTheDay,
      [details.matchInProgress?.teams[0] as string]: {
        ...calculateTeamScores(details, 0),
      },
      [details.matchInProgress?.teams[1] as string]: {
        ...calculateTeamScores(details, 1),
      },
    };

    for (const player of details.playersScoreOnTheDay) {
      await setPlayer({
        id: player?.fullName.toLowerCase().replace(' ', '_'),
        matches: 1,
        ...player,
      });
    }

    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );

      await updateDoc(docRef, {
        finishedMatches: [
          ...details.finishedMatches,
          {
            ...details.matchInProgress,
            started: false,
            endTime: dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss')).toDate(),
          },
        ],
        teamScoresOnTheDay: teamScoresOnTheDay,
        matchInProgress: null,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'setFinishMatch', false);
    }
  },

  setFinishDay: async () => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'setFinishDay', false);
    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );
      await updateDoc(docRef, {
        inProgress: false,
        waitingForEvent: false,
        inMatchingVote: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'setFinishDay', false);
    }
  },

  setFinishVotes: async (data) => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'setFinishVotes', false);
    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );
      await updateDoc(docRef, {
        inProgress: false,
        inMatchingVote: false,
        worstPlayerOfTheDay: data.worst,
        playerOfTheDay: data.best,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'setFinishVotes', false);
    }
  },

  setVotes: async (data) => {
    const details = useMatches.getState();
    setLoadingState(useMatches, 'setVotes', false);
    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.MATCHES,
        details?.matchId ?? ''
      );
      await updateDoc(docRef, {
        votesBestPlayers: data.best,
        votesWorstPlayers: data.worst,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(useMatches, 'setVotes', false);
    }
  },

  startListenerOfOnGoingMatches: () => {
    const q = query(
      collection(dbFirestore, FIREBASE.COLLECTIONS.MATCHES),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.exists()) {
          const data = doc.data() as IMatchState;

          set({
            ...data,
            matchId: doc.id,
            finishedMatches: data.finishedMatches,
            date: dayjs((data?.date as any)?.seconds * 1000).toDate(),
            matchInProgress: data?.matchInProgress
              ? {
                  ...(data?.matchInProgress as IMatchInProgress),
                  startTime: data?.matchInProgress?.startTime
                    ? dayjs(
                        (data?.matchInProgress?.startTime as any)?.seconds *
                          1000
                      ).toDate()
                    : null,
                  pausedTime: data?.matchInProgress?.pausedTime
                    ? dayjs(
                        (data?.matchInProgress?.pausedTime as any)?.seconds *
                          1000
                      ).toDate()
                    : null,
                }
              : null,
          });
        }
      });
    });
    return unsubscribe;
  },
}));
