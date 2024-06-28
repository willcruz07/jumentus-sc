import { User } from 'firebase/auth';

import { IDefaultStates } from '../helpers/setStates';

export type TActions = {
  checkAuth(): Promise<void>;
  signIn(data: IPayload): Promise<void>;
  signOut(): Promise<void>;
};

export type TState = IDefaultStates<TActions> & {
  currentUser: User | null;
};

interface IPayload {
  email: string;
  password: string;
}
