import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";
import { JournalComponent } from "./journal/journal.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileEditComponent } from "./profile/edit/edit.component";
import { DiagnosesComponent } from "./profile/edit/diagnoses/diagnoses.component";
import { TreatmentsComponent } from "./profile/edit/treatments/treatments.component";
// Add more components to the declaration here

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        JournalComponent,
        ProfileComponent,
        ProfileEditComponent,
        DiagnosesComponent,
        TreatmentsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
