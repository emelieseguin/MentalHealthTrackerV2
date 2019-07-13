import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";

import { JournalComponent } from "../journal/journal.component";
import { ProfileComponent } from "../profile/profile.component";
import { ProfileEditComponent } from "../profile/edit/edit.component";
import { DiagnosesComponent } from "../profile/edit/diagnoses/diagnoses.component";
import { TreatmentsComponent } from "../profile/edit/treatments/treatments.component";

const routes: Routes = [
    { 
        path: "", 
        redirectTo: "profile", 
        pathMatch: "full" },
    {
        path: "profile/edit/diagnoses",
        component: DiagnosesComponent, 
    },
    {
        path: "profile/edit/treatments",
        component: TreatmentsComponent, 
    },
    {
        path: "profile/edit",
        component: ProfileEditComponent, 
    },
    {
        path: "profile",
        component: ProfileComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)], 
    exports: [NativeScriptRouterModule]
})
export class ProfileRoutingModule { }