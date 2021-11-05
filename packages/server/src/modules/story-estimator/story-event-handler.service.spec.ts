import { Test, TestingModule } from "@nestjs/testing";
import { Game } from "./classes/dto/Game";
import { GameRound } from "./classes/dto/GameRound";
import { Round } from "./classes/dto/Round";
import { Session } from "./classes/dto/Session";
import { User } from "./classes/dto/User";
import { CompleteRoundEvent } from "./classes/events/complete-round-event";
import { JoinGameEvent } from "./classes/events/join-game-event";
import { NewGameEvent } from "./classes/events/new-game-event";
import { PointGameEvent } from "./classes/events/point-game-event";
import { StoryEventHandlerService } from "./story-event-handler.service";
import { StoryGameIdGeneratorService } from "./story-game-id-generator.service";
import { StoryGameRepository } from "./story-game.repository";

jest.mock("ws");

describe("StoryEventHandlerService", () => {
  let storyEventHandlerService: StoryEventHandlerService;
  let storyGameIdGeneratorService: StoryGameIdGeneratorService;
  let storyGameRepository: StoryGameRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoryEventHandlerService,
        {
          provide: StoryGameRepository,
          useValue: {}
        },
        {
          provide: StoryGameIdGeneratorService,
          useValue: {}
        }
      ]
    }).compile();

    storyEventHandlerService = module.get<StoryEventHandlerService>(
      StoryEventHandlerService
    );
    storyGameIdGeneratorService = module.get<StoryGameIdGeneratorService>(
      StoryGameIdGeneratorService
    );
    storyGameRepository = module.get<StoryGameRepository>(StoryGameRepository);
  });

  it("should be defined", () => {
    expect(storyEventHandlerService).toBeDefined();
    expect(storyGameIdGeneratorService).toBeDefined();
    expect(storyGameRepository).toBeDefined();
  });

  describe("StoryEventHandlerService - create", () => {
    it("should create a new session", () => {
      const client = {
        send: jest.fn()
      };
      const gameId = "00001";
      const userName = "user 1";
      const newGameEvent = {
        name: userName
      } as NewGameEvent;
      storyGameIdGeneratorService.generate = jest.fn().mockReturnValue(gameId);
      storyGameRepository.addGame = jest.fn();

      const game: Game = getNewGame(gameId, client);

      // @ts-ignore
      storyEventHandlerService.create(client, newGameEvent);

      expect(storyGameRepository.addGame).toHaveBeenCalledWith(game);
      expect(client.send).toHaveBeenCalledWith(JSON.stringify(game.session));
    });
  });

  describe("StoryEventHandlerService - join", () => {
    it("should join a session", () => {
      const client = {
        send: jest.fn()
      };
      const client2 = {
        send: jest.fn()
      };
      const gameId = "00001";
      const userName = "new user";
      const newGameEvent = {
        userName: userName,
        gameId: gameId
      } as JoinGameEvent;
      const existingGame = getNewGame(gameId, client);
      const expectedGame = getNewGame(gameId, client2);
      expectedGame.session.users.push(new User(2, userName));
      storyGameRepository.getGame = jest.fn().mockReturnValue(existingGame);

      // @ts-ignore
      storyEventHandlerService.join(client2, newGameEvent);

      expect(storyGameRepository.getGame).toHaveBeenCalledWith(gameId);
      expect(client.send).toHaveBeenCalledWith(
        JSON.stringify(expectedGame.session)
      );
      expect(client2.send).toHaveBeenCalledWith(
        JSON.stringify(expectedGame.session)
      );
    });
  });

  describe("StoryEventHandlerService - point", () => {
    it("should point the round", () => {
      const client = {
        send: jest.fn()
      };
      const client2 = {
        send: jest.fn()
      };
      const gameId = "00001";
      const userName = "new user";
      const event = {
        gameId: gameId,
        point: "point",
        userId: 2
      } as PointGameEvent;
      const existingGame = getExistingGame(gameId, client, client2);
      const expectedGame = getExistingGame(gameId, client, client2);
      const user = expectedGame.session.users[1];
      user.round.voted = true;
      user.round.point = "point";
      storyGameRepository.getGame = jest.fn().mockReturnValue(existingGame);

      // @ts-ignore
      storyEventHandlerService.point(event);

      expect(storyGameRepository.getGame).toHaveBeenCalledWith(gameId);

      expect(JSON.parse(client.send.mock.calls[0][0])).toMatchObject(
        expect.objectContaining(expectedGame.session)
      );
      expect(JSON.parse(client2.send.mock.calls[0][0])).toMatchObject(
        expect.objectContaining(expectedGame.session)
      );
    });
  });

  describe("StoryEventHandlerService - complete", () => {
    it("should complete the round", () => {
      const client = {
        send: jest.fn()
      };
      const client2 = {
        send: jest.fn()
      };
      const gameId = "00001";
      const userName = "new user";
      const event = {
        point: "point",
        gameId: gameId
      } as CompleteRoundEvent;
      const existingGame = getExistingGame(gameId, client, client2);
      const expectedGame = getExistingGame(gameId, client, client2);
      const currentRound = new GameRound(1);
      currentRound.point = 'point';
      const user = expectedGame.session.rounds.push(currentRound);
      expectedGame.session.currentRound = new GameRound(expectedGame.session.rounds.length + 1);
      expectedGame.session.users.forEach((u) => {
        u.round = new Round()
      });
      storyGameRepository.getGame = jest.fn().mockReturnValue(existingGame);

      // @ts-ignore
      storyEventHandlerService.complete(event);

      expect(storyGameRepository.getGame).toHaveBeenCalledWith(gameId);

      expect(JSON.parse(client.send.mock.calls[0][0])).toMatchObject(
        expect.objectContaining(expectedGame.session)
      );
      expect(JSON.parse(client2.send.mock.calls[0][0])).toMatchObject(
        expect.objectContaining(expectedGame.session)
      );
    });
  });

  const getNewGame = (gameId: string, client) => {
    const session = new Session(gameId);
    const user = new User(1, "user 1");
    session.users.push(user);
    // @ts-ignore
    return new Game(session, client);
  };

  const getExistingGame = (gameId = "00001", client1, client2) => {
    const session = new Session(gameId);
    const user = new User(1, "user 1");
    session.users.push(user);
    const user2 = new User(2, "user 2");
    session.users.push(user2);
    // @ts-ignore
    const game = new Game(session, client1);
    game.clients.push(client2);
    return game;
  };
});
