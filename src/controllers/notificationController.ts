import { NotificationService } from '../services/notificationService';
import { NoteStats } from '../models/noteStats';
import { User } from '../models/user';

const notificationService = new NotificationService();

export class NotificationController {

  public scheduleNotifications(): void {
    notificationService.scheduleDailyNotifications();
  }

  public sendNotification(user: User, noteStats: NoteStats): void {
    notificationService.sendNotification(user, noteStats);
  }
}