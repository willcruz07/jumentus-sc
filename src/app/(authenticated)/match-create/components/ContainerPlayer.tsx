/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';

import { ITeams } from '@/store/useMatches/types';

interface IProps {
  name: string;
  fullName: string;
  flexCol?: boolean;
  onClick?(value: string): void;
  teams?: ITeams;
  goalKeeperOk?: boolean;
}

export function ContainerPlayer({
  fullName,
  name,
  flexCol,
  onClick,
  goalKeeperOk,
  teams,
}: IProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [teamSelected, setTeamSelected] = useState('');

  useEffect(() => {
    if (modalOpen) setTeamSelected('');
  }, [modalOpen]);

  const handleConfirmTeam = () => {
    if (teamSelected && onClick) {
      onClick(teamSelected);
      setModalOpen(false);
    }
  };

  const findTeam = (player: string): string => {
    if (!teams) return '';

    const team: Record<keyof ITeams, string> = {
      team_1: 'Time - 1',
      team_2: 'Time - 2',
      team_3: 'Time - 3',
    };

    for (const teamKey in teams) {
      if (teams[teamKey as keyof ITeams].includes(player)) {
        return team[teamKey as keyof ITeams] ?? '';
      }
    }
    return '';
  };

  return (
    <>
      <button
        data-hs-overlay="#hs-slide-up-animation-modal"
        type="button"
        className={`flex min-w-20 ${flexCol ? 'flex-col' : ''} items-center gap-3 pl-3 pr-6`}
        onClick={() => onClick && setModalOpen(!modalOpen)}
      >
        <img
          className="inline-block size-11 rounded-full object-cover"
          src={`/img/players/${fullName?.toLowerCase().replace(' ', '_')}.jpg`}
          alt="Image Description"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError={(e: any) => {
            e.target.onerror === null;
            e.target.src = '/img/logo.png';
          }}
        />
        <h1
          className={`overflow-hidden text-ellipsis text-nowrap font-sans text-${flexCol ? 'sm' : 'lg'} ${flexCol ? 'text-gray-400' : 'text-gray-200'} ${onClick ? 'hover:bg-gray-950' : ''}`}
        >
          {name}
        </h1>
        {teams && findTeam(name) && (
          <h1
            className={`text-md overflow-hidden text-ellipsis text-nowrap font-sans text-gray-400`}
          >
            {` *  ${findTeam(name)} *`}
          </h1>
        )}
      </button>

      {modalOpen && (
        <div className="hs-overlay fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-neutral-800/70">
          <div className="modal-content animate-fade-in pointer-events-auto mx-4 flex w-full max-w-lg flex-col rounded-xl border border-gray-700 bg-gray-900 p-5 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-200">
                {`Qual o time de ${name} ?`}
              </h2>

              <button
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={() => setModalOpen(false)}
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
            <ul className="my-6 flex flex-row sm:flex-row">
              <li className="-mt-px inline-flex items-center gap-x-2.5 rounded-l-lg border bg-white px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white">
                <div className="relative flex w-full items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="hs-horizontal-list-group-item-radio-1"
                      name="hs-horizontal-list-group-item-radio"
                      type="radio"
                      disabled={
                        teams &&
                        teams?.team_1?.length === (goalKeeperOk ? 6 : 5)
                      }
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTeamSelected('team_1')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-1"
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
                      id="hs-horizontal-list-group-item-radio-2"
                      name="hs-horizontal-list-group-item-radio"
                      type="radio"
                      disabled={
                        teams &&
                        teams?.team_2?.length === (goalKeeperOk ? 6 : 5)
                      }
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTeamSelected('team_2')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-2"
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
                      id="hs-horizontal-list-group-item-radio-3"
                      name="hs-horizontal-list-group-item-radio"
                      type="radio"
                      disabled={
                        teams &&
                        teams?.team_3?.length === (goalKeeperOk ? 6 : 5)
                      }
                      className="size-4 rounded-full border-gray-200 accent-amber-500 disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-amber-500 dark:checked:bg-amber-500 dark:focus:ring-offset-gray-800"
                      onChange={() => setTeamSelected('team_3')}
                    />
                  </div>
                  <label
                    htmlFor="hs-horizontal-list-group-item-radio-3"
                    className="ms-3 block w-full text-sm text-gray-600 dark:text-neutral-500"
                  >
                    Time - 3
                  </label>
                </div>
              </li>
            </ul>

            <Button
              text="Confirmar"
              onClick={handleConfirmTeam}
              variant="solid"
            />
          </div>
        </div>
      )}
    </>
  );
}
