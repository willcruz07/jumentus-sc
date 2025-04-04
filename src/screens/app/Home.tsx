import clsx from 'clsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import IconBall from '@/assets/icon/ball.svg';
import { Button } from '@/components/Button';
import { ButtonCard } from '@/components/ButtonCard';
import { Header } from '@/components/Header';
import { MatchCard } from '@/components/MatchCard';
import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';

export function Home() {
  const navigate = useNavigate();

  const currentUser = useAuth((state) => state.currentUser);
  const startListenerAdmins = useAuth((state) => state.startListenerAdmins);

  useEffect(() => {
    const unsubscribe = startListenerAdmins();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-dvh w-dvw flex-col bg-slate-950 p-4">
      <Header />
      <div className="flex w-full max-w-prose flex-col gap-4 self-center">
        <MatchCard />

        <ButtonCard
          title="Atletas"
          subtitle="Listagem de jogadores"
          urlIcon={IconBall}
          onClick={() => navigate(ROUTES.AUTHENTICATED.PLAYERS)}
        />

        <Button
          className={clsx('mt-8', {
            hidden: currentUser?.email !== 'wellenchorao@gmail.com',
          })}
          variant="secondary"
          label="Add Admin"
          onClick={() => navigate(ROUTES.AUTHENTICATED.ADD_ADMINS)}
        />
      </div>
    </div>
  );
}
