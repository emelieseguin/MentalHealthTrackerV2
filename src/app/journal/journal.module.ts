import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { JournalComponent } from "./journal.component";
import { JournalRoutingModule } from "./journal-routing.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        JournalRoutingModule
    ],
    declarations: [
        JournalComponent,
        
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class JournalModule { }
