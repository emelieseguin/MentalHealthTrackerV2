import { Component, OnInit } from "@angular/core";
import { isAndroid, Page, EventData } from "tns-core-modules/ui/page/page";
import { DefaultUserService } from "../services/default-user.service";
import { AppStoreService } from "../services/app-store.service";
import { UserInfo, Treatment, Diagnosis } from "../models/user-info.model";

@Component({
    selector: "profile",
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser: UserInfo;
    currentActiveTreatments: string[];

    constructor(private page: Page, private defaultUserService: DefaultUserService,
        private appStore: AppStoreService) {
        if (isAndroid) {
            this.page.actionBarHidden = true;
        }
        this.currentUser = appStore.userInfo;
    }

    getActiveTreatments() {

        this.currentUser.treatments.forEach(element => {
            if(element.undergoing){
                
            }
        });
    };

    treatmentSelector(item: Treatment, index: number, items: Treatment[]){
        console.log(item.name);
        if(item.undergoing){
            // console.log('here once');
            return 'true';
            
        } else{
            // console.log('i failed');
            return 'false';
            
        }
    }

    diagnosisSelector(item: Diagnosis, index: number, items: Diagnosis[]){
        console.log(item.name);
        if(item.diagnosed){
            // console.log('here once');
            return 'true';
            
        } else{
            // console.log('i failed');
            return 'false';
            
        }
    }


    ngOnInit(): void {

    }
}