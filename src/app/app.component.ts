import { Component } from "@angular/core";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { BackendService } from "./services/backend.service";
// import * as firebase from "nativescript-plugin-firebase";

registerElement('CardView', () => CardView);

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    ngOnInit() {
        
        // firebase.init({
        //     //persist should be set to false as otherwise numbers aren't returned during livesync
        //     persist: false,
        //     storageBucket: 'gs://mentalhealthtracker-2019.appspot.com',
        //     onAuthStateChanged: (data: any) => {
        //     console.log(JSON.stringify(data))
        //     console.log("got here");
        //     if (data.loggedIn) {
        //         BackendService.token = data.user.uid;
        //     }
        //     else {
        //         BackendService.token = "";
        //     }
        //     }
        // }).then(
        //     function (instance) {
        //     console.log("firebase.init done");
        //     },
        //     function (error) {
        //     console.log("firebase.init error: " + error);
        //     }
        //     );
      }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData): void {
        console.log(`Selected index has changed ( Old index: ${args.oldIndex} New index: ${args.newIndex} )`);
    }

    // ngOnDestory(){
    //     firebase.
    // }
 }
