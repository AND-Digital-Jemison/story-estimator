import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from "../config/config.service";
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

describe('AppController', () => {
  let statusController: StatusController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [ConfigService, StatusService],
    }).compile();

    statusController = app.get<StatusController>(StatusController);
  });

  describe('root', () => {
    it('should return a nice status world', () => {
      expect(statusController.getStatus()).toBe(
        'Status world from Nest running on localhost:4000!'
      );
    });
  });
});
