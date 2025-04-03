import { X } from 'lucide-react';

import { Button } from '@/components/Button';

import { Dialog, DialogClose, DialogContent, DialogTitle } from './ui/dialog';

interface IProps {
  isVisible: boolean;
  onConfirm(): void;
  onCancel(): void;
}

export function ModalConfirmFinishMatch({ isVisible, onCancel, onConfirm }: IProps) {
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
        <div>
          <h4 className="mb-3 font-light text-gray-200">Confirma o termino desta partida ?</h4>
          <h4 className="mb-6 font-light text-gray-400">
            Ao confirmar o termino da partida os dados não podem ser editados.
          </h4>
          <h4 className="mb-6 font-normal text-red-300">
            Lembrou de editar os dados dos jogadores antes de confirmar o terminar da partida ?
          </h4>

          <div className="flex gap-4">
            <Button label="Confirmar" onClick={onConfirm} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
