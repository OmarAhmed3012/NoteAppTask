import { getRepository } from 'typeorm';
import { User } from '../models/user';

export class UserService {
  private userRepository = getRepository(User);

  public async createUser(name: string, profilePicture: string = ''): Promise<User> {
    const user = new User();
    user.name = name;
    user.profilePicture = profilePicture;

    return this.userRepository.save(user);
  }

  public async getUserById(userId: number): Promise<User | undefined> {
    const options : any = {
        userId
    }
    return this.userRepository.findOne(options);
  }

  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async toggleDailyNotifications(userId: number, isEnabled: boolean): Promise<void> {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.dailyNotificationEnabled = isEnabled;
    await this.userRepository.save(user);
  }
}