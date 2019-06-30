import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "treatments",
    templateUrl: "./treatments.component.html",
    styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {

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