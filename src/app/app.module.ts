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
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";

import { BackendService, FirebaseService, UtilsService } from "./services";
import { LoginComponent } from "./login/login.component";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    providers: [
        BackendService,
        FirebaseService,
        UtilsService,
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUIChartModule,
        
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        JournalComponent,
        ProfileComponent,
        ProfileEditComponent,
        DiagnosesComponent,
        TreatmentsComponent,
        LoginComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
