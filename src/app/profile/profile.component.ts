import { Component, OnInit } from "@angular/core";
import { isAndroid, Page, EventData } from "tns-core-modules/ui/page/page";

class PersonInfo {
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    email: string;
    diagnoses: string[];
    treatments: string[];
}

const FakePerson: PersonInfo = {
    firstName: 'John',
    lastName: 'Smith',
    age: 31,
    sex: 'Male',
    email: 'john.smith@email.com',
    diagnoses: [
        'Generalized Anxiety Disorder (GAD)',
        'Seasonal Affective Disorder (SAD)',
        'Generalized Anxiety Disorder (GAD)3',
        'Generalized Anxiety Disorder (GAD)5',
        'Generalized Anxiety Disorder (GAD)6',
        'Generalized Anxiety Disorder (GAD)7',
        'Generalized Anxiety Disorder (GAD)8',
    ],
    treatments: [
        'Mindfulness Meditation',
        'Counselling',
        'Mindfulness Meditation',
        'Mindfulness Meditation',
        'Mindfulness Meditation',
        'Mindfulness Meditation',
        'Mindfulness Meditation',
        'Mindfulness Meditation',
        'Mindfulness Meditation',
        'Mindfulness Meditation',
        'Mindfulness Meditation',
    ]
}

@Component({
    selector: "profile",
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser: PersonInfo;

    constructor(private page: Page) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
        this.currentUser = FakePerson;
    }

    ngOnInit(): void {
    }
}