import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cabient')
export class Cabient {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'type', comment: '类型' })
  type: number; // 取之 0， 1， 2， 3

  @Column('int', { name: 'status', comment: '占用状态' })
  status: number; // 0 未占用 1 占用

  @Column('varchar', { name: 'user', comment: '占用状态', length: 20 })
  user: string; // 0 未占用 1 占用
}
