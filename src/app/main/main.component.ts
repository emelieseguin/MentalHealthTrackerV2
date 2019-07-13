import { Component, OnInit } from "@angular/core";
import { isAndroid, Page, EventData } from "tns-core-modules/ui/page/page";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view/tab-view";
import { TabView } from "tns-core-modules/ui/tab-view";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "main",
    moduleId: module.id,
    templateUrl: "./main.component.html",
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    constructor(private page: Page, private routerExtension: RouterExtensions, private activeRoute: ActivatedRoute) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData): void {
        console.log(`Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`);
    }

    ngOnInit(): void {
        console.log('got here');
        this.routerExtension.navigate([{ outlets: { homeTab: ["home"], journalTab: ["journal"], profileTab: ["profile"] } }], { relativeTo: this.activeRoute }); 
    }
}