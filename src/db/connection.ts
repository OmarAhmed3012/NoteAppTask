import { createConnection } from 'typeorm';

export const createDBConnection = async () => {
  try {
    const connection = await createConnection();
    console.log('Database connection established successfully.');
    return connection;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
};