import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // 自动转换类型
    transformOptions: {
      enableImplicitConversion: true, // 隐式转换
    },
  }));
  const config = new DocumentBuilder()
    .setTitle('Config Server')
    .setDescription('字段配置接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3456);
}
bootstrap();
