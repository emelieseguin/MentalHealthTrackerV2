import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { getComputedCssValues } from "tns-core-modules/ui/page/page";
import { JournalEntries, JournalEntry } from "../models/journal.model";
import { UtilsService } from "./utils.service";





@Injectable()
export class StatAnalysisService {

    constructor(private utils: UtilsService) {

    }
  
    private numberOfRecentPointsToCompare = 30;
    private values = [1,2,3,4,5,6,7,8,9,10,6,7,8,2,5,6,7,8,9,2,4,6,7,8,2,4,6,3,6,8,9,3,6,7,8,3,2,5];
    private arraySum = 0;

    doStats() : string {

        this.arraySum = this.values.reduce((a, b) => a + b, 0)
        console.log(this.arraySum);

        // Stats stuff
        this.values.forEach(element => {
            

        });
        return 'stats stuff......';
    }


    otherStats() : string {

        return 'other stats stuff.....';
    }

    getData(): JournalEntries {

        // Big entry where everything exists
        let definedEntries = new Map<string, JournalEntry>();
        definedEntries.entries[this.utils.getSpecificDateKey(0)] = journalEntry1;

        // definedEntries.entries[this.utils.getSpecificDateKey(1)] = journalEntry2;

        return {entries: definedEntries };
    }
}

// Journal Entry 1
let symptoms1 = new Map<string, number>();
symptoms1['Fatigue'] = 4
symptoms1['Feeling sad or down'] = 7;
symptoms1['Inability to concentrate'] = 8;
let journalEntry1: JournalEntry = {
    hoursSleep: 8,
    exercise: true,
    meditate: false,
    symptoms: symptoms1
};