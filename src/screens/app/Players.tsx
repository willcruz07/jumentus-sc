import { useEffect, useState } from 'react';

import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { MainContainer } from '@/components/MainContainer';
import { PlayersCard } from '@/components/PlayersCard';
import { Select } from '@/components/Select';
import { Label } from '@/components/ui/label';
import { months } from '@/lib/utils';
import { usePlayers } from '@/store/usePlayers';
import { IPlayer } from '@/store/usePlayers/types';

export function Players() {
  const { scorePlayers, startListenerScorePlayers } = usePlayers();

  const [sort, setSort] = useState<keyof IPlayer>('name');
  const [search, setSearch] = useState('');
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

      <div className="mx-3 mt-6 mb-3 flex w-full max-w-prose flex-col gap-3 self-center">
        <Select
          value={month}
          placeholder="Mês"
          label="Mês:"
          options={[{ label: 'Todos', value: '00' }, ...months]}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(value) => setMonth(value as any)}
        />

        <Input
          id="search"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Pesquisar:"
        />

        <div className="relative mt-4">
          <Label className={`text-slate-300`}>{'Ordenar por:'}</Label>
          <ul className="mt-3 flex w-full sm:flex-row">
            <li className="-mt-px inline-flex flex-1 items-center gap-x-2.5 rounded-l-lg border border-slate-600 bg-transparent px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
              <div className="relative flex w-full items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="hs-horizontal-list-group-item-radio-1-time-1"
                    name="hs-horizontal-list-group-item-radio-1"
                    type="radio"
                    className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                    onChange={() => setSort('name')}
                  />
                </div>
                <label
                  htmlFor="hs-horizontal-list-group-item-radio-1-time-1"
                  className="ms-3 block w-full flex-nowrap text-sm text-nowrap text-gray-600 dark:text-neutral-500"
                >
                  Nome
                </label>
              </div>
            </li>

            <li className="-mt-px inline-flex flex-1 items-center gap-x-2.5 border border-slate-600 bg-transparent px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
              <div className="relative flex w-full items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="hs-horizontal-list-group-item-radio-2-time-1"
                    name="hs-horizontal-list-group-item-radio-1"
                    type="radio"
                    className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                    onChange={() => setSort('goals')}
                  />
                </div>
                <label
                  htmlFor="hs-horizontal-list-group-item-radio-2-time-1"
                  className="ms-3 block w-full flex-nowrap text-sm text-nowrap text-gray-600 dark:text-neutral-500"
                >
                  Gols
                </label>
              </div>
            </li>

            <li className="-mt-px inline-flex flex-1 items-center gap-x-2.5 rounded-r-lg border border-slate-600 bg-transparent px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
              <div className="relative flex w-full items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="hs-horizontal-list-group-item-radio-3-time-1"
                    name="hs-horizontal-list-group-item-radio-1"
                    type="radio"
                    className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                    onChange={() => setSort('assists')}
                  />
                </div>
                <label
                  htmlFor="hs-horizontal-list-group-item-radio-3-time-1"
                  className="ms-3 block w-full flex-nowrap text-sm text-nowrap text-gray-600 dark:text-neutral-500"
                >
                  Assis.
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 flex w-full max-w-prose flex-col gap-4 self-center">
        {scorePlayers
          ?.filter((player) => player.name.toLowerCase().includes(search.toLowerCase()))
          ?.sort((a, b) => sortPlayers(a, b, sort))
          ?.map((data) => <PlayersCard key={data.id} {...data} />)}
      </div>
    </MainContainer>
  );
}
