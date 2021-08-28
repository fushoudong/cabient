import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerOptions = new DocumentBuilder()
    .setTitle('接口文档') //文档标题
    .setDescription('小学期的接口文档') //文档描述
    .setVersion('1.0') //文档版本
    .addBasicAuth() //鉴权，可以输入token
    .build(); //创建

  //创建swagger
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  //启动swagger
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
}
bootstrap();
