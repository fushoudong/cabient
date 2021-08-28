import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/login/user.entity';
import { Cabient } from './modules/cabient/cabient.entity';
import { LoginModule } from './modules/login/login.module';
import { CabientModule } from './modules/cabient/cabient.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: 'mysql',
          entities: [User, Cabient],
          host: '127.0.0.1',
          port: 3306,
          username: 'root',
          password: '970117',
          database: 'car',
          charset: 'utf8mb4',
          timezone: '+08:00',
          synchronize: true,
        };
      },
    }),
    LoginModule,
    CabientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
