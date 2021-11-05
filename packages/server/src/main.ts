import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { APIModule } from "./modules/api.module";
import { ConfigService } from "./modules/config/config.service";
declare const module: any;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);

  const config = app.get<ConfigService>(ConfigService);

  app.enableCors({ origin: config.corsWhiteList });

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(config.port);

  if (module.hot) {
    console.log('module is hot');
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
