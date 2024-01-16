import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:4200",
  })
  app.setGlobalPrefix("api");
  await app.listen(3000);
})();
