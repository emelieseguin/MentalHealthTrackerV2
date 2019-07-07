import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home/home.component";
import { JournalComponent } from "./journal/journal.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileEditComponent } from "./profile/edit/edit.component";
import { DiagnosesComponent } from "./profile/edit/diagnoses/diagnoses.component";
import { TreatmentsComponent } from "./profile/edit/treatments/treatments.component";
import { LoginComponent } from "./login/login.component";
// Add components here, add them to the route
// The outlet simply shows where the component is to be placed when the path matches

const routes: Routes = [
    { path: "", redirectTo: "/(home:home//journal:journal//profile:profile)", pathMatch: "full" },
    { path: "home", component: HomeComponent, outlet: "home" },
    { path: "journal", component: JournalComponent, outlet: "journal"  },

    { path: "profile/edit/diagnoses", component: DiagnosesComponent, outlet: "profile"  },
    { path: "profile/edit/treatments", component: TreatmentsComponent, outlet: "profile"  },
    { path: "profile/edit", component: ProfileEditComponent, outlet: "profile"  },
    { path: "profile", component: ProfileComponent, outlet: "profile"  },

    { path: "login", component: LoginComponent, outlet: "journal" },



];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
