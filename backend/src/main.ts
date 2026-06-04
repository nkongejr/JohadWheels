import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // CORS — allow your Vercel frontend
  // app.enableCors({
  //   origin: [
  //     'http://localhost:3000',
  //     'http://localhost:3001',
  //     process.env.FRONTEND_URL || 'http://localhost:3000',
  //     /\.vercel\.app$/, // Allow any vercel preview URL
  //   ],
  //   credentials: true,
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  // });
  // src/main.ts
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://johad-wheels.vercel.app',
    'https://johadwheels.co.ke',      // ← ADD
    'https://www.johadwheels.co.ke',  // ← ADD
  ],
  credentials: true,
});
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 JOHAD WHEELS Backend running on port ${port}`);
}
bootstrap();

