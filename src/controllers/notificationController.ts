import { NotificationService } from '../services/notificationService';
import { Note } from '../models/note';
import { User } from '../models/user';

const notificationService = new NotificationService();

export class NotificationController {

  public scheduleNotifications(): void {
    notificationService.scheduleDailyNotifications();
  }

  public sendNotification(user: User, note: Note): void {
    notificationService.sendNotification(user, note.noteBody);
  }
}