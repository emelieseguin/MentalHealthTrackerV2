import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";

@Component({
    selector: "journal",
    templateUrl: "./journal.component.html",
    styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

    constructor(private page: Page) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    ngOnInit(): void {
    }
}