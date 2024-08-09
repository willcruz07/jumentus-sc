'use client';

import { Header } from '@/components/Header';
import { MainContainer } from '@/components/MainContainer';
import { Select } from '@/components/Select';
import { Spacing } from '@/components/Spacing';

import { PlayersCards } from './components/PlayersCard';
import { TeamsCards } from './components/TeamsCards';

export default function History() {
  return (
    <MainContainer>
      <Header canGoBack />

      <Spacing direction="X" size="LG" />

      <Select
        label="Filtrar data:"
        onChange={() => null}
        options={[
          { label: 'Wellen', value: 'Will' },
          { label: 'Wellen 2', value: 'Will 2' },
          { label: 'Wellen 3', value: 'Will 3' },
        ]}
        value=""
      />

      <main>
        <div className="mt-6">
          <TeamsCards />

          <PlayersCards />
        </div>
      </main>
    </MainContainer>
  );
}
