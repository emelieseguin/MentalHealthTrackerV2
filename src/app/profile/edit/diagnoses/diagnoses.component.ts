import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "diagnoses",
    templateUrl: "./diagnoses.component.html",
    styleUrls: ['./diagnoses.component.css']
})
export class DiagnosesComponent implements OnInit {

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