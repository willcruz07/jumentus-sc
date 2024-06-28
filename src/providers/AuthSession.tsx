'use client';

import { useEffect } from 'react';

import { useAuth } from '@/store/useAuth';

export function AuthSession({ children }: React.PropsWithChildren) {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
