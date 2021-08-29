import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'package_id', length: 50 })
  packageId: string; // 包裹编号

  @Column('varchar', { name: 'order_id', length: 50 })
  orderId: string; // 订单编号

  @Column('varchar', { name: 'receiver_name', length: 50 })
  receiverName: string; // 收件人姓名

  @Column('varchar', { name: 'receiver_phone', length: 50 })
  receiverPhone: string; // 收件人手机号

  @Column('varchar', { name: 'receiver_sta', length: 50 })
  receiverSta: string; // 目的站点

  @Column('varchar', { name: 'cabient_type', length: 50 })
  cabientType: string; // 格口大小

  @Column('varchar', { name: 'cabient_id', length: 50 })
  cabientId: string; // 格口编号

  @Column('varchar', { name: 'car_id', length: 50 })
  carId: string; // 使用的car

  @Column('varchar', { name: 'channel', length: 50 })
  channel: string; // 业务渠道

  @Column('varchar', { name: 'status', length: 50 })
  status: string; // 订单状态 [0待配送｜1已配送｜2配送中｜3已滞留｜4线下配送]

  @Column('varchar', { name: 'user_id', length: 50 })
  userId: string;

  @Column('datetime', {
    name: 'update_time',
  })
  updateTime: Date;

  @Column('datetime', {
    name: 'create_time',
  })
  createTime: Date;
}
