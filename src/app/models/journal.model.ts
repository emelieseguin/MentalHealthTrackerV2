export class JournalEntry {
    hoursSleep: number;
    exercise: boolean;
    meditate: boolean;
    symptoms: Map<string, number>;
}

export class JournalEntries{
    entries: Map<string, JournalEntry>;
}