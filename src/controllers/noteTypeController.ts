import { Request, Response } from 'express';
import { NoteTypeService } from '../services/noteTypeService';

const noteTypeService = new NoteTypeService();
export class NoteTypeController {
  async createNoteType(req: Request, res: Response) {
    const { typeName, disabled } = req.body;

    try {
      const noteType = await noteTypeService.createNoteType(typeName, disabled);
      return res.status(201).json(noteType);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAllNoteTypes(req: Request, res: Response) {
    try {
      const noteTypes = await noteTypeService.getAllNoteTypes();
      return res.json(noteTypes);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
