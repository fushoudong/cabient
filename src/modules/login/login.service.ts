import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { User } from './user.entity';
import { LoginDto, ForgetDto } from './login_dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @description 登录接口
   * @author fushoudong
   * @date 27/08/2021
   * @param {LoginDto} loginDto
   * @returns {*}
   * @memberof LoginService
   */
  async login(loginDto: LoginDto) {
    const result = await getConnection()
      .createQueryBuilder()
      .from(User, '')
      .where('account = :account', {
        account: loginDto.account,
      })
      .andWhere('password = :password', {
        password: loginDto.password,
      })
      .getRawMany();
    if (result.length > 0) {
      return {
        msg: 'success',
        errcode: 0,
        id: result[0].id,
      };
    } else {
      throw new BadRequestException({
        errcode: -1,
        msg: '登录失败，账号不存在！',
      });
    }
  }

  /**
   * @description 注册接口
   * @author shoudongfu
   * @date 27/08/2021
   * @param {LoginDto} loginDto
   * @returns {*}
   * @memberof LoginService
   */
  async register(loginDto: LoginDto) {
    const { account, password } = loginDto;
    if (!account) {
      throw new BadRequestException({
        errcode: 100001,
        msg: '注册失败，请输入用户名！',
      });
    }
    if (!password) {
      throw new BadRequestException({
        errcode: 10002,
        msg: '注册失败，请输入密码！',
      });
    }
    const currentCount = await getConnection()
      .createQueryBuilder()
      .from(User, '')
      .where('account = :account', { account })
      .getCount();
    if (currentCount > 0) {
      throw new BadRequestException({
        errcode: 10003,
        msg: '账号重复，请换个账号注册！',
      });
    }
    const user = new User();
    user.account = account;
    user.password = password;
    const res = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(user)
      .execute();

    if (res.raw.affectedRows !== 0) {
      return {
        msg: 'success',
        errcode: 0,
        id: res.raw.insertId,
      };
    } else {
      throw new BadRequestException({
        errcode: 1004,
        msg: '注册失败',
      });
    }
  }

  /**
   * @description 重置密码
   * @author fushoudong
   * @date 27/08/2021
   * @param {ForgetDto} forgetDto
   * @memberof LoginService
   */
  async resetPassword(forgetDto: ForgetDto) {
    const { account, password, newPassword } = forgetDto;
    if (password !== newPassword)
      throw new BadRequestException({
        errcode: 10011,
        msg: '新老密码不一致！',
      });
    const currentCount = await getConnection()
      .createQueryBuilder()
      .from(User, '')
      .where('account = :account', { account })
      .getCount();
    if (currentCount === 0) {
      throw new BadRequestException({
        errcode: 10012,
        msg: '账号不存在！',
      });
    }
    const res = await getConnection()
      .createQueryBuilder()
      .update(User)
      .set({
        password: newPassword,
      })
      .where('account = :account', {
        account,
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
}
