// src/routes/noteRoutes.ts
import express, { Request, Response } from 'express';
import { NoteController } from '../controllers/noteController';
import { handleValidationErrors } from '../middleware/validation';
import { authenticationMiddleware } from '../middleware/authentication'; 
import { body } from 'express-validator';

const noteRoutes = express.Router();
const noteController = new NoteController();

const createNoteValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('body').notEmpty().withMessage('Body is required'),
  body('typeId').isInt().withMessage('Type ID must be an integer'),
  body('mediaFiles').optional({ nullable: true }).isArray().withMessage('Media files must be an array'),
  handleValidationErrors,
];

noteRoutes.post('/notes', authenticationMiddleware, createNoteValidation, noteController.createNote);

const deleteNotesValidation = [
  body('noteIds').notEmpty().isArray().withMessage('Note IDs must be a non-empty array'),
  handleValidationErrors,
];

noteRoutes.delete('/notes', authenticationMiddleware, deleteNotesValidation, noteController.deleteNotes);


export default noteRoutes;
