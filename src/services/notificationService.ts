import cron from 'node-cron';
import { UserService } from './userService';
import { NoteService } from './noteService';
import { Note, User, NoteStats } from '../models';

const userService = new UserService();
const noteService = new NoteService();

export class NotificationService {
  public scheduleDailyNotifications(): void {
    cron.schedule('0 0 * * *', async () => {
      const users = await userService.getAllUsers();

      for (const user of users) {
        if (user.dailyNotificationEnabled) {
          const notes = await noteService.getNotesByUser(user.id, new Date());
          const noteStats = this.calculateNoteStats(notes);

          this.sendNotification(user, noteStats);
        }
      }
    });
  }

  private calculateNoteStats(notes: Note[]): NoteStats {
      let totalNotes = notes.length;
      let totalWords = notes.reduce((total, note) => total + note.body.split(' ').length, 0);
      return { totalNotes, totalWords };
    }

  private sendNotification(user: User, noteStats: NoteStats): void {
      // Here we would use a notification service to send the notification
      console.log(`User ${user.name} has ${noteStats.totalNotes} notes with ${noteStats.totalWords} words.`);
    }
}