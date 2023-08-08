import { getRepository } from 'typeorm';
import { NoteType } from '../models/noteType';

export class NoteTypeService {
  private noteTypeRepository = getRepository(NoteType);

  public async createNoteType(
    typeName: string,
    disabled: boolean,
  ): Promise<NoteType> {
    const noteType = new NoteType();
    noteType.typeName = typeName;
    noteType.disabled = disabled;

    return this.noteTypeRepository.save(noteType);
  }

  public async getAllNoteTypes(): Promise<NoteType[]> {
    return this.noteTypeRepository.find();
  }
  public async getNoteTypeById(typeId: number): Promise<NoteType | undefined> {
    const options = {
      where: {
        id: typeId,
      },
    };
    
    return this.noteTypeRepository.findOne(options);
  }
}