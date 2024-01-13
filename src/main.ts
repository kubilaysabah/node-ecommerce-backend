import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaClient } from "@prisma/client";

const main = async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
};

const initPrisma = async (): Promise<void> => {
  const prisma = new PrismaClient();

  try {
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

(async (): Promise<void> => {
  await main();
  await initPrisma();
})();
