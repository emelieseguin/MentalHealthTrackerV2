import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { Country, DataService, Symptom } from '../services/data.service';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadCartesianChart } from "nativescript-ui-chart";
import { Image } from "tns-core-modules/ui/image";
import { StatAnalysisService } from "../services/stat-analysis.service";
import { AppStoreService } from "../services/app-store.service";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { JournalEntries, JournalEntry } from "../models/journal.model";
export class GraphValuePair {
    day: string
    num: number
}

export class DataSeries {
    seriesValues: GraphValuePair[]
    seriesName: string
}


@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    providers: [DataService]
})
export class HomeComponent implements OnInit {

    private _categoricalSource: ObservableArray<Country>;
    // private userSymptoms: Symptom[];

    // Probably the right mock object to actually use
    private data: GraphValuePair[] = [
        {day: 'S', num: 3},
        {day: 'M', num: 1},
        {day: 'T', num: 3},
        {day: 'W', num: 6},
        {day: 'Th', num: 6},
        {day: 'F', num: 7},
        {day: 'Su', num: 8}
    ]

    private data2: GraphValuePair[] = [
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

    public dataSeries: DataSeries[] = [
        {
            seriesName: 'tester',
            seriesValues: 
                [
                    {
                        num: 0,
                        day: '1'
                    },
                    {
                        num: 2,
                        day: '3'
                    },
                    {
                        num: 4,
                        day: '5'
                    },
                    {
                        num: 10,
                        day: '2'
                    },

                ]
        },
        {
            seriesName: 'tester 2',
            seriesValues: 
                [
                    {
                        num: 8,
                        day: '1'
                    },
                    {
                        num: 2,
                        day: '3'
                    },
                    {
                        num: 6,
                        day: '5'
                    },
                    {
                        num: 1,
                        day: '2'
                    },

                ]
        },

];

    public userTrackedSymptoms: string[];
    public userGraphedSymptoms: Map<string, boolean>;
    public userJournalEntries: Map<string, JournalEntry>;

    

    constructor(private page: Page, private dataService: DataService,
        private stats: StatAnalysisService, private appStore: AppStoreService) {
        
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.userJournalEntries = this.appStore.journalEntries.entries;
        this.userTrackedSymptoms = this.appStore.symptoms;
        this.userGraphedSymptoms = this.appStore.graphedSymptoms;


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
        // this.userSymptoms = this.dataService.getAllUserSymptoms();
    }

    onGraphedSymptomChange(symptomName: string, args) {
        let mySwitch = args.object as Switch;
        this.userGraphedSymptoms[symptomName] = mySwitch.checked;

        console.log(`Graphed Symptom value: ${symptomName}  ---- ${this.appStore.graphedSymptoms[symptomName]}`)
    }

    // TODO: get the keys for the last 7 days so that they can be graphed
    getLast7DaysKeys(): string[]{
        return ['2019-07-14'];
    }

    // Creates the series from the symptoms that can actually be graphed in needed
    updateGraphableSeries(){
        
        // Loop around the symptoms that are needed to be graphed


            // Loop around the last 7 days and pull the value to store in the array


    }
}
