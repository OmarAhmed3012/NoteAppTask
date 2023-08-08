import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import noteRoutes from './routes/noteRoutes';
import noteTypeRoutes from './routes/noteTypeRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const port = 3000; 

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use(noteRoutes);
app.use(noteTypeRoutes);
app.use(userRoutes);

// Database Connection
createConnection()
  .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
