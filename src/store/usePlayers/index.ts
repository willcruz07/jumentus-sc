import { FIREBASE } from '@/paths';
import { dbFirestore } from '@/service/firebase/config';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { StoreApi, UseBoundStore, create } from 'zustand';

import { setLoadingState } from '../helpers/setStates';
import { IPlayer, TActions, TState } from './types';

export const usePlayers: UseBoundStore<StoreApi<TState & TActions>> = create<
  TState & TActions
>((set) => ({
  errors: {} as TState['errors'],
  loading: {} as TState['loading'],
  allPlayers: [],

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
        });
      });

      set({ allPlayers: data });
    });

    return unsubscribe;
  },
}));
