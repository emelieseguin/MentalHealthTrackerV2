import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { getComputedCssValues } from "tns-core-modules/ui/page/page";
import { JournalEntries, JournalEntry } from "../models/journal.model";
import { UtilsService } from "./utils.service";
import { AppStoreService } from "./app-store.service";





@Injectable()
export class StatAnalysisService {

    constructor(private utils: UtilsService, private appStore: AppStoreService) {

    }
  
    private numberOfRecentPointsToCompare = 30;
    private values = [1,2,3,4,5,6,7,8,9,10,6,7,8,2,5,6,7,8,9,2,4,6,7,8,2,4,6,3,6,8,9,3,6,7,8,3,2,5];
    private arraySum = 0;

     

    getNoTrend(symptomName: string): boolean {
        // This is the array to use for the sum of last 30 days 
        let sumMonthArray = this.getSymptomValuesMonth(symptomName);
        let sumMonthAverage = sumMonthArray.reduce((a, b) => a + b, 0)/30;
        console.log(`Average: ${symptomName} -- ${sumMonthAverage}`);

        // This is the array to use for the sum of last 7 days 
        let sumWeekArray = this.getSymptomValuesWeek(symptomName);
        let sumWeekAverage = sumWeekArray.reduce((a, b) => a + b, 0)/7;
        console.log(`Average: ${symptomName} -- ${sumWeekAverage}`);
        
        let A = sumWeekArray[0];
        console.log(`A: ${symptomName} -- ${A}`);
        let B1 = Math.pow((sumWeekArray[0]-sumWeekAverage),2);
        let B2 = Math.pow((sumWeekArray[1]-sumWeekAverage),2);
        let B3 = Math.pow((sumWeekArray[2]-sumWeekAverage),2);
        let B4 = Math.pow((sumWeekArray[3]-sumWeekAverage),2);
        let B5 = Math.pow((sumWeekArray[4]-sumWeekAverage),2);
        let B6 = Math.pow((sumWeekArray[5]-sumWeekAverage),2);
        let B7 = Math.pow((sumWeekArray[6]-sumWeekAverage),2);
        let C = B1+B2+B3+B4+B5+B6+B7;
        let stdDev = Math.sqrt((C/6));
        let To = Math.abs((sumWeekAverage-sumMonthAverage)/(stdDev/(Math.sqrt(7))));
        console.log(`to: ${To}`);

        let NoTrend = false;

    //    (thing=="your first string")? ((thing2=='your string')? true: false): false
    
        if (To < 1.943) {
            console.log("got here hi");
            return NoTrend = true;
        }
        return NoTrend;
    }

    getTrend(symptomName: string): boolean {
        // This is the array to use for the sum of last 30 days 
        let sumMonthArray = this.getSymptomValuesMonth(symptomName);
        let sumMonthAverage = sumMonthArray.reduce((a, b) => a + b, 0)/30;
        console.log(`Average: ${symptomName} -- ${sumMonthAverage}`);

        // This is the array to use for the sum of last 7 days 
        let sumWeekArray = this.getSymptomValuesWeek(symptomName);
        let sumWeekAverage = sumWeekArray.reduce((a, b) => a + b, 0)/7;
        console.log(`Average: ${symptomName} -- ${sumWeekAverage}`);
        
        let A = sumWeekArray[0];
        console.log(`A: ${symptomName} -- ${A}`);
        let B1 = Math.pow((sumWeekArray[0]-sumWeekAverage),2);
        let B2 = Math.pow((sumWeekArray[1]-sumWeekAverage),2);
        let B3 = Math.pow((sumWeekArray[2]-sumWeekAverage),2);
        let B4 = Math.pow((sumWeekArray[3]-sumWeekAverage),2);
        let B5 = Math.pow((sumWeekArray[4]-sumWeekAverage),2);
        let B6 = Math.pow((sumWeekArray[5]-sumWeekAverage),2);
        let B7 = Math.pow((sumWeekArray[6]-sumWeekAverage),2);
        let C = B1+B2+B3+B4+B5+B6+B7;
        let stdDev = Math.sqrt((C/6));
        let To = Math.abs((sumWeekAverage-sumMonthAverage)/(stdDev/(Math.sqrt(7))));
        console.log(`to: ${To}`);

        let TrendUp = null;
    
        if (To >= 1.943) {
            if (sumWeekAverage < sumMonthAverage)
            {return TrendUp = false;}
            else 
            {return TrendUp = true;}  
        }
        return TrendUp;
    }
    getPercentage(symptomName: string): number {

        // This is the array to use for the sum of last 30 days 
        let sumMonthArray = this.getSymptomValuesMonth(symptomName);
        let sumMonthAverage = sumMonthArray.reduce((a, b) => a + b, 0)/30;
        console.log(`Average: ${symptomName} -- ${sumMonthAverage}`);

        // This is the array to use for the sum of last 7 days 
        let sumWeekArray = this.getSymptomValuesWeek(symptomName);
        let sumWeekAverage = sumWeekArray.reduce((a, b) => a + b, 0)/7;
        console.log(`Average: ${symptomName} -- ${sumWeekAverage}`);
    
        let prePercentage = Math.abs(((sumWeekAverage-sumMonthAverage)/sumMonthAverage)*100);
        let percentage = Math.round(prePercentage);

        return percentage;
    }
    
    getSymptomValuesMonth(symptomName: string): number[] {

        let entryMap = this.appStore.journalEntries.entries;
        let tempArray = new Array<number>();

        for(let i = 0; i < 30; i++){
            let journal = entryMap[this.utils.getSpecificDateKey(i)];

            tempArray.push(journal.symptoms[symptomName])
        }

        console.log(`Month of: ${symptomName}  --- ${tempArray}`)
        return tempArray;
    }

    getSymptomValuesWeek(symptomName: string): number[] {

        let entryMap = this.appStore.journalEntries.entries;
        let tempArray = new Array<number>();

        for(let i = 0; i < 7; i++){
            let journal = entryMap[this.utils.getSpecificDateKey(i)];

            tempArray.push(journal.symptoms[symptomName])
        }

        console.log(`Week of: ${symptomName}  --- ${tempArray}`)
        return tempArray;
    }

    getData(): JournalEntries {

        // Big entry where everything exists
        let definedEntries = new Map<string, JournalEntry>();
        definedEntries[this.utils.getSpecificDateKey(0)] = journalEntry1;
        definedEntries[this.utils.getSpecificDateKey(1)] = journalEntry2;
        definedEntries[this.utils.getSpecificDateKey(2)] = journalEntry3;
        definedEntries[this.utils.getSpecificDateKey(3)] = journalEntry4;
        definedEntries[this.utils.getSpecificDateKey(4)] = journalEntry5;
        definedEntries[this.utils.getSpecificDateKey(5)] = journalEntry6;
        definedEntries[this.utils.getSpecificDateKey(6)] = journalEntry7;
        definedEntries[this.utils.getSpecificDateKey(7)] = journalEntry8;
        definedEntries[this.utils.getSpecificDateKey(8)] = journalEntry9;
        definedEntries[this.utils.getSpecificDateKey(9)] = journalEntry10;
        definedEntries[this.utils.getSpecificDateKey(10)] = journalEntry11;
        definedEntries[this.utils.getSpecificDateKey(11)] = journalEntry12;
        definedEntries[this.utils.getSpecificDateKey(12)] = journalEntry13;
        definedEntries[this.utils.getSpecificDateKey(13)] = journalEntry14;
        definedEntries[this.utils.getSpecificDateKey(14)] = journalEntry15;
        definedEntries[this.utils.getSpecificDateKey(15)] = journalEntry16;
        definedEntries[this.utils.getSpecificDateKey(16)] = journalEntry17;
        definedEntries[this.utils.getSpecificDateKey(17)] = journalEntry18;
        definedEntries[this.utils.getSpecificDateKey(18)] = journalEntry19;
        definedEntries[this.utils.getSpecificDateKey(19)] = journalEntry20;
        definedEntries[this.utils.getSpecificDateKey(20)] = journalEntry21;
        definedEntries[this.utils.getSpecificDateKey(21)] = journalEntry22;
        definedEntries[this.utils.getSpecificDateKey(22)] = journalEntry23;
        definedEntries[this.utils.getSpecificDateKey(23)] = journalEntry24;
        definedEntries[this.utils.getSpecificDateKey(24)] = journalEntry25;
        definedEntries[this.utils.getSpecificDateKey(25)] = journalEntry26;
        definedEntries[this.utils.getSpecificDateKey(26)] = journalEntry27;
        definedEntries[this.utils.getSpecificDateKey(27)] = journalEntry28;
        definedEntries[this.utils.getSpecificDateKey(28)] = journalEntry29;
        definedEntries[this.utils.getSpecificDateKey(29)] = journalEntry30;

        return {entries: definedEntries };
    }
}

// Journal Entry 1
let symptoms1 = new Map<string, number>();
symptoms1['Fatigue'] = 9;
symptoms1['Feeling sad or down'] = 2;
symptoms1['Inability to concentrate'] = 1;
symptoms1['Mood swings'] = 5;
symptoms1['Irritability'] = 9;
symptoms1['Headache'] = 1;
symptoms1['Apathy'] = 3;
symptoms1['Lack of motivation'] = 7;
let journalEntry1: JournalEntry = {
    hoursSleep: 8,
    exercise: true,
    meditate: false,
    symptoms: symptoms1
};
// Journal Entry 2
let symptoms2 = new Map<string, number>();
symptoms2['Fatigue'] = 9;
symptoms2['Feeling sad or down'] = 1;
symptoms2['Inability to concentrate'] = 4;
symptoms2['Mood swings'] = 6;
symptoms2['Irritability'] = 9;
symptoms2['Headache'] = 2;
symptoms2['Apathy'] = 4;
symptoms2['Lack of motivation'] = 8;
let journalEntry2: JournalEntry = {
    hoursSleep: 10,
    exercise: true,
    meditate: false,
    symptoms: symptoms2
};
// Journal Entry 3
let symptoms3 = new Map<string, number>();
symptoms3['Fatigue'] = 10;
symptoms3['Feeling sad or down'] = 2;
symptoms3['Inability to concentrate'] = 1;
symptoms3['Mood swings'] = 6;
symptoms3['Irritability'] = 8;
symptoms3['Headache'] = 2;
symptoms3['Apathy'] = 7;
symptoms3['Lack of motivation'] = 7;
let journalEntry3: JournalEntry = {
    hoursSleep: 9,
    exercise: true,
    meditate: true,
    symptoms: symptoms3
};
// Journal Entry 4
let symptoms4 = new Map<string, number>();
symptoms4['Fatigue'] = 10;
symptoms4['Feeling sad or down'] = 1;
symptoms4['Inability to concentrate'] = 2;
symptoms4['Mood swings'] = 7;
symptoms4['Irritability'] = 7;
symptoms4['Headache'] = 3;
symptoms4['Apathy'] = 5;
symptoms4['Lack of motivation'] = 4;
let journalEntry4: JournalEntry = {
    hoursSleep: 9,
    exercise: false,
    meditate: true,
    symptoms: symptoms4
};
// Journal Entry 5
let symptoms5 = new Map<string, number>();
symptoms5['Fatigue'] = 7;
symptoms5['Feeling sad or down'] = 1;
symptoms5['Inability to concentrate'] = 5;
symptoms5['Mood swings'] = 5;
symptoms5['Irritability'] = 6;
symptoms5['Headache'] = 2;
symptoms5['Apathy'] = 4;
symptoms5['Lack of motivation'] = 5;
let journalEntry5: JournalEntry = {
    hoursSleep: 10,
    exercise: true,
    meditate: true,
    symptoms: symptoms5
};
// Journal Entry 6
let symptoms6 = new Map<string, number>();
symptoms6['Fatigue'] = 8;
symptoms6['Feeling sad or down'] = 1;
symptoms6['Inability to concentrate'] = 3;
symptoms6['Mood swings'] = 4;
symptoms6['Irritability'] = 7;
symptoms6['Headache'] = 2;
symptoms6['Apathy'] = 5;
symptoms6['Lack of motivation'] = 6;
let journalEntry6: JournalEntry = {
    hoursSleep: 8,
    exercise: false,
    meditate: true,
    symptoms: symptoms6
};
// Journal Entry 7
let symptoms7 = new Map<string, number>();
symptoms7['Fatigue'] = 9;
symptoms7['Feeling sad or down'] = 1;
symptoms7['Inability to concentrate'] = 2;
symptoms7['Mood swings'] = 5;
symptoms7['Irritability'] = 6;
symptoms7['Headache'] = 1;
symptoms7['Apathy'] = 4;
symptoms7['Lack of motivation'] = 7;
let journalEntry7: JournalEntry = {
    hoursSleep: 9,
    exercise: false,
    meditate: false,
    symptoms: symptoms7
};
// Journal Entry 8
let symptoms8 = new Map<string, number>();
symptoms8['Fatigue'] = 1;
symptoms8['Feeling sad or down'] = 1;
symptoms8['Inability to concentrate'] = 1;
let journalEntry8: JournalEntry = {
    hoursSleep: 8,
    exercise: false,
    meditate: true,
    symptoms: symptoms8
};
// Journal Entry 9
let symptoms9 = new Map<string, number>();
symptoms9['Fatigue'] = 5;
symptoms9['Feeling sad or down'] = 5;
symptoms9['Inability to concentrate'] = 5;
let journalEntry9: JournalEntry = {
    hoursSleep: 9,
    exercise: true,
    meditate: true,
    symptoms: symptoms9
};
// Journal Entry 10
let symptoms10 = new Map<string, number>();
symptoms10['Fatigue'] = 2;
symptoms10['Feeling sad or down'] = 2;
symptoms10['Inability to concentrate'] = 2;
let journalEntry10: JournalEntry = {
    hoursSleep: 8,
    exercise: false,
    meditate: false,
    symptoms: symptoms10
};
// Journal Entry 11
let symptoms11 = new Map<string, number>();
symptoms11['Fatigue'] = 4;
symptoms11['Feeling sad or down'] = 4;
symptoms11['Inability to concentrate'] = 4;
let journalEntry11: JournalEntry = {
    hoursSleep: 8,
    exercise: false,
    meditate: false,
    symptoms: symptoms11
};
// Journal Entry 12
let symptoms12 = new Map<string, number>();
symptoms12['Fatigue'] = 2;
symptoms12['Feeling sad or down'] = 2;
symptoms12['Inability to concentrate'] = 2;
let journalEntry12: JournalEntry = {
    hoursSleep: 9,
    exercise: true,
    meditate: false,
    symptoms: symptoms12
};
// Journal Entry 13
let symptoms13 = new Map<string, number>();
symptoms13['Fatigue'] = 1;
symptoms13['Feeling sad or down'] = 1;
symptoms13['Inability to concentrate'] = 1;
let journalEntry13: JournalEntry = {
    hoursSleep: 10,
    exercise: true,
    meditate: true,
    symptoms: symptoms13
};
// Journal Entry 14
let symptoms14 = new Map<string, number>();
symptoms14['Fatigue'] = 3;
symptoms14['Feeling sad or down'] = 3;
symptoms14['Inability to concentrate'] = 3;
let journalEntry14: JournalEntry = {
    hoursSleep: 8,
    exercise: false,
    meditate: true,
    symptoms: symptoms14
};
// Journal Entry 15
let symptoms15 = new Map<string, number>();
symptoms15['Fatigue'] = 1;
symptoms15['Feeling sad or down'] = 1;
symptoms15['Inability to concentrate'] = 1;
let journalEntry15: JournalEntry = {
    hoursSleep: 8,
    exercise: false,
    meditate: false,
    symptoms: symptoms15
};
// Journal Entry 16
let symptoms16 = new Map<string, number>();
symptoms16['Fatigue'] = 2;
symptoms16['Feeling sad or down'] = 2;
symptoms16['Inability to concentrate'] = 2;
let journalEntry16: JournalEntry = {
    hoursSleep: 9,
    exercise: false,
    meditate: true,
    symptoms: symptoms16
};
// Journal Entry 17
let symptoms17 = new Map<string, number>();
symptoms17['Fatigue'] = 5;
symptoms17['Feeling sad or down'] = 5;
symptoms17['Inability to concentrate'] = 5;
let journalEntry17: JournalEntry = {
    hoursSleep: 7,
    exercise: false,
    meditate: true,
    symptoms: symptoms17
};
// Journal Entry 18
let symptoms18 = new Map<string, number>();
symptoms18['Fatigue'] = 6;
symptoms18['Feeling sad or down'] = 6;
symptoms18['Inability to concentrate'] = 6;
let journalEntry18: JournalEntry = {
    hoursSleep: 7,
    exercise: false,
    meditate: false,
    symptoms: symptoms18
};
// Journal Entry 19
let symptoms19 = new Map<string, number>();
symptoms19['Fatigue'] = 2;
symptoms19['Feeling sad or down'] = 2;
symptoms19['Inability to concentrate'] = 2;
let journalEntry19: JournalEntry = {
    hoursSleep: 8,
    exercise: false,
    meditate: false,
    symptoms: symptoms19
};
// Journal Entry 20
let symptoms20 = new Map<string, number>();
symptoms20['Fatigue'] = 4;
symptoms20['Feeling sad or down'] = 4;
symptoms20['Inability to concentrate'] = 4;
let journalEntry20: JournalEntry = {
    hoursSleep: 8,
    exercise: false,
    meditate: false,
    symptoms: symptoms20
};
// Journal Entry 21
let symptoms21 = new Map<string, number>();
symptoms21['Fatigue'] = 2;
symptoms21['Feeling sad or down'] = 2;
symptoms21['Inability to concentrate'] = 2;
let journalEntry21: JournalEntry = {
    hoursSleep: 7,
    exercise: true,
    meditate: false,
    symptoms: symptoms21
};
// Journal Entry 22
let symptoms22 = new Map<string, number>();
symptoms22['Fatigue'] = 1;
symptoms22['Feeling sad or down'] = 1;
symptoms22['Inability to concentrate'] = 1;
let journalEntry22: JournalEntry = {
    hoursSleep: 7,
    exercise: true,
    meditate: false,
    symptoms: symptoms22
};
// Journal Entry 23
let symptoms23 = new Map<string, number>();
symptoms23['Fatigue'] = 3;
symptoms23['Feeling sad or down'] = 3;
symptoms23['Inability to concentrate'] = 3;
let journalEntry23: JournalEntry = {
    hoursSleep: 10,
    exercise: true,
    meditate: true,
    symptoms: symptoms23
};
// Journal Entry 24
let symptoms24 = new Map<string, number>();
symptoms24['Fatigue'] = 2;
symptoms24['Feeling sad or down'] = 2;
symptoms24['Inability to concentrate'] = 2;
let journalEntry24: JournalEntry = {
    hoursSleep: 7,
    exercise: false,
    meditate: true,
    symptoms: symptoms24
};
// Journal Entry 25
let symptoms25 = new Map<string, number>();
symptoms25['Fatigue'] = 4;
symptoms25['Feeling sad or down'] = 4;
symptoms25['Inability to concentrate'] = 4;
let journalEntry25: JournalEntry = {
    hoursSleep: 8,
    exercise: true,
    meditate: true,
    symptoms: symptoms25
};
// Journal Entry 26
let symptoms26 = new Map<string, number>();
symptoms26['Fatigue'] = 2;
symptoms26['Feeling sad or down'] = 2;
symptoms26['Inability to concentrate'] = 2;
let journalEntry26: JournalEntry = {
    hoursSleep: 8,
    exercise: true,
    meditate: false,
    symptoms: symptoms26
};
// Journal Entry 27
let symptoms27 = new Map<string, number>();
symptoms27['Fatigue'] = 5;
symptoms27['Feeling sad or down'] = 5;
symptoms27['Inability to concentrate'] = 5;
let journalEntry27: JournalEntry = {
    hoursSleep: 7,
    exercise: true,
    meditate: false,
    symptoms: symptoms27
};
// Journal Entry 28
let symptoms28 = new Map<string, number>();
symptoms28['Fatigue'] = 2;
symptoms28['Feeling sad or down'] = 2;
symptoms28['Inability to concentrate'] = 2;
let journalEntry28: JournalEntry = {
    hoursSleep: 8,
    exercise: true,
    meditate: true,
    symptoms: symptoms28
};
// Journal Entry 29
let symptoms29 = new Map<string, number>();
symptoms29['Fatigue'] = 2;
symptoms29['Feeling sad or down'] = 2;
symptoms29['Inability to concentrate'] = 2;
let journalEntry29: JournalEntry = {
    hoursSleep: 9,
    exercise: true,
    meditate: true,
    symptoms: symptoms29
};
// Journal Entry 30
let symptoms30 = new Map<string, number>();
symptoms30['Fatigue'] = 2;
symptoms30['Feeling sad or down'] = 2;
symptoms30['Inability to concentrate'] = 2;
let journalEntry30: JournalEntry = {
    hoursSleep: 10,
    exercise: true,
    meditate: false,
    symptoms: symptoms30
};