export class NoteDto {
    noteTitle !: string;
    noteBody !: string;
    noteMediaFiles !: string[]; // Store media file URLs
    noteTypeId !: number; // For associating the Note with a NoteType
    recipientUserIds !: number[]; // Array of user IDs to whom the note should be sent
  }