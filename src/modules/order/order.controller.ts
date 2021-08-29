import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiConsumes, ApiQuery, ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { InsertDto, UpdateDto } from './order_dto';
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiConsumes('application/json')
  @ApiOperation({ summary: '创建订单' })
  @Post('createOrder')
  createOrder(@Body() insertDto: InsertDto) {
    return this.orderService.createOrder(insertDto);
  }

  @ApiOperation({ summary: '获取待配送列表' })
  @Get('getUndeliveredOrder')
  @ApiQuery({ name: 'user_id', type: '' })
  getUndeliveredOrder(@Query() query) {
    return this.orderService.getOrderList({
      status: 0,
      user_id: query.user_id,
    });
  }

  @ApiOperation({ summary: '获取配送中列表' })
  @Get('getDeliveringOrder')
  @ApiQuery({ name: 'user_id', type: '' })
  getDeliveringOrder(@Query() query) {
    return this.orderService.getOrderList({
      status: 2,
      user_id: query.user_id,
    });
  }

  @ApiOperation({ summary: '获取已配送列表' })
  @Get('getUndeliveredOrder')
  @ApiQuery({ name: 'user_id', type: '' })
  getDeliveredOrder(@Query() query) {
    return this.orderService.getOrderList({
      status: 1,
      user_id: query.user_id,
    });
  }

  @ApiOperation({ summary: '获取已滞留列表' })
  @Get('getStrandedOrder')
  @ApiQuery({ name: 'user_id', type: '' })
  getStrandedOrder(@Query() query) {
    return this.orderService.getOrderList({
      status: 3,
      user_id: query.user_id,
    });
  }

  @ApiOperation({ summary: '获取待配送列表' })
  @Get('getOfflineDeliveryOrder')
  @ApiQuery({ name: 'user_id', type: '' })
  getOfflineDeliveryOrder(@Query() query) {
    return this.orderService.getOrderList({
      status: 4,
      user_id: query.user_id,
    });
  }

  @ApiOperation({ summary: '获取订单详情' })
  @Get('getOrderDetail')
  @ApiQuery({ name: 'id', type: '' })
  getOrderDetail(@Query() query) {
    return this.orderService.getSingleOrderInfo(query);
  }

  @ApiConsumes('application/json')
  @ApiOperation({ summary: '修改订单状态' })
  @Post('updateOrderStatus')
  updateOrderStatus(@Body() updateDto: UpdateDto) {
    return this.orderService.updateOrderStatus(updateDto);
  }
}
