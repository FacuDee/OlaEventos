import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Habilitar CORS para permitir peticiones desde cualquier origen (o podés especificar el frontend)
  app.enableCors({
    origin: 'http://localhost:5173' // o '*' para permitir todos los orígenes (menos seguro)
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
