import { generateJWT } from '@/jwt';
import { KEYS_COOKIES } from '@/paths';
import { deleteCookie, setCookie } from '@/serverActions/useCookies';
import { firebaseAuth } from '@/service/firebase/config';
import { getFirebaseErrorMessageTranslation } from '@/service/firebase/translateMessageFirebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { StoreApi, UseBoundStore, create } from 'zustand';

import { setErrorState, setLoadingState } from '../helpers/setStates';
import { TActions, TState } from './types';

export const useAuth: UseBoundStore<StoreApi<TState & TActions>> = create<
  TState & TActions
>((set) => ({
  currentUser: null,

  errors: {} as TState['errors'],
  loading: {} as TState['loading'],

  async checkAuth() {
    setLoadingState(useAuth, 'checkAuth', true);

    onAuthStateChanged(firebaseAuth, (user) => {
      if (!user) {
        deleteCookie(KEYS_COOKIES.USER_SESSIONS);
      }

      set({ currentUser: user });

      setLoadingState(useAuth, 'checkAuth', false);
    });
  },

  async signIn({ email, password }) {
    setLoadingState(useAuth, 'signIn', true);
    setErrorState(useAuth, 'signIn', '');

    await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (result) => {
        const token = await generateJWT({
          uuid: result.user.uid,
          email: result.user.email,
        });

        setCookie({ key: KEYS_COOKIES.USER_SESSIONS, value: token });
        set({ currentUser: result.user });
      })
      .catch((error) => {
        setLoadingState(useAuth, 'signIn', false);

        setErrorState(
          useAuth,
          'signIn',
          getFirebaseErrorMessageTranslation(
            error,
            'Verifique o email e a senha'
          )
        );
      });
  },

  async signOut() {
    deleteCookie(KEYS_COOKIES.USER_SESSIONS);
    await signOutFirebase(firebaseAuth);
  },
}));
