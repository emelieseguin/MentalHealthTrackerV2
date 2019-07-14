import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { HomeComponent } from "../home/home.component";
import { JournalComponent } from "../journal/journal.component";
import { ProfileComponent } from "../profile/profile.component";
import { ProfileEditComponent } from "../profile/edit/edit.component";
import { DiagnosesComponent } from "../profile/edit/diagnoses/diagnoses.component";
import { TreatmentsComponent } from "../profile/edit/treatments/treatments.component";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular/chart-directives";
import { NativeScriptUIDataFormModule } from "nativescript-ui-dataform/angular/dataform-directives";
import { TNSCheckBoxModule } from "nativescript-checkbox/angular";
import { DefaultUserService } from "../services/default-user.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forChild([
            {
                path: "default", component: MainComponent, children: [
                    {
                        path: "home",
                        outlet: "homeTab",
                        component: HomeComponent,
                    },
                    {
                        path: "journal",
                        outlet: "journalTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: "../journal/journal.module#JournalModule"
                    },
                    {
                        path: "profile",
                        outlet: "profileTab",
                        component: NSEmptyOutletComponent,
                        loadChildren: "../profile/profile.module#ProfileModule"
                    }
                ]
            }
        ]),
    NativeScriptUIChartModule,
    NativeScriptUIDataFormModule,
    TNSCheckBoxModule,  
    ],
    declarations: [
        MainComponent,

        HomeComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
         
    ]
})
export class MainModule { }
