import { createDBConnection } from '../connection';
import { seedUsers } from './seedUsers';
import { seedNoteTypes } from './seedNoteTypes';

const runSeeders = async () => {
  const connection = await createDBConnection();

  try {
    await seedUsers(connection);
    await seedNoteTypes(connection);
    // Add more seeders if needed
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await connection.close();
  }
};

runSeeders();