import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { Slider } from "tns-core-modules/ui/slider";
import { AppStoreService } from "../services/app-store.service";
import { JournalEntry, JournalEntries } from "../models/journal.model";
import { UtilsService } from "../services";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { DataService } from "../services/data.service";

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
    public journalTrackedSymptoms: Array<string>;
    public todaysJournalEntry: JournalEntry;
    public userGraphedSymptoms: Map<string, boolean>;
    dialogOpen: boolean;
    newTrackedSymptom: string = '';
    
    constructor(private page: Page, private utils: UtilsService,
        private appStore: AppStoreService, private dataService: DataService) {
        if (isAndroid) {
            this.page.actionBarHidden = true; 
        }
       
        this.journalTrackedSymptoms = this.appStore.symptoms;
        this.userJournalEntries = this.appStore.journalEntries;
        this.todaysJournalEntry = this.appStore.journalEntries.entries[utils.getCurrentDateKey()];
        this.userGraphedSymptoms = this.appStore.graphedSymptoms;

        console.log();
        console.log('Journal Components');
        console.log('JSON of the Symptoms');
        console.log(JSON.stringify(this.journalTrackedSymptoms));
        console.log('All Journal Entries:');
        console.log(JSON.stringify(this.userJournalEntries));
        console.log('Todays Journal Entry:');
        console.log(JSON.stringify(this.todaysJournalEntry));
        console.log('Todays Graphed Symptoms:');
        console.log(JSON.stringify(this.userGraphedSymptoms));

        console.log(this.userGraphedSymptoms['Fatigue']);
    } 

    ngOnInit(): void {
    }
    
    showDialog() {
        this.dialogOpen = true;
        // console.log("Edit pressed");
    }

    closeDialog() {
        this.dialogOpen = false;
    }

    valueChange(name:string, args) {
        let slider = <Slider>args.object;
        this.todaysJournalEntry.symptoms[name] = slider.value;
    }

    onExerciseChange(args) {
        let mySwitch = args.object as Switch;
        this.todaysJournalEntry.exercise = mySwitch.checked;
        // this.appStore.journalEntries.entries[this.utils.getCurrentDateKey()].exercise = mySwitch.checked;
    }

    onMeditateChange(args) {
        let mySwitch = args.object as Switch;
        this.todaysJournalEntry.meditate = mySwitch.checked;
        // this.appStore.journalEntries.entries[this.utils.getCurrentDateKey()].meditate = mySwitch.checked;
    }

    updateNewSymptomValue(args) {
        let textField = <TextField>args.object;

        console.log(`Old Name:  ${this.newTrackedSymptom}   New Name: ${textField.text}`);
        this.newTrackedSymptom = textField.text;
    }

    saveNewSymptomValue() {
        if(this.newTrackedSymptom != ''){
            this.journalTrackedSymptoms.push(this.newTrackedSymptom);
            this.userGraphedSymptoms[this.newTrackedSymptom] = false;
        }

        // refresh the field as it has already been added
        this.newTrackedSymptom = '';
    }

    sleepValueChange(args) {
        let slider = <Slider>args.object;
        this.todaysJournalEntry.hoursSleep = slider.value;
        console.log(`Hours of Sleep: ${ this.todaysJournalEntry.hoursSleep }`); 
    }

    onTrackSymptomChange(symptom: string, arg) {
        let mySwitch = arg.object as Switch;

        console.log();
        console.log(symptom);
        console.log(`Array before removing: ${this.journalTrackedSymptoms}`);

        // remove the element the user selected
        let index = this.journalTrackedSymptoms.indexOf(symptom);
        console.log('Some index: '+ index);
        if(index > -1){
            this.journalTrackedSymptoms.splice(index, 1);
        }


        console.log(`Array after removin; ${this.journalTrackedSymptoms}`);
        console.log(`In the store; ${this.appStore.symptoms}`);
    }

    saveToDatabase(){
        this.dataService.storeJournalEntries(this.appStore.userInfo.email, this.appStore.journalEntries);
    }
}