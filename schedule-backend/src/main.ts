import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // origin: "*",
    origin: [
      "http://localhost:8100",
      "http://localhost:8101",
      "capacitor://localhost",
      "http://localhost",
      "http://192.168.11.234:8100",
      "http://192.168.11.234:8101"
    ],
    methods: [
      "GET",
      "POST",
      "DELETE",
      "PUT",
      "PATCH",
      "OPTIONS",
      "HEAD",
      "CONNECT",
      "TRACE"
    ]
  });

  await app.listen(process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
