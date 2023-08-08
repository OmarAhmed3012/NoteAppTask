import cron from 'node-cron';
import { UserService } from './userService';
import { NoteService } from './noteService';
import { Note } from '../models/note';
import { User } from '../models/user';
import { NoteType } from '../models/noteType';

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

  private calculateNoteStats(notes: Note[]): string {
    const noteTypeCounts: Record<string, number> = {};

    for (const note of notes) {
      const typeName = note.noteType.typeName;
      if (noteTypeCounts[typeName]) {
        noteTypeCounts[typeName]++;
      } else {
        noteTypeCounts[typeName] = 1;
      }
    }

    const noteStats = Object.entries(noteTypeCounts)
      .map(([typeName, count]) => `You got new ${count} ${typeName} notes`)
      .join(', ');

    return noteStats;
  }

  public sendNotification(user: User, note: string): void {
      // Here we would use a notification service to send the notification
      console.log(`User ${user.name} has new Note, ${note}`);
    }
}