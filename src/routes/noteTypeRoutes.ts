import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { NoteTypeController } from '../controllers/noteTypeController';
import { handleValidationErrors } from '../middleware/validation';

const noteTypeRoutes = express.Router();
const noteTypeController = new NoteTypeController();

const createNoteTypeValidation = [
  body('typeName').notEmpty().withMessage('Type Name is required'),
  body('disabled').isBoolean().withMessage('Disabled must be a boolean'),
  handleValidationErrors,
];

noteTypeRoutes.post('/note-types', createNoteTypeValidation, noteTypeController.createNoteType);

noteTypeRoutes.get('/note-types', noteTypeController.getAllNoteTypes);

export default noteTypeRoutes;
