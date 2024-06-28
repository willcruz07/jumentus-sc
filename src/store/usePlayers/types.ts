import { Unsubscribe } from 'firebase/firestore';

import { IDefaultStates } from '../helpers/setStates';

export type TActions = {
  startListenerAllPlayers(): Unsubscribe;
};

export type TState = IDefaultStates<TActions> & {
  allPlayers: Array<IPlayer>;
};

export interface IPlayer {
  id: string;
  fullName: string;
  name: string;
  matches: number;
  goals: number;
  assists: number;
  tackles: number;
  saves: number;
}
