import { Button } from '@/components/Button';

interface IProps {
  isVisible: boolean;
  onConfirm(): void;
  onCancel(): void;
}

export function ModalConfirmFinishMatch({
  isVisible,
  onCancel,
  onConfirm,
}: IProps) {
  if (!isVisible) return null;

  return (
    <div className="hs-overlay fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-neutral-800/70">
      <div className="modal-content animate-fade-in pointer-events-auto mx-4 flex w-full max-w-lg flex-col rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-200">
            {`Finalizar partida`}
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
        <div>
          <h4 className="mb-3 font-light text-gray-200">
            Confirma o termino desta partida ?
          </h4>
          <h4 className="mb-6 font-light text-gray-400">
            Ao confirmar o termino da partida os dados não podem ser editados.
          </h4>

          <div className="flex gap-4">
            <Button text="Cancelar" variant="outlined" onClick={onCancel} />
            <Button text="Confirmar" variant="solid" onClick={onConfirm} />
          </div>
        </div>
      </div>
    </div>
  );
}
