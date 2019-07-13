import { Component, OnInit } from "@angular/core";
import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { BackendService } from "./services/backend.service";
import * as firebase from "nativescript-plugin-firebase";

import { displayedEvent, exitEvent, launchEvent, lowMemoryEvent, 
    orientationChangedEvent, resumeEvent, suspendEvent, uncaughtErrorEvent, 
    ApplicationEventData, LaunchEventData, OrientationChangedEventData, UnhandledErrorEventData,
    on as applicationOn, run as applicationRun } from "tns-core-modules/application";

registerElement('CardView', () => CardView);

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    shouldFireBaseInit: boolean = true;
    ngOnInit() {
        applicationOn(launchEvent, (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android.content.Intent class.
                console.log("Launched Android application with the following intent: " + args.android + ".");
            } else if (args.ios !== undefined) {
                // For iOS applications, args.ios is NSDictionary (launchOptions).
                console.log("Launched iOS application with options: " + args.ios);
            }
          });
          
          applicationOn(suspendEvent, (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("SUSPEND Activity: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
          });
          
          applicationOn(resumeEvent, (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("RESUMEVENT Activity: " + args.android);
                // set this to false
                this.shouldFireBaseInit = false;
            } else if (args.ios) {
                // probably add it here as well for ios
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
          });

          if(this.shouldFireBaseInit)
            {
                firebase.init({
                    // persist should be set to false as otherwise numbers aren't returned during livesync
                    persist: false,
                    storageBucket: 'gs://mentalhealthtracker-2019.appspot.com',
                    onAuthStateChanged: (data)  => { // optional but useful to immediately re-logon the user when he re-visits your app
                    console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                if (data.loggedIn) {
                    BackendService.token = data.user.uid;
                }
                else {
                    BackendService.token = "";
                }
                }
            }).then(
                function (instance) {
                console.log("firebase.init done");
                },
                function (error) {
                console.log("firebase.init error: " + error);
                }
                );
        }
    }

    // constructor() {
    //     console.log("got here");
    //     firebase.init({
    //         //persist should be set to false as otherwise numbers aren't returned during livesync
    //         persist: false,
    //         storageBucket: 'gs://mentalhealthtracker-2019.appspot.com',
    //         onAuthStateChanged: (data: any) => {
    //         console.log(JSON.stringify(data))
    //         console.log("got here");
    //         if (data.loggedIn) {
    //             BackendService.token = data.user.uid;
    //         }
    //         else {
    //             BackendService.token = "";
    //         }
    //         }
    //     }).then(
    //         function (instance) {
    //         console.log("firebase.init done");
    //         },
    //         function (error) {
    //         console.log("firebase.init error: " + error);
    //         }
    //         );
    //   }

    

    // ngOnDestory(){
    //     firebase.
    // }
 }
