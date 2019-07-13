import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { Switch } from "tns-core-modules/ui/switch";
import { EventData } from "tns-core-modules/data/observable";
import { Diagnosis } from "~/app/models/user-info.model";


const Diagnoses : Diagnosis[] = [
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
];



@Component({
    selector: "diagnoses",
    templateUrl: "./diagnoses.component.html",
    styleUrls: ['./diagnoses.component.css']
})
export class DiagnosesComponent implements OnInit {

    userDiagnoses = Diagnoses;

    constructor(private page: Page, private routerExtensions: RouterExtensions) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
    }

    goBack(): void {
        this.routerExtensions.back();
    }

    ngOnInit(): void {
    }
    onCheckedChange(toggledDiagnosisName:string, args: EventData): void {
        let mySwitch = args.object as Switch;

        this.userDiagnoses.forEach(element => {
            if(element.name == toggledDiagnosisName){
                element.diagnosed = mySwitch.checked;

                console.log(`Name: ${element.name}  Diagnosed: ${element.diagnosed}`);
            }
        });

        
    }
}