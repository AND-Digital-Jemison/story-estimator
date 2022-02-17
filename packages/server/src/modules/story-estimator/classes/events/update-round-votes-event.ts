import { StoryEvents } from '../../constants/story-events';
import { RoundVotesCount } from '../dto/RoundVotesCount';

export class UpdateRoundVotesEvent {
  event = StoryEvents.reveal;
  gameId: string;
  currentRoundVotesCount: RoundVotesCount;

  constructor(gameId: string, currentRoundVotesCount: RoundVotesCount) {
    this.gameId = gameId;
    this.currentRoundVotesCount = currentRoundVotesCount;
  }
}
