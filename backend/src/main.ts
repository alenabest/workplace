import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('WORKPLACE')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const userDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, userDocument);

  await app.listen(3000);
}

bootstrap().then();
