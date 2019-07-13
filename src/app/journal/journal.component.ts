import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { Slider } from "tns-core-modules/ui/slider";

let getFatigueMap = new Map([
    ['2019,7,9,10,33,15', 6],
    ['2019,7,8,10,33,15', 4],
    ['2019,7,8,10,33,15', 8] 
]);

let getHeadacheMap = new Map([
    ['2019,7,9,10,33,15', 1],
    ['2019,7,8,10,33,15', 8],
    ['2019,7,8,10,33,15', 10] 
]);

let getApathyMap = new Map([
    ['2019,7,9,10,33,15', 9],
    ['2019,7,8,10,33,15', 2],
    ['2019,7,8,10,33,15', 1] 
]);

export class Symptom {
    Name: string;
    Values?: Map<string, number>;
    Active: boolean;
    GraphActive?: boolean;
    NewValue: number;
}

export class DailyRecord {
    sleep: number;
    exercise: boolean;
    meditation: boolean;
    dailySymptoms: Symptom[];
}

@Component({
    selector: "journal",
    templateUrl: "./journal.component.html",
    styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

    public sliderValue5 = 5;

    // TODO: this will have to get generated based on the user every day from the known info... Which symptoms to actually log
    // Active won't be useful here, will have to be stored somewhere else so that this list can be generated!!!
    public dailySymptoms: Symptom[] = [
        {
            Name: 'Fatigue',
            Values: getFatigueMap,
            Active: true,
            NewValue: 5,
        },
        {
            Name: 'Headache',
            Values: getHeadacheMap,
            Active: true,
            NewValue: 5,
        },
        {
            Name: 'Apathy',
            Values: getApathyMap,
            Active: true,
            NewValue: 5,
        }
    ];
    public dailyRecord: DailyRecord = {
        sleep: 8,
        exercise: false,
        meditation: false,
        dailySymptoms: this.dailySymptoms
    }
    
    constructor(private page: Page) {
        if (isAndroid) {
            this.page.actionBarHidden = true; 
        }
    } 

    ngOnInit(): void {
    }

    valueChange(name:string, args) {
        let slider = <Slider>args.object;

        this.dailyRecord.dailySymptoms.forEach(element => {
            if(element.Name == name){
                element.NewValue = slider.value;
                console.log(`Name: ${name}, Value: ${element.NewValue}`); 
            }
        });
    }

    sleepValueChange(args) {
        let slider = <Slider>args.object;

        this.dailyRecord.sleep = slider.value;
        console.log(`Hours of Sleep: ${this.dailyRecord.sleep }`); 
    }
}