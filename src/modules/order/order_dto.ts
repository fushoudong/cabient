import { ApiProperty } from '@nestjs/swagger';
export class InsertDto {
  @ApiProperty({
    required: true,
    description: '包裹编号',
  })
  package_id: string;

  @ApiProperty({
    required: true,
    description: '配送车辆',
  })
  car_id: string;

  @ApiProperty({
    required: true,
    description: '收件人姓名',
  })
  receiver_name: string;

  @ApiProperty({
    required: true,
    description: '收件人手机号',
  })
  receiver_phone: string;

  @ApiProperty({
    required: true,
    description: '目的站点',
  })
  receiver_sta: string;

  @ApiProperty({
    required: true,
    description: '格口尺寸',
  })
  cabient_type: string;

  @ApiProperty({
    required: true,
    description: '业务渠道',
  })
  channel: string;

  @ApiProperty({
    required: true,
    description: '用户id',
  })
  user_id: string;
}

export class UpdateDto {
  @ApiProperty({
    required: true,
    description: '订单编号',
  })
  id: number;

  @ApiProperty({
    required: true,
    description: '订单编号',
  })
  status: number;
}
