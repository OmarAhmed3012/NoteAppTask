import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    const { name } = req.body;

    try {
      const user = await userService.createUser(name);
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);

    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async toggleDailyNotifications(req: Request, res: Response) {
    const { userId, isEnabled } = req.body;

    if (typeof userId !== 'number' || typeof isEnabled !== 'boolean') {
      return res.status(400).json({ message: 'Invalid input' });
    }

    try {
      await userService.toggleDailyNotifications(userId, isEnabled);
      return res.status(200).json({ message: 'Daily notifications toggled successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}