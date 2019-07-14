export class UserInfo {
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    email: string;
    diagnoses: Diagnosis[];
    treatments: Treatment[];
}

export class Diagnosis {
    diagnosed: boolean;
    name: string;
}

export class Treatment {
    undergoing: boolean;
    name: string;
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