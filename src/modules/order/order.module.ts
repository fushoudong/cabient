import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Cabient } from './cabient.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Cabient]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
