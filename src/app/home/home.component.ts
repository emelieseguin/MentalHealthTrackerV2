import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(private page: Page) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    ngOnInit(): void {
        // Init your component properties here.
    }
}
