import { Component, OnInit } from "@angular/core";
import { isAndroid, Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";

interface Checkbox {
    checkbox1: boolean
    checkbox2: boolean
}

const Treatments : Treatment[] = [
    {undergoing: true, thing: "None"},
    {undergoing: true, thing: "Cognitive Behavioural Therapy (CBT)"},
    {undergoing: true, thing: "Mindfulness Meditation"},
    {undergoing: true, thing: "Interpersonal Therapy (IPT)"},
    
// TODO: Em do this

    // "Counselling",
    // "Buspirone",
    // "Selective Serotonin Reuptake Inhibitors (SSRIs)",
    // "Serotonin and Norepinephrine Reuptake Inhibitors (SNRIs)",
    // "Irreversible Monoamine Oxidase Inhibitors",
    // "Benzodiazepines",
    // "Tricyclics (TCAs)"
];

class Treatment {
    undergoing: boolean;
    thing: string;
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
}