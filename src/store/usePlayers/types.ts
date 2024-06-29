import { Unsubscribe } from 'firebase/firestore';

import { IDefaultStates } from '../helpers/setStates';
import { IPlayersScoreOnTheDay } from '../useMatches/types';

export type TActions = {
  startListenerAllPlayers(): Unsubscribe;
};

export type TState = IDefaultStates<TActions> & {
  allPlayers: Array<IPlayer>;
  setPlayers(players: IPlayer): Promise<void>;
};

export interface IPlayer extends IPlayersScoreOnTheDay {
  id?: string;
  matches: number;
}
