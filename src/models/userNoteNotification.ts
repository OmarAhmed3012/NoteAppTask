import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class UserNoteNotification {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column({ default: false })
  dailyNotificationEnabled !: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user !: User;
}
