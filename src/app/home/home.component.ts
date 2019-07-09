import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { Country, DataService, Symptom } from '../services/data.service';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadCartesianChart } from "nativescript-ui-chart";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    providers: [DataService]
})
export class HomeComponent implements OnInit {

    private _categoricalSource: ObservableArray<Country>;
    private userSymptoms: Symptom[];

    constructor(private page: Page, private dataService: DataService) {
        
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    get categoricalSource(): ObservableArray<Country> {
        return this._categoricalSource;
    } 

    ngOnInit(): void {
        // Init your component properties here.
        this._categoricalSource = new ObservableArray(this.dataService.getCategoricalSource());
        this.userSymptoms = this.dataService.getAllUserSymptoms();
        console.log(this.userSymptoms);
        console.log(this.userSymptoms[0].Values['2019,7,9,10,33,15']);
    }
}
