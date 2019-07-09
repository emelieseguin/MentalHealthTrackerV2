import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { Country, DataService, Symptom } from '../services/data.service';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadCartesianChart } from "nativescript-ui-chart";

export class TestGraph {
    day: string
    num: number
}


@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    providers: [DataService]
})
export class HomeComponent implements OnInit {

    private _categoricalSource: ObservableArray<Country>;
    private userSymptoms: Symptom[];

    // Probably the right mock object to actually use
    private data: TestGraph[] = [
        {day: 'mon', num: 2},
        {day: 'tues', num: 3},
        {day: 'wed', num: 4},
        {day: 'thu', num: 5},
        {day: 'fri', num: 6},
        {day: 'sat', num: 7},
        {day: 'sun', num: 8}
    ]

    private data2: TestGraph[] = [
        {day: 'mon', num: 2},
        {day: 'tues', num: 3},
        {day: 'wed', num: 4},
        {day: 'thu', num: 5},
        {day: 'fri', num: 8},
        {day: 'sat', num: 9},
        {day: 'sun', num: 10}
    ]

    // Mock values to plot
    private days: string[] = ['Mon', 'Tu', 'Wen', 'Thurs', 'Fri', 'Sat', 'Sun'];
    private valuesFatigue: number[] = [1, 2, 3, 4, 5, 6, 7];
    private valuesApathy: number[] = [1, 2, 3, 4, 5, 6, 7];
    private valuesHeadache: number[] = [1, 2, 3, 4, 5, 6, 7];
    private showHeadache = false;

    constructor(private page: Page, private dataService: DataService) {
        
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
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
