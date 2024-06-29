/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/Button';

import { ITeamDetails } from '@/store/useMatches/types';
import { CircleMinus, CirclePlus } from 'lucide-react';

interface ITeamData
  extends Pick<
    ITeamDetails,
    | 'win'
    | 'draw'
    | 'loss'
    | 'goalsScored'
    | 'goalsConceded'
    | 'goalsDifference'
  > {}

type TAction = 'add' | 'subtract';

export interface ITeamProps extends ITeamDetails {
  isVisible: boolean;
  teamColor: string;
  numberTeam: string;
  onConfirm(value: ITeamData): void;
  onCancel(): void;
}

export function ModalMatchScores({
  isVisible,
  onCancel,
  onConfirm,
  draw,
  win,
  numberTeam,
  teamColor,
  goalsConceded,
  goalsScored,
  goalsDifference,
  loss,
}: ITeamProps) {
  const [teamData, setTeamData] = useState<ITeamData>({
    draw: draw,
    goalsConceded: goalsConceded,
    goalsScored: goalsScored,
    loss: loss,
    win: win,
    goalsDifference: goalsDifference,
  });

  const onChangeValue = (key: keyof ITeamData, type: TAction) => {
    const value = teamData[key];
    const action: Record<TAction, number> = {
      add: value + 1,
      subtract: value === 0 ? value : value - 1,
    };
    setTeamData((pS) => ({
      ...pS,
      [key]: action[type],
    }));
  };

  useEffect(() => {
    if (isVisible) {
      setTeamData({
        draw: draw,
        goalsConceded: goalsConceded,
        goalsScored: goalsScored,
        loss: loss,
        win: win,
        goalsDifference: goalsDifference,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const goalsDiff = useMemo(
    () => teamData.goalsScored - teamData.goalsConceded,
    [teamData]
  );

  if (!isVisible) return null;

  return (
    <div className="hs-overlay fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-neutral-800/70">
      <div className="modal-content animate-fade-in pointer-events-auto mx-4 flex w-full max-w-lg flex-col rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-200">
            {`Dados do time`}
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
          <div className="mb-6 flex flex-col items-center gap-2">
            <div
              style={{ backgroundColor: teamColor }}
              className="flex items-center justify-center rounded-full px-9 py-6"
            >
              <h2 className="text-2xl font-semibold text-gray-200">
                {numberTeam}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <h1 className="mb-1 text-gray-400">{'VITORIAS'}</h1>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChangeValue('win', 'subtract')}
                >
                  <CircleMinus />
                </button>
                <h1 className="text-3xl font-bold">{teamData.win}</h1>
                <button
                  type="button"
                  onClick={() => onChangeValue('win', 'add')}
                >
                  <CirclePlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 text-gray-400">{'EMPATES'}</h1>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChangeValue('draw', 'subtract')}
                >
                  <CircleMinus />
                </button>
                <h1 className="text-3xl font-bold">{teamData.draw}</h1>
                <button
                  type="button"
                  onClick={() => onChangeValue('draw', 'add')}
                >
                  <CirclePlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 text-gray-400">{'DERROTAS'}</h1>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChangeValue('loss', 'subtract')}
                >
                  <CircleMinus />
                </button>
                <h1 className="text-3xl font-bold">{teamData.loss}</h1>
                <button
                  type="button"
                  onClick={() => onChangeValue('loss', 'add')}
                >
                  <CirclePlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 text-gray-400">{'GOLS A FAVOR'}</h1>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChangeValue('goalsScored', 'subtract')}
                >
                  <CircleMinus />
                </button>
                <h1 className="text-3xl font-bold">{teamData.goalsScored}</h1>
                <button
                  type="button"
                  onClick={() => onChangeValue('goalsScored', 'add')}
                >
                  <CirclePlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 text-gray-400">{'GOLS CONTRA'}</h1>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onChangeValue('goalsConceded', 'subtract')}
                >
                  <CircleMinus />
                </button>
                <h1 className="text-3xl font-bold">{teamData.goalsConceded}</h1>
                <button
                  type="button"
                  onClick={() => onChangeValue('goalsConceded', 'add')}
                >
                  <CirclePlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 text-gray-400">{'SALDO DE GOLS'}</h1>
              <div className="flex gap-3">
                <h1 className="text-3xl font-bold">{goalsDiff}</h1>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button text="Cancelar" variant="outlined" onClick={onCancel} />
            <Button
              text="Confirmar"
              variant="solid"
              onClick={() =>
                onConfirm({
                  ...teamData,
                  goalsDifference: goalsDiff,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
