import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { Switch } from "tns-core-modules/ui/switch";
import { EventData } from "tns-core-modules/data/observable";
import { Treatment } from "~/app/models/user-info.model";
import { AppStoreService } from "~/app/services/app-store.service";

@Component({
    selector: "treatments",
    templateUrl: "./treatments.component.html",
    styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {

    userTreatments : Treatment[];

    constructor(private page: Page, private routerExtensions: RouterExtensions,
        private appStore: AppStoreService) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.userTreatments = this.appStore.userInfo.treatments;
    }

    goBack(): void {
        this.routerExtensions.back();
    }

    ngOnInit(): void {
    }

    onCheckedChange(toggledTreatmentName:string, args: EventData): void {
        let mySwitch = args.object as Switch;

        this.userTreatments.forEach(element => {
            if(element.name == toggledTreatmentName){
                element.undergoing = mySwitch.checked;

                console.log(`Name: ${element.name}  Undergoing: ${element.undergoing}`);
            }
        });
    }
}