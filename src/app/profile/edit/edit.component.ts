import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "tns-core-modules/ui/text-field";
import { AppStoreService } from "~/app/services/app-store.service";
import { UserInfo } from "~/app/models/user-info.model";
import { DataService } from "~/app/services/data.service";



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
    currentUser : UserInfo;
    
    constructor(private page: Page, private routerExtensions: RouterExtensions,
        private appStore: AppStoreService, private dataService: DataService) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.currentUser = appStore.userInfo
    }

    goBack(): void {
        this.routerExtensions.back();
    }

    ngOnInit(): void {
    }

    saveFirstNameValue(args): void {
        let textField = <TextField>args.object;

        console.log(`Old Name:  ${this.currentUser.firstName}   New Name: ${textField.text}`);
        this.currentUser.firstName = textField.text;
    }

    saveLastNameValue(args): void {
        let textField = <TextField>args.object;

        console.log(`Old Name:  ${this.currentUser.lastName}   New Name: ${textField.text}`);
        this.currentUser.lastName = textField.text;
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

    saveToDatabase() {
        this.dataService.storeUserInfo(this.appStore.userInfo);
    }

    //TODO: this will also have to save to the database
    // saveToAppStore() {
    //     this.appStore.userInfoMap.firstName = this.currentUser.firstName;
    //     this.appStore.userInfoMap.lastName = this.currentUser.lastName;
    //     this.appStore.userInfoMap.sex = this.currentUser.sex;
    //     this.appStore.userInfoMap.age = this.currentUser.age;

    //     this.goBack();
    // }
}