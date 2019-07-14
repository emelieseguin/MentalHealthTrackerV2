import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { Slider } from "tns-core-modules/ui/slider";
import { AppStoreService } from "../services/app-store.service";
import { JournalEntry, JournalEntries } from "../models/journal.model";
import { UtilsService } from "../services";
import { Switch } from "tns-core-modules/ui/switch/switch";

class Symptom {
    name: string
    value: number
}

@Component({
    selector: "journal",
    templateUrl: "./journal.component.html",
    styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

    public userJournalEntries: JournalEntries;
    public userTrackedSymptoms: string[];
    public todaysJournalEntry: JournalEntry;
    symptomNames: Array<any>;
    
    constructor(private page: Page, private utils: UtilsService,
        private appStore: AppStoreService) {
        if (isAndroid) {
            this.page.actionBarHidden = true; 
        }
       
        this.userTrackedSymptoms = this.appStore.symptoms;
        this.userJournalEntries = this.appStore.journalEntries;
        this.todaysJournalEntry = this.appStore.journalEntries.entries[utils.getCurrentDateKey()];
        
        console.log();
        console.log('Journal Components');
        console.log('JSON of the Symptoms');
        console.log(JSON.stringify(this.userTrackedSymptoms));
        console.log('All Journal Entries:');
        console.log(JSON.stringify(this.userJournalEntries));
        console.log('Todays Journal Entry:');
        console.log(JSON.stringify(this.todaysJournalEntry));
    } 

    ngOnInit(): void {
    }

    valueChange(name:string, args) {
        let slider = <Slider>args.object;
        this.todaysJournalEntry.symptoms[name] = slider.value;
    }

    onExerciseChange(args) {
        let mySwitch = args.object as Switch;
        this.todaysJournalEntry.exercise = mySwitch.checked;
    }

    onMeditateChange(args) {
        let mySwitch = args.object as Switch;
        this.todaysJournalEntry.meditate = mySwitch.checked;
    }

    sleepValueChange(args) {
        let slider = <Slider>args.object;
        this.todaysJournalEntry.hoursSleep = slider.value;
        console.log(`Hours of Sleep: ${ this.todaysJournalEntry.hoursSleep }`); 
    }
}


        // this.symptomNames = new Array(this.appStore.symptoms.size);
        // for(let i = 0; i < this.appStore.symptoms.size; i++){
        //     this.symptomNames[i] = this.appStore.symptoms[i];
        // }
        // console.log('Foreach of symptoms ' + this.appStore.symptoms.size);

        // for(let entry in this.appStore.symptoms.entries){
        //     console.log(entry.toString); 
        // }

        // this.appStore.symptoms.forEach((k,v) => {
        //     console.log('key: =' + k.toString);
        //     this.symptomNames.push(k);
        // })
        // console.log('Array of symptoms');
        // console.log(this.symptomNames);      

        // console.log('Journal Entries For Today Stuff:');
        // console.log(JSON.stringify(this.userJournalEntries.entries[utils.getCurrentDateKey()]));

        // console.log('Journal Entries For Today Symptoms:');
        // console.log(JSON.stringify(this.userJournalEntries.entries[utils.getCurrentDateKey()].symptoms));

        // let elements: Symptom[] = JSON.parse(JSON.stringify(this.userJournalEntries.entries[utils.getCurrentDateKey()].symptoms))
        
        // console.log();console.log();
        // console.log(this.userTrackedSymptoms['Fatigue']);
        // this.userTrackedSymptoms['Fatigue'] = 4;
        // console.log(this.userTrackedSymptoms['Fatigue']);
        // console.log(this.userTrackedSymptoms.get('Fatigue'));


        // console.log('The actual array');
        // console.log(elements);

        // console.log(elements[0].name)
        // elements[1].value = 8;
        // elements[2].value = 8;
        // elements[3].value = 8;
        // elements[4].value = 8;

        // console.log('The final array');
        // console.log(elements);

        // console.log('Back to the map if possible');

        // this.userJournalEntries.entries[utils.getCurrentDateKey()].symptoms[elements[0].name] = elements[0].value;
        // console.log(JSON.stringify(this.userJournalEntries.entries[utils.getCurrentDateKey()].symptoms));



        // console.log(utils.getCurrentDateKey());
        // console.log(this.appStore.journalEntries.entries);
        // this.todaysJournalEntry = this.appStore.journalEntries.entries.get(utils.getCurrentDateKey());
        // console.log(this.todaysJournalEntry);
        // this.symptomNames = Array.from(this.todaysJournalEntry.symptoms.keys());