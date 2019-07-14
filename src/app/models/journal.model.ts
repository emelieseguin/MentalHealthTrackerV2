export class JournalEntry {
    hoursSleep: number;
    exercise: boolean;
    meditate: boolean;
    symptoms: Map<string, number>;
}

export class JournalEntries{
    entries: Map<string, JournalEntry>;
}

export class UserInfoMap {
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    email: string;
    diagnoses: Map<string, boolean>;
    treatments: Map<string, boolean>;
}