import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { StoreApi, UseBoundStore, create } from 'zustand';

import { ROUTES } from '@/paths';
import { firebaseAuth, googleProvider } from '@/service/firebase/config';
import { getFirebaseErrorMessageTranslation } from '@/service/firebase/translateMessageFirebase';

import { TActions, TState } from './types';
import { setErrorState, setLoadingState } from '../helpers/setStates';

export const useAuth: UseBoundStore<StoreApi<TState & TActions>> = create<TState & TActions>(
  (set) => ({
    currentUser: null,

    errors: {} as TState['errors'],
    loading: {} as TState['loading'],

    checkAuth() {
      setLoadingState(useAuth, 'checkAuth', true);

      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        set({ currentUser: user });

        setLoadingState(useAuth, 'checkAuth', false);
      });

      return unsubscribe;
    },

    async redirectApp(navigate) {
      getRedirectResult(firebaseAuth).then((result) => {
        if (result?.user) {
          set({
            currentUser: result.user,
          });

          navigate(ROUTES.AUTHENTICATED.HOME);
        }
      });
    },

    async signInWithGoogle() {
      // if (import.meta.env.DEV) {
      const response = await signInWithPopup(firebaseAuth, googleProvider);
      set({
        currentUser: response.user,
      });
      // } else {
      //   await signInWithRedirect(firebaseAuth, googleProvider);
      // }
    },

    async signIn({ email, password }) {
      setLoadingState(useAuth, 'signIn', true);
      setErrorState(useAuth, 'signIn', '');

      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(async (result) => {
          // const token = await generateJWT({
          //   uuid: result.user.uid,
          //   email: result.user.email,
          // });

          // setCookie({ key: KEYS_COOKIES.USER_SESSIONS, value: token });
          set({ currentUser: result.user });
        })
        .catch((error) => {
          setLoadingState(useAuth, 'signIn', false);

          setErrorState(
            useAuth,
            'signIn',
            getFirebaseErrorMessageTranslation(error, 'Verifique o email e a senha'),
          );
        });
    },

    async signOut() {
      await signOutFirebase(firebaseAuth);
      set({
        currentUser: null,
      });
    },
  }),
);
