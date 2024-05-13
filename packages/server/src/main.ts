import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // CORS有効化
  app.enableCors()

  // Prismaエラーハンドリング用
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  await app.listen(3333)
}
bootstrap()
