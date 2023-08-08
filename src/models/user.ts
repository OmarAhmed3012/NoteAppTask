import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Note } from './note';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  name !: string;

  @Column({ nullable: true, default: 'default_profile_picture.png' })
  profilePicture?: string;


  @OneToMany(() => Note, (note) => note.user)
  notes !: Note[];
  
  @Column({ default: false })
  dailyNotificationEnabled !: boolean;
}