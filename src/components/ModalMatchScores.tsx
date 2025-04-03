import { CircleMinus, CirclePlus, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/Button';
import { ITeamDetails } from '@/store/useMatches/types';

import { Dialog, DialogClose, DialogContent, DialogTitle } from './ui/dialog';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ITeamData
  extends Pick<
    ITeamDetails,
    'win' | 'draw' | 'loss' | 'goalsScored' | 'goalsConceded' | 'goalsDifference'
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

  const goalsDiff = useMemo(() => teamData.goalsScored - teamData.goalsConceded, [teamData]);

  return (
    <Dialog modal onOpenChange={() => onCancel()} open={isVisible}>
      <DialogContent className="border-slate-700 bg-slate-900 [&>button:last-child]:hidden">
        <DialogClose asChild>
          <button
            className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </DialogClose>

        <DialogTitle>
          <h2 className="text-sm font-semibold text-gray-200 md:text-lg">{`Dados do time`}</h2>
        </DialogTitle>

        <div className="flex flex-col">
          <div className="mb-6 flex flex-col items-center gap-2">
            <div
              style={{ backgroundColor: teamColor }}
              className="flex items-center justify-center rounded-full px-9 py-6"
            >
              <h2 className="text-3xl font-bold text-slate-100">{numberTeam}</h2>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <h1 className="mb-1 font-bold text-slate-200">{'VITORIAS'}</h1>
              <div className="flex gap-3">
                <button type="button" onClick={() => onChangeValue('win', 'subtract')}>
                  <CircleMinus className="text-slate-400" />
                </button>
                <h1 className="text-3xl font-bold text-slate-300">{teamData.win}</h1>
                <button type="button" onClick={() => onChangeValue('win', 'add')}>
                  <CirclePlus className="text-slate-400" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 font-bold text-slate-200">{'EMPATES'}</h1>
              <div className="flex gap-3">
                <button type="button" onClick={() => onChangeValue('draw', 'subtract')}>
                  <CircleMinus className="text-slate-400" />
                </button>
                <h1 className="text-3xl font-bold text-slate-300">{teamData.draw}</h1>
                <button type="button" onClick={() => onChangeValue('draw', 'add')}>
                  <CirclePlus className="text-slate-400" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 font-bold text-slate-200">{'DERROTAS'}</h1>
              <div className="flex gap-3 text-slate-200">
                <button type="button" onClick={() => onChangeValue('loss', 'subtract')}>
                  <CircleMinus className="text-slate-400" />
                </button>
                <h1 className="text-3xl font-bold text-slate-300">{teamData.loss}</h1>
                <button type="button" onClick={() => onChangeValue('loss', 'add')}>
                  <CirclePlus className="text-slate-400" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 font-bold text-slate-200">{'GOLS A FAVOR'}</h1>
              <div className="flex gap-3">
                <button type="button" onClick={() => onChangeValue('goalsScored', 'subtract')}>
                  <CircleMinus className="text-slate-400" />
                </button>
                <h1 className="text-3xl font-bold text-slate-300">{teamData.goalsScored}</h1>
                <button type="button" onClick={() => onChangeValue('goalsScored', 'add')}>
                  <CirclePlus className="text-slate-400" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 font-bold text-slate-200">{'GOLS CONTRA'}</h1>
              <div className="flex gap-3">
                <button type="button" onClick={() => onChangeValue('goalsConceded', 'subtract')}>
                  <CircleMinus className="text-slate-400" />
                </button>
                <h1 className="text-3xl font-bold text-slate-300">{teamData.goalsConceded}</h1>
                <button type="button" onClick={() => onChangeValue('goalsConceded', 'add')}>
                  <CirclePlus className="text-slate-400" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 font-bold text-slate-200">{'SALDO DE GOLS'}</h1>
              <div className="flex gap-3">
                <h1 className="text-3xl font-bold text-slate-300">{goalsDiff}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button className="w-1/3" label="Cancelar" variant="secondary" onClick={onCancel} />
          <Button
            className="w-1/3"
            label="Confirmar"
            onClick={() =>
              onConfirm({
                ...teamData,
                goalsDifference: goalsDiff,
              })
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
