import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { NoteType } from './noteType';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id !: number;

  @Column()
  noteTitle !: string;

  @Column()
  noteBody !: string;

  @Column({ type: 'text', array: true, nullable: true })
  noteMediaFiles !: string[]; // Store media file URLs

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creationDateTime !: Date;

  @Column({ default: false })
  isDeleted !: boolean; // For soft delete

  @ManyToOne(() => User, (user) => user.notes)
  user !: User;

  @ManyToOne(() => NoteType, (noteType) => noteType.notes)
  noteType !: NoteType;
}
