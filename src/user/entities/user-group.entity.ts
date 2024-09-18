import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';
import { User } from './user.entity';

@Entity()
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
