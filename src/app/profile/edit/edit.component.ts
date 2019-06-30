import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "profile-edit",
    templateUrl: "./edit.component.html",
    styleUrls: ['./edit.component.css']
})
export class ProfileEditComponent implements OnInit {

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
}