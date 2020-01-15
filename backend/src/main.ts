import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = new DocumentBuilder()
    .setTitle('WORKPLACE')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const userDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, userDocument);

  app.useStaticAssets(join(__dirname, '..', 'media'), {prefix: '/media'});

  await app.listen(3000);
}

bootstrap().then();
