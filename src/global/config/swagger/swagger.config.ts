import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const configureSwagger = (app: INestApplication) => {
  // Swagger integration
  const config = new DocumentBuilder()
    .setTitle('Bull Queue Backend')
    .setDescription('API documentation for Bull Queue')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};

export { configureSwagger };
