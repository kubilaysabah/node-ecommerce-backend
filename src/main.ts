import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from "./app.module";
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { NotFoundInterceptor } from './interceptors/not-found.interceptor'

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  /* CORS */
  app.enableCors({
    origin: "http://localhost:4200",
  })

  /* Prefix */
  app.setGlobalPrefix("api");

  /* Validation */
  app.useGlobalPipes(new ValidationPipe());

  /* Interceptors */
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new NotFoundInterceptor());

  /* Swagger */
  const config = new DocumentBuilder()
      .setTitle('E-Commerce API Document')
      .setDescription('The E-Commerce API description')
      .setVersion('1.0')
      .addServer('http://localhost:3000/api/', 'Local Environment')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
})();
