import { omit } from '@/utils/lib';

import type { StoreApi, UseBoundStore } from 'zustand';

export interface IDefaultStates<T> {
  loading: { [key in keyof T]: boolean };
  errors: { [key in keyof T]: string };
}

export function setLoadingState<T>(
  hook: UseBoundStore<StoreApi<T>>,
  key: keyof T,
  state?: boolean
) {
  return hook.setState((prevState: T & IDefaultStates<T>) => ({
    ...prevState,
    loading: state
      ? { ...prevState.loading, [key]: state }
      : omit(prevState.loading, key),
  }));
}

export function setErrorState<T>(
  hook: UseBoundStore<StoreApi<T>>,
  key: keyof T,
  message?: string
) {
  return hook.setState((prevState: T & IDefaultStates<T>) => ({
    ...prevState,
    errors: message
      ? { ...prevState.errors, [key]: message }
      : omit(prevState.errors, key),
  }));
}
