import {
  getRedirectResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as signOutFirebase,
} from 'firebase/auth';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { StoreApi, UseBoundStore, create } from 'zustand';

import { FIREBASE, ROUTES } from '@/paths';
import { dbFirestore, firebaseAuth, googleProvider } from '@/service/firebase/config';
import { getFirebaseErrorMessageTranslation } from '@/service/firebase/translateMessageFirebase';

import { TActions, TState } from './types';
import { setErrorState, setLoadingState } from '../helpers/setStates';

export const useAuth: UseBoundStore<StoreApi<TState & TActions>> = create<TState & TActions>(
  (set) => ({
    emailsAdmins: [],
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

    startListenerAdmins() {
      const docRef = collection(dbFirestore, FIREBASE.COLLECTIONS.HAS_PERMISSION);

      const unsubscribe = onSnapshot(docRef, (snapshot) => {
        const data: Array<string> = [];

        snapshot.forEach((doc) => {
          data.push(doc.data()?.users);
        });

        set({ emailsAdmins: (data?.[0] as unknown as Array<string>) ?? [] });
      });

      return unsubscribe;
    },

    async setEmailsAdmins(data) {
      const docRef = doc(dbFirestore, FIREBASE.COLLECTIONS.HAS_PERMISSION, 'emails-users');

      await setDoc(docRef, { users: data });
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
      const response = await signInWithPopup(firebaseAuth, googleProvider);
      set({
        currentUser: response.user,
      });
    },

    async signIn({ email, password }) {
      setLoadingState(useAuth, 'signIn', true);
      setErrorState(useAuth, 'signIn', '');

      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(async (result) => {
          set({ currentUser: result.user });
        })
        .catch((error) => {
          setErrorState(
            useAuth,
            'signIn',
            getFirebaseErrorMessageTranslation(error, 'Verifique o email e a senha'),
          );
        })
        .finally(() => {
          setLoadingState(useAuth, 'signIn', false);
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
