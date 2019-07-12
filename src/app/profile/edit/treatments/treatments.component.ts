import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";

interface Checkbox {
    checkbox1: boolean
    checkbox2: boolean
}


@Component({
    selector: "treatments",
    templateUrl: "./treatments.component.html",
    styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {

    private treatmentCheckboxes: Checkbox;

    constructor(private page: Page, private routerExtensions: RouterExtensions) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.treatmentCheckboxes = {
            checkbox1: true,
            checkbox2: true
        };
    }

    goBack(): void {
        this.routerExtensions.back();
    }

    ngOnInit(): void {
    }
}