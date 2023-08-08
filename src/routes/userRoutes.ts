import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { UserController } from '../controllers/userController';
import { handleValidationErrors } from '../middleware/validation';

const userRoutes = express.Router();
const userController = new UserController();

const createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  handleValidationErrors,
];

userRoutes.post('/users', createUserValidation, userController.createUser);

userRoutes.get('/users/:id', userController.getUserById);

userRoutes.get('/users', userController.getAllUsers);


export default userRoutes;
