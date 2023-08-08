import { Connection } from 'typeorm';
import { User } from '../../models/user';

export const seedUsers = async (connection: Connection): Promise<void> => {
  const userRepository = connection.getRepository(User);

  const usersData = [
    { name: 'John Doe', profilePicture: 'john-doe.jpg' },
    { name: 'Jane Smith', profilePicture: 'jane-smith.jpg' },
    // Add more user data as needed
  ];

  const users = userRepository.create(usersData);
  await userRepository.save(users);
};