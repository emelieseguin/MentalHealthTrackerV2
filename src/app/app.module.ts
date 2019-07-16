import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { BackendService, FirebaseService, UtilsService } from "./services";
import { LoginComponent } from "./login/login.component";
import { StatAnalysisService } from "./services/stat-analysis.service";
import { MainRoutingModule } from "./main/main-routing.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppStoreService } from "./services/app-store.service";
import { DefaultUserService } from "./services/default-user.service";

@NgModule({
    bootstrap: [
        AppComponent 
    ],
    providers: [
        BackendService,
        FirebaseService,
        UtilsService,
        StatAnalysisService,
        AppStoreService,
        DefaultUserService
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
