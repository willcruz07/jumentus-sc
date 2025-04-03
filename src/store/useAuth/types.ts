import { Unsubscribe, User } from 'firebase/auth';
import { NavigateFunction } from 'react-router';

import { IDefaultStates } from '../helpers/setStates';

export type TActions = {
  checkAuth(): Unsubscribe;
  signInWithGoogle(): Promise<void>;
  redirectApp(navigate: NavigateFunction): Promise<void>;
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
