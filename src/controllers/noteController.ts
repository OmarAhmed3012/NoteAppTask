import { Request, Response } from 'express';
import { NoteService } from '../services/noteService';
import { UserService } from '../services/userService';
import { NoteTypeService } from '../services/noteTypeService';

const noteService = new NoteService();
const userService = new UserService();
const noteTypeService = new NoteTypeService();

export class NoteController {
  async createNote(req: Request, res: Response) {
    const { title, body, typeId, mediaFiles } = req.body;

    try {
      const user = await userService.getUserById(req.user.id);
      const noteType = await noteTypeService.getNoteTypeById(typeId);

      if (!user || !noteType) {
        return res.status(404).json({ message: 'User or Note Type not found' });
      }

      const note = await noteService.createNote(title, body, noteType, mediaFiles, user);
      return res.status(201).json(note);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteNotes(req: Request, res: Response) {
    const { noteIds } = req.body;

    try {
      await noteService.deleteNotes(noteIds);
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
