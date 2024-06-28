import { TeamsHistoryCard } from '@/components/TeamsHistoryCard';

export function TeamsCards() {
  return (
    <div className="flex flex-col">
      <h1 className="font-sans mb-2 text-sm text-gray-300">Equipes</h1>
      <div className="flex flex-col gap-2">
        <TeamsHistoryCard
          D="2"
          E="4"
          V="2"
          GC="3"
          GP="4"
          SG="2"
          position="1."
          teamColor={'bg-blue-600'}
        />
        <TeamsHistoryCard
          D="2"
          E="4"
          V="2"
          GC="3"
          GP="4"
          SG="2"
          position="2."
          teamColor={'bg-amber-600'}
        />
        <TeamsHistoryCard
          D="2"
          E="4"
          V="2"
          GC="3"
          GP="4"
          SG="2"
          position="3."
          teamColor={'bg-red-600'}
        />
      </div>
    </div>
  );
}
