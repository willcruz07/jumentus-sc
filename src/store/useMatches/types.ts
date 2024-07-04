import { Unsubscribe } from 'firebase/firestore';

import { IDefaultStates } from '../helpers/setStates';

export type TActions = {
  startListenerOfOnGoingMatches(): Unsubscribe;

  createMatch(data: ICreateMatch): Promise<void>;

  setFinishMatch(): Promise<void>;
  setFinishDay(): Promise<void>;

  setGoals(data: [number, number]): Promise<void>;
  setPlayerWhoScored(name: string): Promise<void>;
  setPlayersScoreOnTheDay(player: IPlayersScoreOnTheDay): Promise<void>;
  setTeamScoresOnTheDay(team: ITeamScoreOnTheDay): Promise<void>;

  startMatch(): Promise<void>;
  pauseMatch(): Promise<void>;
  restartMatch(): Promise<void>;

  setMatch(data: [keyof ITeams, keyof ITeams]): Promise<void>;

  setFinishVotes(data: IFinishVotes): Promise<void>;
  setVotes(data: IVotes): Promise<void>;
};

export type TState = IDefaultStates<TActions> & IMatchState;

export interface IMatchState {
  matchId?: string;
  inProgress: boolean;
  waitingForEvent: boolean;
  date?: Date;
  inMatchingVote?: boolean;
  matchPlayers?: IPlayersList | null;
  matchTeams?: ITeams | null;
  teamScoresOnTheDay?: IMatchScores | null;
  playersScoreOnTheDay: Array<IPlayersScoreOnTheDay>;
  matchInProgress?: IMatchInProgress | null;
  finishedMatches: Array<IMatchInProgress>;
  playerOfTheDay?: IPlayersScoreOnTheDay | null;
  worstPlayerOfTheDay?: IPlayersScoreOnTheDay | null;

  votesWorstPlayers: Array<IPlayerOfTheDay>;
  votesBestPlayers: Array<IPlayerOfTheDay>;
}

interface IVotes {
  best: Array<IPlayerOfTheDay>;
  worst: Array<IPlayerOfTheDay>;
}

interface IFinishVotes {
  best: IPlayerOfTheDay;
  worst: IPlayerOfTheDay;
}

export interface IPlayerOfTheDay extends IPlayersScoreOnTheDay {
  votes: number;
}

export interface ICreateMatch {
  teams: ITeams;
  players: IPlayersList;
  date: Date;
}

export interface IPlayersList {
  players: Array<string>;
  goalKeepers: Array<string>;
}

export interface ITeams {
  team_1: Array<string>;
  team_2: Array<string>;
  team_3: Array<string>;
}

export interface IMatchInProgress {
  started: boolean;
  teams: [keyof ITeams, keyof ITeams];
  goals: [number, number];
  startTime: Date | null;
  endTime: Date | null;
  pausedTime?: Date | null;
  playersWhoScored: Array<string>;
}

interface ITeamScoreOnTheDay extends ITeamDetails {
  team: keyof IMatchScores;
}

export interface IMatchScores {
  team_1: ITeamDetails;
  team_2: ITeamDetails;
  team_3: ITeamDetails;
}

export interface IPlayersScoreOnTheDay {
  name: string;
  fullName: string;
  goals: number;
  assists: number;
  tackles: number;
  saves: number;
}

export interface ITeamDetails {
  win: number;
  draw: number;
  loss: number;
  goalsConceded: number;
  goalsScored: number;
  goalsDifference: number;
}
