import { Component } from "@angular/core";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';

registerElement('CardView', () => CardView);

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    onSelectedIndexChanged(args: SelectedIndexChangedEventData): void {
        console.log(`Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`);
    }
 }
