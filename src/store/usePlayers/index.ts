import { FIREBASE } from '@/paths';
import { dbFirestore } from '@/service/firebase/config';
import dayjs from 'dayjs';
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { StoreApi, UseBoundStore, create } from 'zustand';

import { setLoadingState } from '../helpers/setStates';
import { IMatchState } from '../useMatches/types';
import { IPlayer, TActions, TState } from './types';

export const usePlayers: UseBoundStore<StoreApi<TState & TActions>> = create<
  TState & TActions
>((set) => ({
  errors: {} as TState['errors'],
  loading: {} as TState['loading'],
  allPlayers: [],
  scorePlayers: [],

  setPlayers: async (player) => {
    const allPlayers = usePlayers.getState().allPlayers;
    const playerSelected = allPlayers.find(
      (findPlayer) =>
        findPlayer.fullName.toLowerCase() === player.fullName.toLowerCase()
    );

    setLoadingState(usePlayers, 'setPlayers', true);
    try {
      const docRef = doc(
        dbFirestore,
        FIREBASE.COLLECTIONS.PLAYERS,
        player.id ?? ''
      );

      await updateDoc(docRef, {
        fullName: player.fullName,
        name: player.name,
        matches: !playerSelected
          ? player.matches
          : playerSelected.matches + player.matches,
        assists: !playerSelected
          ? player.assists
          : playerSelected.assists + player.assists,
        goals: !playerSelected
          ? player.goals
          : playerSelected.goals + player.goals,
        saves: !playerSelected
          ? player.saves
          : playerSelected.saves + player.saves,
        tackles: !playerSelected
          ? player.tackles
          : playerSelected.tackles + player.tackles,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingState(usePlayers, 'setPlayers', false);
    }
  },

  startListenerAllPlayers: () => {
    const docRef = collection(dbFirestore, FIREBASE.COLLECTIONS.PLAYERS);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data: Array<IPlayer> = [];
      snapshot.forEach((doc) => {
        const res = doc.data() as IPlayer;

        data.push({
          id: doc.id,
          matches: res.matches,
          assists: res.assists,
          fullName: res.fullName,
          goals: res.goals,
          name: res.name,
          saves: res.saves,
          tackles: res.tackles,
          manOfTheMatch: 0,
          shitOfTheMatch: 0,
        });
      });

      set({ allPlayers: data });
    });

    return unsubscribe;
  },

  startListenerScorePlayers: (month) => {
    const currentYear = dayjs().format('YYYY');

    const firstDay =
      month === '00'
        ? dayjs().startOf('year').toDate()
        : dayjs(`${currentYear}-${month}-01`).startOf('month').toDate();
    const lastDay =
      month === '00'
        ? dayjs().endOf('year').toDate()
        : dayjs(`${currentYear}-${month}-01`).endOf('month').toDate();

    console.log(firstDay, lastDay, month);

    const collectionRef = collection(dbFirestore, FIREBASE.COLLECTIONS.MATCHES);

    const docRef =
      month === '00'
        ? collectionRef
        : query(
            collectionRef,
            where('createdAt', '>=', firstDay),
            where('createdAt', '<=', lastDay)
          );

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data: Array<IPlayer> = [];

      snapshot.forEach((doc) => {
        const res = doc.data() as IMatchState;
        const playersScore = res.playersScoreOnTheDay;
        const shitPlayer = res.worstPlayerOfTheDay;
        const bestPlayer = res.playerOfTheDay;

        playersScore.forEach((player) => {
          const dataIndex = data.findIndex(
            (item) =>
              item.fullName.toLowerCase() === player.fullName.toLowerCase()
          );

          console.log(
            bestPlayer?.fullName?.toLowerCase() ===
              player?.fullName?.toLowerCase(),
            bestPlayer,
            'best'
          );

          if (dataIndex !== -1) {
            data[dataIndex].assists += player.assists;
            data[dataIndex].goals += player.goals;
            data[dataIndex].saves += player.saves;
            data[dataIndex].tackles += player.tackles;
            data[dataIndex].matches += 1;
            data[dataIndex].manOfTheMatch +=
              bestPlayer?.fullName?.toLowerCase() ===
              player?.fullName?.toLowerCase()
                ? 1
                : 0;
            data[dataIndex].shitOfTheMatch +=
              shitPlayer?.fullName?.toLowerCase() ===
              player?.fullName?.toLowerCase()
                ? 1
                : 0;
          } else {
            if (player.fullName.trim()) {
              data.push({
                id: player.fullName.toLowerCase().replaceAll(' ', '_'),
                fullName: player.fullName,
                assists: player.assists,
                goals: player.goals,
                matches: 1,
                name: player.name,
                saves: player.saves,
                tackles: player.tackles,
                manOfTheMatch: 0,
                shitOfTheMatch: 0,
              });
            }
          }
        });
      });

      console.log(data, 'DDD');

      set({ scorePlayers: data });
    });

    return unsubscribe;
  },
}));
