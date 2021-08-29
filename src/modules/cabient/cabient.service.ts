import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Cabient } from './cabient.entity';
import { UpdateDto } from './cabient_dto';

@Injectable()
export class CabientService {
  constructor(
    @InjectRepository(Cabient)
    private readonly userRepository: Repository<Cabient>,
  ) {}

  /**
   * @description 获取全部列表
   * @author fushoudong
   * @date 27/08/2021
   * @param {CabientDto} CabientDto
   * @returns {*}
   * @memberof CabientService
   */
  async getCabientList(query) {
    const list = ['type', 'status', 'user'];
    const queryList = list.filter(
      (key) => query[key] !== '' && query[key] !== undefined,
    );
    let connection = await getConnection()
      .createQueryBuilder()
      .from(Cabient, '');
    console.log('queryList', queryList);
    queryList.forEach((key, index) => {
      if (index === 0) {
        connection = connection.where(`${key} = :${key}`, {
          [key]: query[key],
        });
      } else {
        connection = connection.andWhere(`${key} = :${key}`, {
          [key]: query[key],
        });
      }
    });
    const result = await connection.getRawMany();

    if (result) {
      return {
        msg: 'success',
        errcode: 0,
        data: {
          list: result,
          info: {
            big: {
              left: result.filter(
                (item) => item.type === 10901 && item.status === 0,
              )?.length,
              total: result.filter((item) => item.type === 10901)?.length,
            },
            middle: {
              left: result.filter(
                (item) => item.type === 10902 && item.status === 0,
              )?.length,
              total: result.filter((item) => item.type === 10902)?.length,
            },
            small: {
              left: result.filter(
                (item) => item.type === 10903 && item.status === 0,
              )?.length,
              total: result.filter((item) => item.type === 10903)?.length,
            },
            tiny: {
              left: result.filter(
                (item) => item.type === 10904 && item.status === 0,
              )?.length,
              total: result.filter((item) => item.type === 10904)?.length,
            },
          },
        },
      };
    }
    throw new BadRequestException({
      errcode: -1,
      msg: '获取失败，网络连接失败！',
    });
  }

  /**
   * @description 开柜
   * @author shoudongfu
   * @date 27/08/2021
   * @param {CabientDto} CabientDto
   * @returns {*}
   * @memberof CabientService
   */
  async openCabient(updateDto: UpdateDto) {
    const { id } = updateDto;
    const currentCount = await getConnection()
      .createQueryBuilder()
      .from(Cabient, '')
      .where('id = :id', { id })
      .getCount();
    if (currentCount === 0) {
      throw new BadRequestException({
        errcode: 10001,
        msg: '当前柜体编号不存在！',
      });
    }
    const res = await getConnection()
      .createQueryBuilder()
      .update(Cabient)
      .set({
        status: 1,
        user: '',
      })
      .where('id = :id', {
        id,
      })
      .execute();

    if (res.raw.affectedRows !== 0) {
      return {
        msg: 'success',
        errcode: 0,
      };
    } else {
      throw new BadRequestException({
        errcode: 10012,
        msg: '修改失败',
      });
    }
  }

  async insertBaseCabientInfo(query) {
    const { type, number } = query;
    for (let index = 0; index < number; index++) {
      const cabient = new Cabient();
      cabient.type = type;
      cabient.status = 0;
      cabient.user = '';
      const res = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Cabient)
        .values(cabient)
        .execute();
    }
    return '新增成果';
  }
}
