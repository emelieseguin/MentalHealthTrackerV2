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

@Component({
    selector: "journal",
    templateUrl: "./journal.component.html",
    styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

    public sliderValue5 = 5;
    public currentSymptom: Symptom[] = [
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

    constructor(private page: Page) {
        if (isAndroid) {
            this.page.actionBarHidden = true; 
        }
    } 

    ngOnInit(): void {
    }

    valueChange(name:string, args) {
        let slider = <Slider>args.object;

        this.currentSymptom.forEach(element => {
            if(element.Name == name){
                element.NewValue = slider.value;
                console.log(`Name: ${name}, Value: ${slider.value}`); 
            }
        });

         
    }
}