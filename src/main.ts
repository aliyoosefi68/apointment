import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Appointment System")
    .setDescription("reservation system for clinics")
    .setVersion("fv0.0.1")
    .addBearerAuth(
      {
        type: "http",
        bearerFormat: "JWT",
        in: "header",
        scheme: "bearer",
      },
      "Authorization"
    );
  await app.listen(3000, () => {
    console.log("http://localhost:3000");
    console.log("http://localhost:3000/swagger");
  });
}
bootstrap();
