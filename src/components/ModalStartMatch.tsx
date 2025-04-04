import clsx from 'clsx';
import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { useMatches } from '@/store/useMatches';
import { ITeams } from '@/store/useMatches/types';

import { Dialog, DialogClose, DialogContent, DialogTitle } from './ui/dialog';

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

  return (
    <Dialog modal onOpenChange={() => onCancel()} open={isVisible}>
      <DialogContent className="border-slate-700 bg-slate-900 [&>button:last-child]:hidden">
        <DialogClose asChild>
          <button
            className="absolute top-4 right-4 cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </DialogClose>

        <DialogTitle>
          <h2 className="text-sm font-semibold text-gray-200 md:text-lg">{`Dados dos Times`}</h2>
        </DialogTitle>
        <div className="flex flex-col">
          <div>
            <ul className="my-6 flex w-full flex-col">
              <li
                onClick={() => time2 !== 'team_1' && setTime1('team_1')}
                className={clsx(
                  '-mt-px inline-flex flex-1 items-center gap-x-2.5 rounded-t-lg border border-slate-700 px-4 py-3',
                  {
                    'bg-blue-800': time1 == 'team_1',
                  },
                )}
              >
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <div
                      className={clsx(
                        'flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-colors',
                        {
                          'border-blue-300 bg-blue-950 text-white': time1 === 'team_1',
                          'border-slate-400 bg-transparent': time1 !== 'team_1',
                          'opacity-50': time2 === 'team_1',
                        },
                      )}
                    >
                      {time1 === 'team_1' && <Check size={14} />}
                    </div>
                  </div>
                  <label
                    className={clsx(
                      'ms-3 block w-full flex-nowrap text-sm font-bold text-nowrap text-slate-200 select-none',
                      {
                        'opacity-50': time2 === 'team_1',
                      },
                    )}
                  >
                    Time - 1
                  </label>
                </div>
              </li>

              <li
                onClick={() => time2 !== 'team_2' && setTime1('team_2')}
                className={clsx(
                  '-mt-px inline-flex flex-1 items-center gap-x-2.5 border border-slate-700 px-4 py-3',
                  {
                    'bg-yellow-600': time1 == 'team_2',
                  },
                )}
              >
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <div
                      className={clsx(
                        'flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-colors',
                        {
                          'border-yellow-300 bg-amber-800 text-white': time1 === 'team_2',
                          'border-slate-400 bg-transparent': time1 !== 'team_2',
                          'opacity-50': time2 === 'team_2',
                        },
                      )}
                    >
                      {time1 === 'team_2' && <Check size={14} />}
                    </div>
                  </div>
                  <label
                    className={clsx(
                      'ms-3 block w-full flex-nowrap text-sm font-bold text-nowrap text-slate-200 select-none',
                      {
                        'opacity-50': time2 === 'team_2',
                      },
                    )}
                  >
                    Time - 2
                  </label>
                </div>
              </li>

              <li
                onClick={() => time2 !== 'team_3' && setTime1('team_3')}
                className={clsx(
                  '-mt-px inline-flex flex-1 items-center gap-x-2.5 rounded-b-lg border-2 border-slate-700 px-4 py-3',
                  {
                    'bg-pink-700': time1 == 'team_3',
                  },
                )}
              >
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <div
                      className={clsx(
                        'flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-colors',
                        {
                          'border-pink-300 bg-pink-800 text-white': time1 === 'team_3',
                          'border-slate-400 bg-transparent': time1 !== 'team_3',
                          'opacity-50': time2 === 'team_3',
                        },
                      )}
                    >
                      {time1 === 'team_3' && <Check size={14} />}
                    </div>
                  </div>
                  <label
                    className={clsx(
                      'ms-3 block w-full flex-nowrap text-sm font-bold text-nowrap text-slate-200 select-none',
                      {
                        'opacity-50': time2 === 'team_3',
                      },
                    )}
                  >
                    Time - 3
                  </label>
                </div>
              </li>
            </ul>
          </div>

          <h1 className="y-4 text-center text-xl font-bold text-gray-100 select-none">Vs</h1>

          <div>
            <ul className="my-6 flex w-full flex-col">
              <li
                onClick={() => time1 !== 'team_1' && setTime2('team_1')}
                className={clsx(
                  '-mt-px inline-flex flex-1 items-center gap-x-2.5 rounded-t-lg border border-slate-700 px-4 py-3',
                  {
                    'bg-blue-800': time2 == 'team_1',
                  },
                )}
              >
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <div
                      className={clsx(
                        'flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-colors',
                        {
                          'border-blue-300 bg-blue-950 text-white': time2 === 'team_1',
                          'border-slate-400 bg-transparent': time2 !== 'team_1',
                          'opacity-50': time1 === 'team_1',
                        },
                      )}
                    >
                      {time2 === 'team_1' && <Check size={14} />}
                    </div>
                  </div>
                  <label
                    className={clsx(
                      'ms-3 block w-full flex-nowrap text-sm font-bold text-nowrap text-slate-200 select-none',
                      {
                        'opacity-50': time1 === 'team_1',
                      },
                    )}
                  >
                    Time - 1
                  </label>
                </div>
              </li>

              <li
                onClick={() => time1 !== 'team_2' && setTime2('team_2')}
                className={clsx(
                  '-mt-px inline-flex flex-1 items-center gap-x-2.5 border border-slate-700 px-4 py-3',
                  {
                    'bg-yellow-600': time2 == 'team_2',
                  },
                )}
              >
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <div
                      className={clsx(
                        'flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-colors',
                        {
                          'border-yellow-300 bg-amber-800 text-white': time2 === 'team_2',
                          'border-slate-400 bg-transparent': time2 !== 'team_2',
                          'opacity-50': time1 === 'team_2',
                        },
                      )}
                    >
                      {time2 === 'team_2' && <Check size={14} />}
                    </div>
                  </div>
                  <label
                    className={clsx(
                      'ms-3 block w-full flex-nowrap text-sm font-bold text-nowrap text-slate-200 select-none',
                      {
                        'opacity-50': time1 === 'team_2',
                      },
                    )}
                  >
                    Time - 2
                  </label>
                </div>
              </li>

              <li
                onClick={() => time1 !== 'team_3' && setTime2('team_3')}
                className={clsx(
                  '-mt-px inline-flex flex-1 items-center gap-x-2.5 rounded-b-lg border-2 border-slate-700 px-4 py-3',
                  {
                    'bg-pink-700': time2 == 'team_3',
                  },
                )}
              >
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <div
                      className={clsx(
                        'flex h-5 w-5 items-center justify-center rounded-sm border-2 transition-colors',
                        {
                          'border-pink-300 bg-pink-800 text-white': time2 === 'team_3',
                          'border-slate-400 bg-transparent': time2 !== 'team_3',
                          'opacity-50': time1 === 'team_3',
                        },
                      )}
                    >
                      {time2 === 'team_3' && <Check size={14} />}
                    </div>
                  </div>
                  <span
                    className={clsx(
                      'ms-3 block w-full flex-nowrap text-sm font-bold text-nowrap text-slate-200 select-none',
                      {
                        'opacity-50': time1 === 'team_3',
                      },
                    )}
                  >
                    Time - 3
                  </span>
                </div>
              </li>
            </ul>
            {/* <ul className="my-6 flex w-full flex-col">
              <li className="-mt-px inline-flex flex-1 items-center gap-x-2.5 rounded-l-lg border border-slate-600 bg-transparent px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="hs-horizontal-list-group-item-radio-2-time-1"
                      name="hs-horizontal-list-group-item-radio-2"
                      type="radio"
                      disabled={time1 === 'team_1'}
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTime2('team_1')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-1-time-2"
                    className="ms-3 block w-full flex-nowrap text-sm text-nowrap text-gray-600 dark:text-neutral-500"
                  >
                    Time - 1
                  </label>
                </div>
              </li>

              <li className="-mt-px inline-flex flex-1 items-center gap-x-2.5 border border-slate-600 bg-transparent px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
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
                    className="ms-3 block w-full flex-nowrap text-sm text-nowrap text-gray-600 dark:text-neutral-500"
                  >
                    Time - 2
                  </label>
                </div>
              </li>

              <li className="-mt-px inline-flex flex-1 items-center gap-x-2.5 rounded-r-lg border border-slate-600 bg-transparent px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="hs-horizontal-list-group-item-radio-2-time-3"
                      name="hs-horizontal-list-group-item-radio-2"
                      type="radio"
                      disabled={time1 === 'team_3'}
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTime2('team_3')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-2-time-3"
                    className="ms-3 block w-full flex-nowrap text-sm text-nowrap text-gray-600 dark:text-neutral-500"
                  >
                    Time - 3
                  </label>
                </div>
              </li>
            </ul> */}
          </div>

          <div className="flex gap-4 pt-5">
            <Button label="Confirmar" onClick={handleStartMatches} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
