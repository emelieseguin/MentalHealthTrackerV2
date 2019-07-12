import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "tns-core-modules/ui/text-field";



export class User {
    name: string;
    age: number;
    sex: string;
}


@Component({
    selector: "profile-edit",
    templateUrl: "./edit.component.html",
    styleUrls: ['./edit.component.css']
})
export class ProfileEditComponent implements OnInit {

    textFieldValue: string = "test";
    currentUser : User = {
        name: 'test',
        age: 22,
        sex: 'unknown'
    }
    
    constructor(private page: Page, private routerExtensions: RouterExtensions) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    goBack(): void {
        this.routerExtensions.back();
    }

    ngOnInit(): void {
    }

    saveNameValue(args): void {
        let textField = <TextField>args.object;

        console.log(`Old Name:  ${this.currentUser.name}   New Name: ${textField.text}`);
        this.currentUser.name = textField.text;
    }

    saveAgeValue(args): void {
        let textField = <TextField>args.object;

        console.log(`Old Age:  ${this.currentUser.age}   New Age: ${textField.text}`);
        this.currentUser.age = Number(textField.text);
    }

    saveSexValue(args): void {
        let textField = <TextField>args.object;

        console.log(`Old Sex:  ${this.currentUser.sex}   New User: ${textField.text}`);
        this.currentUser.sex = textField.text;
    }
}