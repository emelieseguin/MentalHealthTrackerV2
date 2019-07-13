import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";

import { HomeComponent } from "../home/home.component"; 
import { JournalComponent } from "../journal/journal.component";
import { ProfileComponent } from "../profile/profile.component";
import { ProfileEditComponent } from "../profile/edit/edit.component";
import { DiagnosesComponent } from "../profile/edit/diagnoses/diagnoses.component";
import { TreatmentsComponent } from "../profile/edit/treatments/treatments.component";
import { LoginComponent } from "../login/login.component";
import { MainComponent } from "./main.component";
// Add components here, add them to the route
// The outlet simply shows where the component is to be placed when the path matches

const routes: Routes = [

    {path: "default", component: MainComponent, children:[

        //  Might need this to actually load the children and shit idk
        {
            path: "home",
            outlet: "homeTab",
            component: HomeComponent,
        },
        {
            path: "journal",
            outlet: "journalTab",
            component: JournalComponent,
        },
        
    ]}


    // { path: "", redirectTo:"/(homeTab:main/home//journalTab:main/journal//profileTab:main/profile)", pathMatch: "full" },
    // // { path: "", redirectTo: "main/profile", pathMatch: "full" },
    // { path: "main/home", component: HomeComponent, outlet: "homeTab" },
    // { path: "main/journal", component: JournalComponent, outlet: "journalTab"  },

    // { path: "main/profile/edit/diagnoses", component: DiagnosesComponent, outlet: "profileTab"  },
    // { path: "main/profile/edit/treatments", component: TreatmentsComponent, outlet: "profileTab"  },
    // { path: "main/profile/edit", component: ProfileEditComponent, outlet: "profileTab"  },
    // { path: "main/profile", component: ProfileComponent, outlet: "profileTab" },
];

@NgModule({
    imports: [NativeScriptRouterModule, NativeScriptRouterModule.forChild(routes)], 
    exports: [NativeScriptRouterModule]
})
export class MainRoutingModule { }