import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";

import { JournalComponent } from "../journal/journal.component";

const routes: Routes = [
    { 
        path: "", 
        redirectTo: "journal", 
        pathMatch: "full" },
    {
        path: "journal",
        component: JournalComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)], 
    exports: [NativeScriptRouterModule]
})
export class JournalRoutingModule { }