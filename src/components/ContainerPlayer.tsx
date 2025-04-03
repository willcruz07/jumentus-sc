/* eslint-disable @typescript-eslint/no-unused-expressions */
import { X } from 'lucide-react';
import { useState } from 'react';

import Logo from '@/assets/logo.png';
import { Button } from '@/components/Button';
import { ITeams } from '@/store/useMatches/types';

import { Dialog, DialogContent, DialogClose, DialogTitle } from './ui/dialog';

interface IProps {
  name: string;
  fullName: string;
  flexCol?: boolean;
  onClick?(value: string): void;
  teams?: ITeams;
  goalKeeperOk?: boolean;
  className?: string;
}

export function ContainerPlayer({ fullName, name, flexCol, onClick, teams, className }: IProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleConfirmTeam = (teamSelected: string) => {
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
        className={`flex min-w-24 ${flexCol ? 'flex-col' : ''} ${className} items-center gap-3`}
        onClick={() => onClick && setModalOpen(!modalOpen)}
      >
        <img
          className="inline-block size-13 rounded-full object-cover"
          src={`/players/${fullName?.toLowerCase().replace(' ', '_')}.jpg`}
          alt="Image Description"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError={(e: any) => {
            e.target.onerror === null;
            e.target.src = Logo;
          }}
        />
        <h1
          className={`overflow-hidden font-sans break-words text-ellipsis text-${flexCol ? 'sm' : 'lg'} ${flexCol ? 'text-gray-400' : 'text-gray-200'} ${onClick ? 'hover:bg-gray-950' : ''}`}
        >
          {name}
        </h1>
        {teams && findTeam(name) && (
          <h1
            className={`text-md overflow-hidden font-sans text-nowrap text-ellipsis text-gray-400`}
          >
            {` *  ${findTeam(name)} *`}
          </h1>
        )}
      </button>

      <Dialog modal onOpenChange={(open) => setModalOpen(open)} open={modalOpen}>
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
            <h2 className="text-lg font-semibold text-gray-200">{`Qual o time de ${name} ?`}</h2>
          </DialogTitle>

          <div className="flex flex-col gap-4">
            <Button
              className="bg-blue-800"
              label="Time - 1"
              onClick={() => handleConfirmTeam('team_1')}
            />
            <Button
              className="bg-pink-800"
              label="Time - 2"
              onClick={() => handleConfirmTeam('team_2')}
            />
            <Button
              className="bg-yellow-700"
              label="Time - 3"
              onClick={() => handleConfirmTeam('team_3')}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
