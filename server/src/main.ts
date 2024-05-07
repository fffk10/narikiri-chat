import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // CORS有効化
  app.enableCors()

  // Prismaエラーハンドリング
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  await app.listen(3333)
}
bootstrap()
