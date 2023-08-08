import { getRepository, FindManyOptions } from 'typeorm';
import { Note } from '../models/note';
import { User } from '../models/user';
import { NoteType } from '../models/noteType';

export class NoteService {
  private noteRepository = getRepository(Note);

  public async createNote(
    title: string,
    body: string,
    type: NoteType,
    user: User,
    mediaFiles: string[],
  ): Promise<Note> {
    const note = new Note();
    note.noteTitle = title;
    note.noteBody = body;
    note.noteType = type;
    note.noteMediaFiles = mediaFiles;
    note.user = user;

    return this.noteRepository.save(note);
  }

  public async getNotesByUser(userId: number, fromDate: Date): Promise<Note[]> {
    const options: any = {
      where: {
        userId,
        creationDateTime: {
          $gte: fromDate,
        },
        isDeleted: false,
      },
      relations: ['user', 'noteType'],
    };

    return this.noteRepository.find(options);
  }

  public async deleteNotes(noteIds: number[]): Promise<void> {
    await this.noteRepository.update(noteIds, {isDeleted: true});
  }
}