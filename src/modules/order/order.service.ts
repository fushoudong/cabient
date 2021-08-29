import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Order } from './order.entity';
import { Cabient } from './cabient.entity';
import { InsertDto, UpdateDto } from './order_dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Cabient)
    private readonly cabientRepository: Repository<Cabient>,
  ) {}

  /**
   * @description 创建订单
   * @author fushoudong
   * @date 27/08/2021
   * @param {OrderDto} OrderDto
   * @returns {*}
   * @memberof OrderService
   */
  async createOrder(insertDto: InsertDto) {
    const {
      package_id,
      car_id,
      receiver_name,
      receiver_phone,
      receiver_sta,
      cabient_type,
      channel,
      user_id,
    } = insertDto;
    const cabientList = await getConnection()
      .createQueryBuilder()
      .from(Cabient, '')
      .where('type = :type', {
        type: cabient_type,
      })
      .andWhere('status = :status', {
        status: 0,
      })
      .getRawMany();
    if (cabientList.length === 0) {
      throw new BadGatewayException({
        errcode: 100001,
        msg: '创建失败，当前规格格口不存在空闲！',
      });
    }
    // 占用格口
    await this.occurCabient(cabientList[0]?.id);
    console.log('quweb', insertDto);
    const order = new Order();
    order.packageId = package_id;
    order.orderId = 'o' + Date.now().valueOf();
    order.receiverName = receiver_name;
    order.receiverPhone = receiver_phone;
    order.receiverSta = receiver_sta;
    order.cabientType = cabient_type;
    order.cabientId = cabientList[0]?.id;
    order.carId = car_id || '207';
    order.channel = channel;
    order.status = '0';
    order.userId = user_id;
    order.createTime = new Date();
    order.updateTime = new Date();

    const res = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Order)
      .values(order)
      .execute();

    if (res.raw.affectedRows !== 0) {
      return {
        msg: 'success',
        errcode: 0,
        id: res.raw.insertId,
      };
    } else {
      throw new BadGatewayException({
        errcode: 1004,
        msg: '订单新增失败',
      });
    }
  }

  /**
   * @description 占用格口
   * @author shoudongfu
   * @date 28/08/2021
   * @param {*} id
   * @returns {*}
   * @memberof OrderService
   */
  async occurCabient(id) {
    const res = await getConnection()
      .createQueryBuilder()
      .update(Cabient)
      .set({
        status: 1,
      })
      .where('id = :id', {
        id: id,
      })
      .execute();
    if (res.raw.affectedRows !== 0) {
      return true;
    }
  }

  async updateOrderStatus(updateDto: UpdateDto) {
    const { id, status } = updateDto;
    const result = await getConnection()
      .createQueryBuilder()
      .update(Order)
      .set({
        status: `${status}`,
        updateTime: new Date(),
      })
      .where('id = :id', {
        id: id,
      })
      .execute();
    console.log('re', result);
    if (result.affected > 0) {
      return {
        msg: 'success',
        errcode: 0,
      };
    } else {
      throw new BadGatewayException({
        errcode: -1,
        msg: '状态修改失败！',
      });
    }
  }

  /**
   * @description 获取单个订单详情
   * @author shoudongfu
   * @date 28/08/2021
   * @param {*} query
   * @returns {*}
   * @memberof OrderService
   */
  async getSingleOrderInfo(query) {
    const { id } = query;
    const resultList = await getConnection()
      .createQueryBuilder()
      .from(Order, '')
      .where('id = :id', {
        id,
      })
      .getRawMany();
    if (resultList.length === 0) {
      throw new BadGatewayException({
        errcode: 1000,
        msg: '订单不存在',
      });
    } else {
      return {
        data: resultList[0],
      };
    }
  }

  /**
   * @description 获取订单列表
   * @author shoudongfu
   * @date 28/08/2021
   * @param {*} query
   * @returns {*}
   * @memberof OrderService
   */
  async getOrderList(query) {
    const { status, user_id } = query;
    const resultList = await getConnection()
      .createQueryBuilder()
      .from(Order, '')
      .where('status = :status', {
        status,
      })
      .andWhere('user_id = :user_id', {
        user_id,
      })
      .getRawMany();
    if (resultList.length === 0) {
      throw new BadGatewayException({
        errcode: 1000,
        msg: '订单不存在',
      });
    } else {
      return {
        data: resultList.map((item) => ({
          id: item.id,
          order_id: item.order_id,
          package_id: item.package_id,
          receiver_phone: item.receiver_phone,
          create_time: item.create_time,
          update_time: item.update_time,
          cabient_type: item.cabient_type,
          car_id: item.car_id,
        })),
      };
    }
  }
}
