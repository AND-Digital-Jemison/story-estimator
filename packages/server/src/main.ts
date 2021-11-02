import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { ConfigService } from '~/modules/config/config.service';
import { APIModule } from './modules/api.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);

  const config = app.get<ConfigService>(ConfigService);

  app.enableCors({ origin: config.corsWhiteList });

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(config.port);
}

bootstrap();
