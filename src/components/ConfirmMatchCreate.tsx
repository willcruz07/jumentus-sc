import { DialogClose } from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { Button } from '@/components/Button';

import { Dialog, DialogContent, DialogTitle } from './ui/dialog';

interface IProps {
  isVisible: boolean;
  onConfirm(): void;
  onCancel(): void;
}

export function ConfirmMatchCreate({ isVisible, onCancel, onConfirm }: IProps) {
  // if (!isVisible) return null;

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
          <h2 className="text-sm font-semibold text-gray-200 md:text-lg">{`Confirma a criação desta partida ?`}</h2>
        </DialogTitle>

        <div>
          <h4 className="mb-6 text-sm font-light text-gray-400 md:text-base">
            Verifique bem todos os times pois ao confirmar os times não podem mais ser alterado.
          </h4>
        </div>

        <div className="flex justify-end gap-4">
          <Button className="w-1/3" label="Cancelar" variant="secondary" onClick={onCancel} />
          <Button className="w-1/3" label="Confirmar" onClick={onConfirm} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
