import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';

import { useMatches } from '@/store/useMatches';
import { ITeams } from '@/store/useMatches/types';

interface IProps {
  isVisible: boolean;
  onConfirm(): void;
  onCancel(): void;
}

export function ModalDefineMatch({ isVisible, onCancel, onConfirm }: IProps) {
  const { setMatch } = useMatches();

  const [time1, setTime1] = useState<keyof ITeams>();
  const [time2, setTime2] = useState<keyof ITeams>();

  useEffect(() => {
    if (isVisible) {
      setTime1(undefined);
      setTime2(undefined);
    }
  }, [isVisible]);

  const handleStartMatches = () => {
    if (time1 && time2) {
      setMatch([time1, time2]);
      onConfirm();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="hs-overlay fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-neutral-800/70">
      <div className="modal-content animate-fade-in pointer-events-auto mx-4 flex w-full max-w-lg flex-col rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-200">
            {`Definir confronto`}
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
          <div className="relative">
            <ul className="my-6 flex flex-row sm:flex-row">
              <li className="-mt-px inline-flex items-center gap-x-2.5 rounded-l-lg border bg-white px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="hs-horizontal-list-group-item-radio-1-time-1"
                      name="hs-horizontal-list-group-item-radio-1"
                      type="radio"
                      disabled={time2 === 'team_1'}
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTime1('team_1')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-1-time-1"
                    className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                  >
                    Time - 1
                  </label>
                </div>
              </li>

              <li className="-mt-px inline-flex items-center gap-x-2.5 border bg-white px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="hs-horizontal-list-group-item-radio-2-time-1"
                      name="hs-horizontal-list-group-item-radio-1"
                      type="radio"
                      disabled={time2 === 'team_2'}
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTime1('team_2')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-2-time-1"
                    className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                  >
                    Time - 2
                  </label>
                </div>
              </li>

              <li className="-mt-px inline-flex items-center gap-x-2.5 rounded-r-lg border bg-white px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="hs-horizontal-list-group-item-radio-3-time-1"
                      name="hs-horizontal-list-group-item-radio-1"
                      type="radio"
                      disabled={time2 === 'team_3'}
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTime1('team_3')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-3-time-1"
                    className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                  >
                    Time - 3
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <h1 className="y-4 text-center text-xl font-bold text-gray-100">
            Vs
          </h1>

          <div>
            <ul className="my-6 flex flex-row sm:flex-row">
              <li className="-mt-px inline-flex items-center gap-x-2.5 rounded-l-lg border bg-white px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="hs-horizontal-list-group-item-radio-1-time-2"
                      name="hs-horizontal-list-group-item-radio-2"
                      type="radio"
                      disabled={time1 === 'team_1'}
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTime2('team_1')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-1-time-2"
                    className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                  >
                    Time - 1
                  </label>
                </div>
              </li>

              <li className="-mt-px inline-flex items-center gap-x-2.5 border bg-white px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="hs-horizontal-list-group-item-radio-2-time-2"
                      name="hs-horizontal-list-group-item-radio-2"
                      type="radio"
                      disabled={time1 === 'team_2'}
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTime2('team_2')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-2-time-2"
                    className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                  >
                    Time - 2
                  </label>
                </div>
              </li>

              <li className="-mt-px inline-flex items-center gap-x-2.5 rounded-r-lg border bg-white px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="hs-horizontal-list-group-item-radio-3-time-2"
                      name="hs-horizontal-list-group-item-radio-2"
                      type="radio"
                      disabled={time1 === 'team_3'}
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTime2('team_3')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-3-time-2"
                    className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                  >
                    Time - 3
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 pt-5">
            <Button text="Cancelar" variant="outlined" onClick={onCancel} />
            <Button
              text="Confirmar"
              variant="solid"
              onClick={handleStartMatches}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
