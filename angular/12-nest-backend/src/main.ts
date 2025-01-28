import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        // const result = errors.map((error) => ({
        //   property: error.property,
        //   message: error.constraints,
        // }));
        console.log(errors)
        return new BadRequestException(errors);
      },
    })
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
