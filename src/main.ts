import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  //validation pipe (유효성 검사)
  //class-validator class-transformer (npm install)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform: true, //우리가 원하는 실제 타입으로 변환해줌
  }))

  await app.listen(3000);
}
bootstrap();
