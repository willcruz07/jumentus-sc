import { FIREBASE } from '@/paths';
import { dbFirestore } from '@/service/firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { StoreApi, UseBoundStore, create } from 'zustand';

import { IPlayer, TActions, TState } from './types';

export const usePlayers: UseBoundStore<StoreApi<TState & TActions>> = create<
  TState & TActions
>((set) => ({
  errors: {} as TState['errors'],
  loading: {} as TState['loading'],
  allPlayers: [],

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
