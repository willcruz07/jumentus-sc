import { IMatchScores } from '@/store/useMatches/types';
import dayjs, { Dayjs } from 'dayjs';

/* eslint-disable @typescript-eslint/no-unused-vars */

export interface ITimeRemaining {
  total: number;
  minutes: number;
  seconds: number;
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  return rest;
}

export function getTeamColors(team: keyof IMatchScores) {
  const color: Record<keyof IMatchScores, string> = {
    team_1: 'bg-white',
    team_2: 'bg-pink-600',
    team_3: 'bg-amber-600',
  };

  return color[team] ?? 'bg-black';
}

export function calculateTimeRemaining(start: Dayjs): ITimeRemaining {
  const endTime = start.add(7, 'minute');
  const now = dayjs();
  const total = endTime.diff(now);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return {
    total,
    minutes,
    seconds,
  };
}
