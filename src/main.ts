import {ValidationPipe} from "@nestjs/common";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";4
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true
            }
        ));

    // Configuración de Swagger
    const config = new DocumentBuilder()
        .setTitle('API de Ejemplo')
        .setDescription('Documentación de la API de ejemplo')
        .setVersion('1.0')
        .addTag('usuarios')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    // Configura la ruta donde se accede a la UI de Swagger
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}

bootstrap();
