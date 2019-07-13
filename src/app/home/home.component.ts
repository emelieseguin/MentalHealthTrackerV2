import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { Country, DataService, Symptom } from '../services/data.service';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadCartesianChart } from "nativescript-ui-chart";
import { Image } from "tns-core-modules/ui/image";
import { StatAnalysisService } from "../services/stat-analysis.service";

export class TestGraph {
    day: string
    num: number
}


@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    providers: [DataService]
})
export class HomeComponent implements OnInit {

    private _categoricalSource: ObservableArray<Country>;
    private userSymptoms: Symptom[];

    // Probably the right mock object to actually use
    private data: TestGraph[] = [
        {day: 'S', num: 3},
        {day: 'M', num: 1},
        {day: 'T', num: 3},
        {day: 'W', num: 6},
        {day: 'Th', num: 6},
        {day: 'F', num: 7},
        {day: 'Su', num: 8}
    ]

    private data2: TestGraph[] = [
        {day: 'S', num: 2},
        {day: 'M', num: 3},
        {day: 'T', num: 4},
        {day: 'W', num: 5},
        {day: 'Th', num: 8},
        {day: 'F', num: 9},
        {day: 'Su', num: 10}
    ]

    // Mock values to plot
    private days: string[] = ['Mon', 'Tu', 'Wen', 'Thurs', 'Fri', 'Sat', 'Sun'];
    private valuesFatigue: number[] = [1, 2, 3, 4, 5, 6, 7];
    private valuesApathy: number[] = [1, 2, 3, 4, 5, 6, 7];
    private valuesHeadache: number[] = [1, 2, 3, 4, 5, 6, 7];
    private showHeadache = false;

    constructor(private page: Page, private dataService: DataService,
        private stats: StatAnalysisService) {
        
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }


        console.log(this.stats.doStats());
        console.log(this.stats.otherStats());
    }

    get categoricalSource(): ObservableArray<Country> {
        return this._categoricalSource;
    } 

    ngOnInit(): void {
        // turn on showHeadache here
        // this.showHeadache = true

        // Init your component properties here.
        this._categoricalSource = new ObservableArray(this.dataService.getCategoricalSource());
        this.userSymptoms = this.dataService.getAllUserSymptoms();
    }
}
