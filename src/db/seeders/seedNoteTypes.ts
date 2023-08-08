import { Connection } from 'typeorm';
import { NoteType } from '../../models/noteType';

export const seedNoteTypes = async (connection: Connection): Promise<void> => {
  const noteTypeRepository = connection.getRepository(NoteType);

  const noteTypesData = [
    { typeName: 'Congrats', disabled: false },
    { typeName: 'Invitation', disabled: false },
    { typeName: 'Reminder', disabled: false },
    // Add more note type data as needed
  ];

  const noteTypes = noteTypeRepository.create(noteTypesData);
  await noteTypeRepository.save(noteTypes);
};