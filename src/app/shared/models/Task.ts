export class Task {
    Id: number;
    Title: string;
    Description: string;
    DueDate: Date;
    CompletedDate?: Date | null;
}