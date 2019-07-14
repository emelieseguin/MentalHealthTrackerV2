import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { UserInfo } from "../models/user-info.model";

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

@Injectable()
export class DefaultUserService {
  
  getNewUserInfo(): UserInfo {
    return DefaultUserInfo;
  }
}