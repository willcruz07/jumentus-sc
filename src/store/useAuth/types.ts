import { Unsubscribe, User } from 'firebase/auth';
import { NavigateFunction } from 'react-router';

import { IDefaultStates } from '../helpers/setStates';

export type TActions = {
  emailsAdmins: Array<string>;

  checkAuth(): Unsubscribe;
  startListenerAdmins(): Unsubscribe;

  setEmailsAdmins(data: Array<string>): Promise<void>;
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
