'use client';

import { useEffect, useState } from 'react';

import { Header } from '@/components/Header';
import { MainContainer } from '@/components/MainContainer';
import { PlayersCard } from '@/components/PlayersCard';
import { Select } from '@/components/Select';

import { usePlayers } from '@/store/usePlayers';
import { IPlayer } from '@/store/usePlayers/types';

export default function Players() {
  const { allPlayers, startListenerAllPlayers } = usePlayers();

  const [sort, setSort] = useState<keyof IPlayer>('name');

  useEffect(() => {
    const unsubscribe = startListenerAllPlayers();

    return () => unsubscribe();
  }, []);

  const sortPlayers = (a: IPlayer, b: IPlayer, prop: keyof IPlayer) => {
    if (typeof a[prop] === 'string' && typeof b[prop] === 'string') {
      return (a[prop] as string).localeCompare(b[prop] as string);
    } else if (typeof a[prop] === 'number' && typeof b[prop] === 'number') {
      return (b[prop] as number) - (a[prop] as number);
    }
    return 0;
  };

  return (
    <MainContainer>
      <Header canGoBack />

      <Select
        value={sort}
        placeholder="Ordenação"
        label="Ordenar por:"
        options={[
          {
            label: 'Nome',
            value: 'name',
          },
          {
            label: 'Gols',
            value: 'goals',
          },
          {
            label: 'Jogos',
            value: 'matches',
          },
          {
            label: 'assistsencias',
            value: 'assists',
          },
          {
            label: 'Desarmes',
            value: 'tackles',
          },
          {
            label: 'Defesas',
            value: 'saves',
          },
        ]}
        onChange={(value) => setSort(value as any)}
      />

      <div className="mt-6 flex flex-col gap-2">
        {allPlayers
          ?.sort((a, b) => sortPlayers(a, b, sort))
          ?.map((data) => <PlayersCard key={data.id} {...data} />)}
      </div>
    </MainContainer>
  );
}
