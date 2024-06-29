import { IMatchScores } from '@/store/useMatches/types';
import dayjs, { Dayjs } from 'dayjs';

/* eslint-disable @typescript-eslint/no-unused-vars */

export interface ITimeRemaining {
  total: number;
  minutes: number;
  seconds: number;
}

export interface ITimeCountdown {
  startTime: Date;
  pauseTime?: Date;
  baseMinutes: string;
}

export function omit<T extends object, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> {
  const { [key]: _, ...rest } = obj;
  return rest;
}

export function getTeamColors(team?: keyof IMatchScores | null) {
  const color: Record<keyof IMatchScores, string> = {
    team_1: '#c2410c',
    team_2: '#1e40af',
    team_3: '#166534',
  };

  if (!team) return '#111827';

  return color[team];
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

export const timeToSeconds = (time: string): number => {
  const [minutes, seconds] = time.split(':').map(Number);
  return minutes * 60 + seconds;
};

export const secondsToTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const formatTimeDiffBetweenNowAndDate = (startTime: Date) => {
  const diffInSeconds = dayjs().diff(dayjs(startTime), 'second');

  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const subtractTimes = (time1: string, time2: string) => {
  const time1InSeconds = timeToSeconds(time1);
  const time2InSeconds = timeToSeconds(time2);
  const diffInSeconds = time1InSeconds - time2InSeconds;
  return secondsToTime(diffInSeconds);
};

export const getTimeCountDown = ({
  startTime,
  pauseTime,
  baseMinutes,
}: ITimeCountdown) => {
  if (!pauseTime) {
    const diffStart = subtractTimes(
      formatTimeDiffBetweenNowAndDate(startTime),
      formatTimeDiffBetweenNowAndDate(dayjs().toDate())
    );

    const calcTime = timeToSeconds(baseMinutes) - timeToSeconds(diffStart);
    if (calcTime <= 0) {
      return '00:00';
    }
    return secondsToTime(calcTime);
  }

  const diffPauseTime = subtractTimes(
    formatTimeDiffBetweenNowAndDate(startTime),
    formatTimeDiffBetweenNowAndDate(pauseTime)
  );

  const newBasedTime =
    timeToSeconds(baseMinutes) - timeToSeconds(diffPauseTime);

  if (newBasedTime <= 0) {
    return '00:00';
  }

  return secondsToTime(newBasedTime);
};
