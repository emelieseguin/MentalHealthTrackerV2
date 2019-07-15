import { Component, OnInit, EventEmitter } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { Country, DataService, Symptom } from '../services/data.service';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { RadCartesianChart } from "nativescript-ui-chart";
import { Image } from "tns-core-modules/ui/image";
import { StatAnalysisService } from "../services/stat-analysis.service";
import { AppStoreService } from "../services/app-store.service";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { JournalEntries, JournalEntry } from "../models/journal.model";
import { Data } from "@angular/router"; 
import { Observable } from "rxjs";
import { RouterExtensions } from "nativescript-angular/router";
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

    public userTrackedSymptoms: string[];
    public userGraphedSymptoms: Map<string, boolean>;
    public userJournalEntries: Map<string, JournalEntry>;
    public dataSeries: Array<DataSeries>;

    // First series to plot
    public series1Values: ObservableArray<GraphValuePair>;
    public series1Name: string;

    // Second series to plot
    public series2Values: ObservableArray<GraphValuePair>;
    public series2Name: string;

    // Second series to plot
    public series3Values: ObservableArray<GraphValuePair>;
    public series3Name: string;

    constructor(private page: Page, private dataService: DataService, private routerExtensions: RouterExtensions,
        private stats: StatAnalysisService, private appStore: AppStoreService) {
        
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.userJournalEntries = this.appStore.journalEntries.entries;
        this.userTrackedSymptoms = this.appStore.symptoms;
        this.userGraphedSymptoms = this.appStore.graphedSymptoms;

        this.updateSeries();

        console.log(this.stats.doStats());
        console.log(this.stats.otherStats());
    }

    get categoricalSource(): ObservableArray<Country> {
        return this._categoricalSource;
    } 

    ngOnInit(): void {
        console.log('home load up')
        this.dataSeries = this.updateGraphableSeries();
    }

    onGraphedSymptomChange(symptomName: string, args) {
        let mySwitch = args.object as Switch;
        this.userGraphedSymptoms[symptomName] = mySwitch.checked;
        // this.dataSeries = this.updateGraphableSeries();
        this.updateSeries();
        console.log(`Graphed Symptom value: ${symptomName}  ---- ${this.appStore.graphedSymptoms[symptomName]}`)
    }

    // TODO: get the keys for the last 7 days so that they can be graphed
    getLast7DaysKeys(): string[]{
        return ['2019-07-14'];
    }

    refresh(){
        console.log('trying to refresh');
        this.routerExtensions.navigate(["/main"], { clearHistory: true } );
    }

    getGraphValuesFromEntries(symptomName: string) : GraphValuePair[] {
        let graphValues : GraphValuePair[]  = new Array;

        // Loop around the last 7 days and pull the value to store in the array
        if(symptomName == 'Fatigue'){
            graphValues.push({
                num: 5,
                day: 'F'
            });
    
            graphValues.push({
                num: 7,
                day: 'M'
            });
        } else if(symptomName == 'Irritability'){
            graphValues.push({
                num: 9,
                day: 'F'
            });
    
            graphValues.push({
                num: 2,
                day: 'M'
            });
        } else if(symptomName == 'Feeling sad or down'){
            graphValues.push({
                num: 1,
                day: 'F'
            });
    
            graphValues.push({
                num: 9,
                day: 'M'
            });
        }
         
        return graphValues
    }

    updateSeries() {
        let count = 0;
        let seriesCount = 0;
        
        // Loop around the symptoms that are needed to be graphed
        this.userTrackedSymptoms.forEach(symptomName => {
            
            // If this symptom is to be graphed
            if(this.userGraphedSymptoms[symptomName] && seriesCount == 0){

                console.log(`First symptom: ${symptomName}`)
                this.series1Name = symptomName;
                this.series1Values = new ObservableArray( this.getGraphValuesFromEntries(symptomName));
                seriesCount++;
            } else if(this.userGraphedSymptoms[symptomName] && seriesCount == 1){

                console.log(`Second symptom: ${symptomName}`)
                this.series2Name = symptomName;
                this.series2Values = new ObservableArray( this.getGraphValuesFromEntries(symptomName));
                seriesCount++;
            } else if(this.userGraphedSymptoms[symptomName] && seriesCount == 2){

                console.log(`Third symptom: ${symptomName}`)
                this.series3Name = symptomName;
                this.series3Values = new ObservableArray( this.getGraphValuesFromEntries(symptomName));
                seriesCount++;
            }
            count++;
        });

        if(seriesCount == 0) {
            this.series1Name = 'N/A';
            this.series1Values = new ObservableArray([
                {day: 'F', 
                num: 0},
                {day: 'M', 
                num: 0},
            ]);
        }

        if(seriesCount == 1) {
            this.series2Name = 'N/A';
            this.series2Values = new ObservableArray([
                {day: 'F', 
                num: 0},
                {day: 'M', 
                num: 0},
            ]);
        }

        if(seriesCount == 2) {
            this.series3Name = 'N/A';
            this.series3Values = new ObservableArray([
                {day: 'F', 
                num: 0},
                {day: 'M', 
                num: 0},
            ]);
        }

        // this.series1Values.notifyPropertyChange('hi', 'hi');
        // this.series2Values.notifyPropertyChange('hi', 'hi');
    };

    // Creates the series from the symptoms that can actually be graphed in needed
    updateGraphableSeries(): DataSeries[]{
        
        this.dataSeries = null;
        let count = 0;
        // console.log(JSON.stringify(this.dataSeries));
        // console.log(JSON.stringify(this.dataSeries));
        // this.dataSeries = new ObservableArray();
        // console.log(JSON.stringify(this.dataSeries));
        let dataArray = new Array<DataSeries>();

        // Loop around the symptoms that are needed to be graphed
        this.userTrackedSymptoms.forEach(symptomName => {
            
            // If this symptom is to be graphed
            if(this.userGraphedSymptoms[symptomName]){

                console.log(`Tracking the symptom: ${symptomName}`)
                console.log(`Tracking Array: ${dataArray}`)
                let dataSeries = new DataSeries;
                dataSeries.seriesName = symptomName;
                dataSeries.seriesValues = this.getGraphValuesFromEntries(symptomName);
                
                dataArray.push(dataSeries);
            }
            count++;
        });
        console.log(`Graph Values: ${JSON.stringify(dataArray)}`);
        return dataArray;
    }
}
