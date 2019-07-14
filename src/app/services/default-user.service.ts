import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { UserInfo } from "../models/user-info.model";
import { JournalEntries, JournalEntry } from "../models/journal.model";
import { UtilsService } from "./utils.service";
import { SelectMultipleControlValueAccessor } from "@angular/forms";

const DefaultUserInfo: UserInfo = {
    firstName: 'n/a',
    lastName: 'n/a',
    age: 0,
    sex: 'unknwon',
    email: 'unknown@email.com',
    diagnoses: [
        {diagnosed: true, name: "No formal diagnosis"},
        {diagnosed: false, name: "Generalized Anxiety Disorder (GAD)"},
        {diagnosed: false, name: "Panic Disorder"},
        {diagnosed: false, name: "Social Anxiety Disorder"},
        {diagnosed: false, name: "Specific Phobias"},
        {diagnosed: false, name: "Post-Traumatic Stress Disorder (PTSD)"},
        {diagnosed: false, name: "Major Depression"},
        {diagnosed: false, name: "Seasonal Affective Disorder (SAD)"},
        {diagnosed: false, name: "Peripartum (Postpartum) Depression"},
        {diagnosed: false, name: "Premenstrual Dysphoric Disorder (PMDD)"},
        {diagnosed: false, name: "Atypical Depression"},
        {diagnosed: false, name: "Persistent Depressive Disorder"}
    ],
    treatments: [
        {undergoing: true, name: "None"},
        {undergoing: false, name: "Cognitive Behavioural Therapy (CBT)"}, 
        {undergoing: false, name: "Mindfulness Meditation"},
        {undergoing: false, name: "Interpersonal Therapy (IPT)"},
        {undergoing: false, name: "Counselling"},
        {undergoing: false, name: "Buspirone"},
        {undergoing: false, name: "Selective Serotonin Reuptake Inhibitors (SSRIs)"},
        {undergoing: false, name: "Serotonin and Norepinephrine Reuptake Inhibitors (SNRIs)"},
        {undergoing: false, name: "Irreversible Monoamine Oxidase Inhibitors"},
        {undergoing: false, name: "Benzodiazepines"},
        {undergoing: false, name: "Tricyclics (TCAs)"},
    ]
};

let DefaultEntry: JournalEntry = {
  hoursSleep: 8,
  exercise: false,
  meditate: false,
  symptoms: new Map<string, number>()
}

let DefaultJournalEntries: JournalEntries = {
  entries: new Map<string, JournalEntry>()
}

@Injectable()
export class DefaultUserService {

  constructor(private utils: UtilsService){
  }
  
  getNewUserInfo(): UserInfo {
    return DefaultUserInfo;
  }

  getDefaultJournalEntry(userSymptoms: string[]): JournalEntry {
    let entry = DefaultEntry;
    // could also just pull this from the actual app store and not pass through
    entry.symptoms = this.getSymptomsMapFromArray(userSymptoms);
    return entry;
  }

  // Pass in the list of user symptoms that are to be tracked
  getDefaultJournalEntries(userSymptoms: string[]): JournalEntries {
    let thing = DefaultJournalEntries;
    thing.entries[this.utils.getCurrentDateKey()] = this.getDefaultJournalEntry(userSymptoms);
    console.log();
    console.log('Object::');
    console.log(JSON.stringify(thing))
    return DefaultJournalEntries;
  }

  getDefaultSymptomsArray(): string[] {
    return ['Fatigue', 
    'Feeling sad or down', 
    'Inability to concentrate',
    'Mood swings',
    'Irritability',
    'Headache',
    'Apathy',
    'Lack of motivation'
    ];
  }

  getSymptomsMapFromArray(symptoms: string[]): Map<string, number> {

    let symptomsMap = new Map<string, number>();

    symptoms.forEach(element => {
        console.log(element);
        symptomsMap[element] = 5;
    });

    console.log('Creation of the map');
    console.log(JSON.stringify(symptomsMap));
    

        // symptoms.set('Feeling sad or down', 0);
        // symptoms.set('Inability to concentrate', 0);
        // symptoms.set('Mood swings', 0);
        // symptoms.set('Irritability', 0);
        // symptoms.set('Headache', 0);
        // symptoms.set('Apathy', 0);
        // symptoms.set('Lack of motivation', 0);
    return symptomsMap;
  }

  getDefaultGraphedSymptoms(sypmtoms: string[]): Map<string, boolean> {
    let symptomsGraphedMap = new Map<string, boolean>();
        sypmtoms.forEach(element => {
          
          // By default only will graph the first users symptom
          if(element == sypmtoms[0]){
            symptomsGraphedMap[element] = true;
          } else {
            symptomsGraphedMap[element] = false;
          } 
      });

      return symptomsGraphedMap;
  }
}