import { Session } from '~/modules/common/dto/Session';

export interface GameEvents {
  create: (name: string, title?: string) => Session;
  join: (name: string, code: string) => Session;
  point: (userId: number, gameId: number, point: string) => Session;
  complete: (gameId: number, point: string) => Session;
  end: (game: number) => void;
}
