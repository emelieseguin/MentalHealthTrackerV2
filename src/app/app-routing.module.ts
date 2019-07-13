import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";


import { LoginComponent } from "./login/login.component";


// Add components here, add them to the route
// The outlet simply shows where the component is to be placed when the path matches

const routes: Routes = [

    // Login
    {path: "", redirectTo: "/login", pathMatch: "full"},
    { path: "login", component: LoginComponent },

    // main = tabs here 
    { path: "main", loadChildren: "./main/main.module#MainModule"},

    // Main portion of the app
    // 
]

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
