'use client';

import { useCallback, useEffect } from 'react';

import { Button } from '@/components/Button';
import { ButtonCard } from '@/components/ButtonCard';
import { Header } from '@/components/Header';
import { MainContainer } from '@/components/MainContainer';
import { MatchCard } from '@/components/MatchCard';

import { useNavigation } from '@/hook/useNavigation';
import { ROUTES } from '@/paths';
import { useAuth } from '@/store/useAuth';
import { useMatches } from '@/store/useMatches';

export default function Home() {
  const { navigateTo } = useNavigation();
  const { currentUser } = useAuth();
  const { startListenerOfOnGoingMatches } = useMatches();

  useEffect(() => {
    const unsubscribe = startListenerOfOnGoingMatches();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInitPlayersCollection = useCallback(async () => {
    await fetch('/api/create-players', {
      method: 'POST',
    })
      .then(async (res) => await res.json())
      .then((res) => console.log(res));
  }, []);

  return (
    <MainContainer>
      <Header />

      <div className="flex flex-col gap-4">
        <MatchCard />

        <ButtonCard
          title="Atletas"
          subtitle="Listagem de jogadores"
          urlIcon="/icon/ball.svg"
          onClick={() => navigateTo(ROUTES.AUTHENTICATED.PLAYERS)}
        />

        {/* <ButtonCard
          title="Historico"
          subtitle="Verifique o historico das partidas"
          urlIcon="/icon/trophy.svg"
          onClick={() => navigateTo(ROUTES.AUTHENTICATED.HISTORY)}
        /> */}

        {currentUser?.email === 'will@jumentussc.com' && (
          <Button
            onClick={handleInitPlayersCollection}
            label="Inicializar usuarios"
          />
        )}
      </div>
    </MainContainer>
  );
}
