import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";

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
        'Seasonal Affective Disorder (SAD)'
    ],
    treatments: [
        'Mindfulness Meditation',
        'Counselling'
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