'use client';

import { useEffect, useState } from 'react';

import { Header } from '@/components/Header';
import { MainContainer } from '@/components/MainContainer';
import { PlayersCard } from '@/components/PlayersCard';
import { Select } from '@/components/Select';

import { usePlayers } from '@/store/usePlayers';
import { IPlayer } from '@/store/usePlayers/types';

export default function Players() {
  const { scorePlayers, startListenerScorePlayers } = usePlayers();

  const [sort, setSort] = useState<keyof IPlayer>('name');
  const [month, setMonth] = useState<string>('00');

  useEffect(() => {
    const unsubscribe = startListenerScorePlayers(month);

    return () => unsubscribe();
  }, [month]);

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

      <div className="flex flex-col gap-6">
        <Select
          value={month}
          placeholder="Ordenação"
          label="Filtrar por mês:"
          options={[
            {
              label: 'Todos',
              value: '00',
            },
            {
              label: 'Janeiro',
              value: '01',
            },
            {
              label: 'Fevereiro',
              value: '02',
            },
            {
              label: 'Março',
              value: '03',
            },
            {
              label: 'Abril',
              value: '04',
            },
            {
              label: 'Maio',
              value: '05',
            },
            {
              label: 'Junho',
              value: '06',
            },
            {
              label: 'Julho',
              value: '07',
            },
            {
              label: 'Agosto',
              value: '08',
            },
            {
              label: 'Setembro',
              value: '09',
            },
            {
              label: 'Outubro',
              value: '10',
            },
            {
              label: 'Novembro',
              value: '11',
            },
            {
              label: 'Dezembro',
              value: '12',
            },
          ]}
          onChange={(value) => setMonth(value as any)}
        />

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
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {scorePlayers
          ?.sort((a, b) => sortPlayers(a, b, sort))
          ?.map((data) => <PlayersCard key={data.id} {...data} />)}
      </div>
    </MainContainer>
  );
}
