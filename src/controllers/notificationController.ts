import { NotificationService } from '../services/notificationService';
import { NoteStats } from '../models/noteStats';

export class NotificationController {
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  public scheduleNotifications(): void {
    this.notificationService.scheduleDailyNotifications();
  }

  public sendNotification(userId: number, noteStats: NoteStats): void {
    this.notificationService.sendNotification(userId, noteStats);
  }
}