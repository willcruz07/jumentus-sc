import { CircleMinus, CirclePlus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import Logo from '@/assets/logo.png';
import { Button } from '@/components/Button';
import { IPlayersScoreOnTheDay } from '@/store/useMatches/types';

import { Dialog, DialogClose, DialogContent, DialogTitle } from './ui/dialog';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IPlayerData
  extends Pick<IPlayersScoreOnTheDay, 'assists' | 'goals' | 'saves' | 'tackles'> {}
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
          <h2 className="text-sm font-semibold text-gray-200 md:text-lg">{`Dados do Jogador`}</h2>
        </DialogTitle>

        <div className="flex flex-col">
          <div className="mb-2 flex flex-col items-center gap-2">
            <img
              className="inline-block size-40 rounded-full object-cover"
              src={`/players/${fullName?.toLowerCase().replace(' ', '_')}.jpg`}
              alt="Image Description"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onError={(e: any) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                e.target.onerror === null;
                e.target.src = Logo;
              }}
            />
            <h2 className="mb-3 text-2xl font-semibold text-gray-200">{fullName}</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col items-center">
              <h1 className="mb-1 font-bold text-slate-200">{'GOLS'}</h1>
              <div className="flex gap-3">
                <button type="button" onClick={() => onChangeValue('goals', 'subtract')}>
                  <CircleMinus className="text-slate-400" />
                </button>
                <h1 className="text-3xl font-bold text-slate-300">{playerData.goals}</h1>
                <button type="button" onClick={() => onChangeValue('goals', 'add')}>
                  <CirclePlus className="text-slate-400" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 font-bold text-slate-200">{'ASSISTENCIAS'}</h1>
              <div className="flex gap-3">
                <button type="button" onClick={() => onChangeValue('assists', 'subtract')}>
                  <CircleMinus className="text-slate-400" />
                </button>
                <h1 className="text-3xl font-bold text-slate-300">{playerData.assists}</h1>
                <button type="button" onClick={() => onChangeValue('assists', 'add')}>
                  <CirclePlus className="text-slate-400" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 font-bold text-slate-200">{'FALTAS'}</h1>
              <div className="flex gap-3">
                <button type="button" onClick={() => onChangeValue('tackles', 'subtract')}>
                  <CircleMinus className="text-slate-400" />
                </button>
                <h1 className="text-3xl font-bold text-slate-300">{playerData.tackles}</h1>
                <button type="button" onClick={() => onChangeValue('tackles', 'add')}>
                  <CirclePlus className="text-slate-400" />
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="mb-1 font-bold text-slate-200">{'DEFESAS'}</h1>
              <div className="flex gap-3">
                <button type="button" onClick={() => onChangeValue('saves', 'subtract')}>
                  <CircleMinus className="text-slate-400" />
                </button>
                <h1 className="text-3xl font-bold text-slate-300">{playerData.saves}</h1>
                <button type="button" onClick={() => onChangeValue('saves', 'add')}>
                  <CirclePlus className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Button label="Confirmar" onClick={() => onConfirm(playerData)} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
