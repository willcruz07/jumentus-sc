/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/Button';

import { useNavigation } from '@/hook/useNavigation';
import { ROUTES } from '@/paths';
import { useMatches } from '@/store/useMatches';

import { CardsVotes, IPlayersOfTheMatch } from './CardsVotes';

interface IPlayersVotes
  extends Omit<IPlayersOfTheMatch, 'onAddVote' | 'onSubtract'> {}

export function MatchingVote() {
  const {
    startListenerOfOnGoingMatches,
    playersScoreOnTheDay,
    setFinishVotes,
  } = useMatches();
  const { navigateTo } = useNavigation();

  const [worstPlayers, setWorstPlayers] = useState<Array<IPlayersVotes>>([]);
  const [bestPlayer, setBestPlayers] = useState<Array<IPlayersVotes>>([]);
  const [tabs, setTabs] = useState<'baranga' | 'best'>('baranga');

  useEffect(() => {
    const unsubscribe = startListenerOfOnGoingMatches();

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (playersScoreOnTheDay) {
      const list = playersScoreOnTheDay?.map((player) => ({
        ...player,
        votes: 0,
      }));

      setWorstPlayers(list);
      setBestPlayers(list);
    }
  }, [playersScoreOnTheDay]);

  const handlePlayersVotes = (player: IPlayersVotes, type: 'add' | 'sub') => {
    const updateVotes = (players: Array<IPlayersVotes>) =>
      players.map((psPlayer) =>
        psPlayer.fullName === player.fullName
          ? {
              ...psPlayer,
              votes:
                type === 'add'
                  ? psPlayer.votes + 1
                  : psPlayer.votes > 0
                    ? psPlayer.votes - 1
                    : 0,
            }
          : psPlayer
      );

    if (tabs === 'best') {
      if (totals.bestPlayer < bestPlayer.length - 1 || type === 'sub') {
        setBestPlayers((prev) => updateVotes(prev));
      }
    } else {
      if (totals.worstPlayers < worstPlayers.length - 1 || type === 'sub') {
        setWorstPlayers((prev) => updateVotes(prev));
      }
    }
  };

  const totals = useMemo(() => {
    return {
      bestPlayer: bestPlayer.reduce((acc, value) => acc + value.votes, 0),
      worstPlayers: worstPlayers.reduce((acc, value) => acc + value.votes, 0),
    };
  }, [bestPlayer, worstPlayers]);

  const handleFinishVotes = () => {
    setFinishVotes({
      best: bestPlayer[0],
      worst: worstPlayers[0],
    });

    navigateTo(ROUTES.AUTHENTICATED.HOME);
  };

  return (
    <div className="pt-4">
      {totals.bestPlayer === bestPlayer.length - 1 &&
        totals.worstPlayers === worstPlayers.length - 1 && (
          <Button
            containerStyle="my-2 mb-6"
            text="Finalizar"
            onClick={handleFinishVotes}
            variant="outlined"
          />
        )}

      <div className="mb-4 flex h-16 w-full flex-row rounded-lg border border-gray-700">
        <button
          className={`w-full rounded-bl-lg rounded-tl-lg ${tabs === 'baranga' && 'bg-slate-700'}`}
          type="button"
          onClick={() => setTabs('baranga')}
        >
          Baranga
        </button>
        <button
          className={`w-full rounded-br-lg rounded-tr-lg ${tabs === 'best' && 'bg-slate-700'}`}
          type="button"
          onClick={() => setTabs('best')}
        >
          Man of the match
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {tabs === 'best' &&
          bestPlayer.filter((p) => p.votes > 0).length > 0 && (
            <img
              className="absolute right-1 mb-2 inline-block size-28 rotate-12 rounded-full object-cover shadow-md"
              src={`/img/man-of-the-match.png`}
              alt="Image Description"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onError={(e: any) => {
                e.target.onerror === null;
                e.target.src = '/img/logo.png';
              }}
            />
          )}

        {tabs === 'baranga' &&
          worstPlayers.filter((p) => p.votes > 0).length > 0 && (
            <img
              className="absolute right-1 mb-2 inline-block size-32 rotate-12 rounded-full object-cover shadow-md"
              src={`/img/baranga.png`}
              alt="Image Description"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onError={(e: any) => {
                e.target.onerror === null;
                e.target.src = '/img/logo.png';
              }}
            />
          )}

        {(tabs === 'baranga' ? worstPlayers : bestPlayer)
          ?.sort((a, b) => b.votes - a.votes)
          ?.map((player) => (
            <CardsVotes
              key={player.name}
              assist={player.assist}
              fullName={player.fullName}
              goals={player.goals}
              name={player.name}
              saves={player.saves}
              tackles={player.tackles}
              votes={player.votes}
              onAddVote={() => {
                handlePlayersVotes(player, 'add');
              }}
              onSubtract={() => handlePlayersVotes(player, 'sub')}
            />
          ))}
      </div>
    </div>
  );
}
