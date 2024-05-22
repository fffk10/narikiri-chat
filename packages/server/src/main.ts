import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // CORS有効化
  app.enableCors()

  // OpenAPI
  const config = new DocumentBuilder()
    .setTitle('チャットAPI')
    .setDescription('Nariki Chat App API')
    .setVersion('1.0')
    .addTag('channel')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  // Prismaエラーハンドリング用
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  await app.listen(3333)
}
bootstrap()
