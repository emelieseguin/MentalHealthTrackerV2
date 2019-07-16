import { Component, OnInit, EventEmitter } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { DataService } from '../services/data.service';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { StatAnalysisService } from "../services/stat-analysis.service";
import { AppStoreService } from "../services/app-store.service";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { JournalEntries, JournalEntry } from "../models/journal.model";
import { RouterExtensions } from "nativescript-angular/router";
import { UtilsService } from "../services";
import { DefaultUserService } from "../services/default-user.service";
export class GraphValuePair {
    day: string
    num: number
}

export class DataSeries {
    seriesValues: GraphValuePair[]
    seriesName: string
}

const NoTrend = 'No Trend';
const TrendUp = 'Trend Up';
const TrendDown = 'Trend Down';

const TrendUpPic = '~/app/images/trendUp.png';
const TrendDownPic = '~/app/images/trendDown.png';
const NoTrendPic = '~/app/images/noTrend.png';

@Component({
    selector: "home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
    providers: [DataService]
})
export class HomeComponent implements OnInit {

    public month = this.utils.getMonth();
    public userTrackedSymptoms: string[];
    public userGraphedSymptoms: Map<string, boolean>;
    public userJournalEntries: Map<string, JournalEntry>;
    public dataSeries: Array<DataSeries>;

    // 3 Trend Variables
    fatigueImage = NoTrendPic;
    public fatigueValue = '';    
    public feelingSadImage = NoTrendPic; 
    public feelingSadValue = '';

    // First series to plot
    public series1Values: ObservableArray<GraphValuePair>;
    public series1Name: string;

    // Second series to plot
    public series2Values: ObservableArray<GraphValuePair>;
    public series2Name: string;

    // Second series to plot
    public series3Values: ObservableArray<GraphValuePair>;
    public series3Name: string;

    private currentDay = '';
    private oneDayAgo = '';
    private twoDaysAgo = '';
    private threeDaysAgo = '';
    private fourDaysAgo = '';
    private fiveDaysAgo = '';
    private sixDaysAgo = '';


    constructor(private page: Page, private dataService: DataService, private routerExtensions: RouterExtensions,
        private stats: StatAnalysisService, private appStore: AppStoreService, private utils: UtilsService, 
        private defaultData: DefaultUserService) {
        
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.appStore.graphedSymptoms = this.defaultData.getDefaultGraphedSymptoms(this.appStore.symptoms); 
        this.userJournalEntries = this.appStore.journalEntries.entries;
        this.userTrackedSymptoms = this.appStore.symptoms;
        this.userGraphedSymptoms = this.appStore.graphedSymptoms;

        this.updateSeries();

        this.fatigueValue = this.stats.getPercentage('Fatigue').toString();
        this.feelingSadValue = this.stats.getPercentage('Feeling sad or down').toString();

        this.setImages();

        this.currentDay = utils.getSpecificDayString(0);
        this.oneDayAgo = utils.getSpecificDayString(1);
        this.twoDaysAgo = utils.getSpecificDayString(2);
        this.threeDaysAgo = utils.getSpecificDayString(3);
        this.fourDaysAgo = utils.getSpecificDayString(4);
        this.fiveDaysAgo = utils.getSpecificDayString(5);
        this.sixDaysAgo = utils.getSpecificDayString(6);
    } 

    ngOnInit(): void {
    }

    onGraphedSymptomChange(symptomName: string, args) {
        let mySwitch = args.object as Switch;
        this.userGraphedSymptoms[symptomName] = mySwitch.checked;
        this.updateSeries();
    }

    getGraphValuesFromEntries(symptomName: string) : GraphValuePair[] {
        let graphValues : GraphValuePair[]  = new Array;
        graphValues.push({
            day: this.sixDaysAgo,
            num: (this.userJournalEntries[this.utils.getSpecificDateKey(6)].symptoms[symptomName] ? this.userJournalEntries[this.utils.getSpecificDateKey(6)].symptoms[symptomName]: 0)
        });
        graphValues.push({
            day: this.fiveDaysAgo,
            num: (this.userJournalEntries[this.utils.getSpecificDateKey(5)].symptoms[symptomName] ? this.userJournalEntries[this.utils.getSpecificDateKey(5)].symptoms[symptomName]: 0)
        });
        graphValues.push({
            day: this.fourDaysAgo,
            num: (this.userJournalEntries[this.utils.getSpecificDateKey(4)].symptoms[symptomName] ? this.userJournalEntries[this.utils.getSpecificDateKey(4)].symptoms[symptomName]: 0)
        });
        graphValues.push({
            day: this.threeDaysAgo,
            num: (this.userJournalEntries[this.utils.getSpecificDateKey(3)].symptoms[symptomName] ? this.userJournalEntries[this.utils.getSpecificDateKey(3)].symptoms[symptomName]: 0)
        });
        graphValues.push({
            day: this.twoDaysAgo,
            num: (this.userJournalEntries[this.utils.getSpecificDateKey(2)].symptoms[symptomName] ? this.userJournalEntries[this.utils.getSpecificDateKey(2)].symptoms[symptomName]: 0)
        });
        graphValues.push({
            day: this.oneDayAgo,
            num: (this.userJournalEntries[this.utils.getSpecificDateKey(1)].symptoms[symptomName] ? this.userJournalEntries[this.utils.getSpecificDateKey(1)].symptoms[symptomName]: 0)
        });
        graphValues.push({
            day: this.currentDay,
            num: (this.userJournalEntries[this.utils.getSpecificDateKey(0)].symptoms[symptomName] ? this.userJournalEntries[this.utils.getSpecificDateKey(0)].symptoms[symptomName]: 0)
        });
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
            this.series1Values = this.getBlankArray();
        }

        if(seriesCount == 1) {
            this.series2Name = 'N/A';
            this.series2Values = this.getBlankArray();
        }

        if(seriesCount == 2) {
            this.series3Name = 'N/A';
            this.series3Values = this.getBlankArray();
        }
    };

    setImages() {
        let fatigue = this.stats.getTrend('Fatigue');
        if(fatigue == TrendUp) {
            this.fatigueImage = TrendUpPic;
        } else if(fatigue == TrendDown) {
            this.fatigueImage = TrendDownPic;
        } else if(fatigue == NoTrend) {
            this.fatigueImage = NoTrendPic;
        }

        let sad = this.stats.getTrend('Feeling sad or down');
        if(sad == TrendUp) {
            this.feelingSadImage = TrendUpPic;
        } else if(sad == TrendDown) {
            this.feelingSadImage = TrendDownPic;
        } else if(sad == NoTrend) {
            this.feelingSadImage = NoTrendPic;
        }
    }

    updateTrends(){
        this.fatigueValue = this.stats.getPercentage('Fatigue').toString();
        this.feelingSadValue = this.stats.getPercentage('Feeling sad or down').toString();

        this.setImages();

        // Refresh graphs
        this.series1Name = 'N/A';
        this.series1Values = this.getBlankArray();
        this.series2Name = 'N/A';
        this.series2Values = this.getBlankArray();
        this.series3Name = 'N/A';
        this.series3Values = this.getBlankArray();

        this.updateSeries();
    }

    getBlankArray() : ObservableArray<GraphValuePair> {

        return new ObservableArray([
            {
                day: this.sixDaysAgo, 
                num: 0
            },
            {
                day: this.fiveDaysAgo, 
                num: 0
            },
            {
                day: this.fourDaysAgo, 
                num: 0
            },
            {
                day: this.threeDaysAgo, 
                num: 0
            },
            {
                day: this.twoDaysAgo, 
                num: 0
            },
            {
                day: this.oneDayAgo, 
                num: 0
            },
            {
                day: this.currentDay, 
                num: 0
            },
        ]);
    }
}
