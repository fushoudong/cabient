import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cabient } from './cabient.entity';
import { CabientController } from './cabient.controller';
import { CabientService } from './cabient.service';
@Module({
  imports: [TypeOrmModule.forFeature([Cabient])],
  controllers: [CabientController],
  providers: [CabientService],
})
export class CabientModule {}
