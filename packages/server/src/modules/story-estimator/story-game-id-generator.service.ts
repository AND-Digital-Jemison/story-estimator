import { Injectable } from '@nestjs/common';

@Injectable()
export class StoryGameIdGeneratorService {
  public generate(): string{
    // Todo - check no other game have this is
    return Math.floor(Math.random() * 10000).toString();
  }
}
