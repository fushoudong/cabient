import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'account', comment: '用户名', length: 255 })
  account: string;

  @Column('int', { name: 'password', comment: '操作的表对应的id' })
  password: string;
}
