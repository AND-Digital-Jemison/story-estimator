import { Test, TestingModule } from "@nestjs/testing";
import { WebSocket } from "ws";
import { StoryEvents } from "./constants/story-events";
import { GameEvent } from "./interfaces/game-events.interface";
import { StoryEventFactoryService } from "./story-event-factory.service";
import { StoryEventHandlerService } from "./story-event-handler.service";

describe('StoryEventFactoryService', () => {
  let service: StoryEventFactoryService;
  let storyEventService: StoryEventHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoryEventFactoryService,
        {
          provide: StoryEventHandlerService,
          useValue: {}
        }],
    }).compile();

    service = module.get<StoryEventFactoryService>(StoryEventFactoryService);
    storyEventService = module.get<StoryEventHandlerService>(StoryEventHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(storyEventService).toBeDefined();
  });

  describe("StoryEventFactoryService event handler", () => {
    it("should call create", () => {
      storyEventService.create = jest.fn();
      const client = {} as WebSocket;
      const event = { event: StoryEvents.create } as GameEvent;

      service.handle(client, event);

      expect(storyEventService.create).toHaveBeenCalledWith(client, event);
    });

    it("should call join", () => {
      storyEventService.join = jest.fn();
      const client = {} as WebSocket;
      const event = { event: StoryEvents.join } as GameEvent;

      service.handle(client, event);

      expect(storyEventService.join).toHaveBeenCalledWith(client, event);
    });

    it("should call point", () => {
      storyEventService.point = jest.fn();
      const client = {} as WebSocket;
      const event = { event: StoryEvents.point } as GameEvent;

      service.handle(client, event);

      expect(storyEventService.point).toHaveBeenCalledWith(event);
    });

    it("should call complete", () => {
      storyEventService.complete = jest.fn();
      const client = {} as WebSocket;
      const event = { event: StoryEvents.complete } as GameEvent;

      service.handle(client, event);

      expect(storyEventService.complete).toHaveBeenCalledWith(event);
    });


  });

});
