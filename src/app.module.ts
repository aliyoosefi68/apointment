import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { CategoryModule } from "./modules/category/category.module";
import { ClinicModule } from "./modules/clinic/clinick.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Rez1sfa1370.",
      database: "reserve",
      autoLoadEntities: false,
      synchronize: true,
      entities: [
        "dist/**/**/**/*.entity{.ts,.js}",
        "dist/**/**/*.entity{.ts,.js}",
      ],
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    ClinicModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
