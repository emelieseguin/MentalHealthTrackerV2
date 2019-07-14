import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { UserInfo } from "../models/user-info.model";
import { JournalEntries, JournalEntry } from "../models/journal.model";
import { UtilsService } from "./utils.service";

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

  getDefaultJournalEntry(userSymptoms: Map<string, number>): JournalEntry {
    let entry = DefaultEntry;
    // could also just pull this from the actual app store and not pass through
    entry.symptoms = userSymptoms;
    return 
  }

  // Pass in the list of user symptoms that are to be tracked
  getDefaultJournalEntries(userSymptoms: Map<string, number>): JournalEntries {
    DefaultEntry[this.utils.getCurrentDateKey()] = this.getDefaultJournalEntry(userSymptoms);
    return DefaultJournalEntries;
  }

  getDefaultSymptoms(): Map<string, number> {
    let symptoms = new Map<string, number>();
        symptoms['Fatigue'] = 0;
        symptoms['Feeling sad or down'] = 0;
        symptoms['Inability to concentrate'] = 0;0
        symptoms['Mood swings'] = 0;
        symptoms['Irritability'] = 0;
        symptoms['Headache'] = 0;
        symptoms['Apathy'] = 0;
        symptoms['Lack of motivation'] = 0;
    return symptoms;
  }
}