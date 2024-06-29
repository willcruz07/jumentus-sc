/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';

import { IPlayersScoreOnTheDay } from '@/store/useMatches/types';
import { CircleMinus, CirclePlus } from 'lucide-react';

interface IPlayerData
  extends Pick<
    IPlayersScoreOnTheDay,
    'assists' | 'goals' | 'saves' | 'tackles'
  > {}
type TAction = 'add' | 'subtract';

interface IProps extends IPlayersScoreOnTheDay {
  isVisible: boolean;
  onConfirm(value: IPlayerData): void;
  onCancel(): void;
}

export function ModalPlayerScore({
  isVisible,
  onCancel,
  onConfirm,
  assists,
  fullName,
  goals,
  saves,
  tackles,
}: IProps) {
  const [playerData, setPlayerData] = useState<IPlayerData>({
    assists: assists,
    goals: goals,
    saves: saves,
    tackles: tackles,
  });

  const onChangeValue = (key: keyof IPlayerData, type: TAction) => {
    const value = playerData[key];
    const action: Record<TAction, number> = {
      add: value + 1,
      subtract: value === 0 ? value : value - 1,
    };
    setPlayerData((pS) => ({
      ...pS,
      [key]: action[type],
    }));
  };

  useEffect(() => {
    if (isVisible) {
      setPlayerData({
        assists: assists,
        goals: goals,
        saves: saves,
        tackles: tackles,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="hs-overlay fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-neutral-800/70">
      <div className="modal-content animate-fade-in pointer-events-auto mx-4 flex w-full max-w-lg flex-col rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-200">
            {`Dados do jogador`}
          </h2>

          <button
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            onClick={() => onCancel()}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col">
          <div className="mb-2 flex flex-col items-center gap-2">
            <img
              className="inline-block size-32 rounded-full object-cover"
              src={`/img/players/${fullName?.toLowerCase().replace(' ', '_')}.jpg`}
              alt="Image Description"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onError={(e: any) => {
                e.target.onerror === null;
                e.target.src = '/img/logo.png';
              }}
            />
            <h2 className="mb-3 text-2xl font-semibold text-gray-200">
              {fullName}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <h1 className="mb-1 text-gray-400">{'GOLS'}</h1>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChangeValue('goals', 'subtract')}
                >
                  <CircleMinus />
                </button>
                <h1 className="text-3xl font-bold">{playerData.goals}</h1>
                <button
                  type="button"
                  onClick={() => onChangeValue('goals', 'add')}
                >
                  <CirclePlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 text-gray-400">{'ASSISTENCIAS'}</h1>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChangeValue('assists', 'subtract')}
                >
                  <CircleMinus />
                </button>
                <h1 className="text-3xl font-bold">{playerData.assists}</h1>
                <button
                  type="button"
                  onClick={() => onChangeValue('assists', 'add')}
                >
                  <CirclePlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 text-gray-400">{'FALTAS'}</h1>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChangeValue('tackles', 'subtract')}
                >
                  <CircleMinus />
                </button>
                <h1 className="text-3xl font-bold">{playerData.tackles}</h1>
                <button
                  type="button"
                  onClick={() => onChangeValue('tackles', 'add')}
                >
                  <CirclePlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 text-gray-400">{'DEFESAS'}</h1>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChangeValue('saves', 'subtract')}
                >
                  <CircleMinus />
                </button>
                <h1 className="text-3xl font-bold">{playerData.saves}</h1>
                <button
                  type="button"
                  onClick={() => onChangeValue('saves', 'add')}
                >
                  <CirclePlus />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button text="Cancelar" variant="outlined" onClick={onCancel} />
            <Button
              text="Confirmar"
              variant="solid"
              onClick={() => onConfirm(playerData)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
