import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ProfileEditComponent } from "./edit/edit.component";
import { DiagnosesComponent } from "./edit/diagnoses/diagnoses.component";
import { TreatmentsComponent } from "./edit/treatments/treatments.component";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent,
        DiagnosesComponent,
        TreatmentsComponent,
        ProfileEditComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProfileModule { }
