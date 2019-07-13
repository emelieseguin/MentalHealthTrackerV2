import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { Switch } from "tns-core-modules/ui/switch";
import { EventData } from "tns-core-modules/data/observable";

interface Checkbox {
    checkbox1: boolean
    checkbox2: boolean
}

const Treatments : Treatment[] = [
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
];

class Treatment {
    undergoing: boolean;
    name: string;
}


@Component({
    selector: "treatments",
    templateUrl: "./treatments.component.html",
    styleUrls: ['./treatments.component.css']
})
export class TreatmentsComponent implements OnInit {

    private treatmentCheckboxes: Checkbox;
    userTreatments = Treatments;

    constructor(private page: Page, private routerExtensions: RouterExtensions) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }

        this.treatmentCheckboxes = {
            checkbox1: true,
            checkbox2: true
        };
    }

    goBack(): void {
        this.routerExtensions.back();
    }

    ngOnInit(): void {
    }

    onCheckedChange(toggledTreatmentName:string, args: EventData): void {
        let mySwitch = args.object as Switch;

        this.userTreatments.forEach(element => {
            if(element.name == toggledTreatmentName){
                element.undergoing = mySwitch.checked;

                console.log(`Name: ${element.name}  Undergoing: ${element.undergoing}`);
            }
        });

        
    }
}