import { useNavigate } from 'react-router';

import IconBall from '@/assets/icon/ball.svg';
import { ButtonCard } from '@/components/ButtonCard';
import { Header } from '@/components/Header';
import { MatchCard } from '@/components/MatchCard';
import { ROUTES } from '@/paths';

export function Home() {
  const navigate = useNavigate();

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
      </div>
    </div>
  );
}
