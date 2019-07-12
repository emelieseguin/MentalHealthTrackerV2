import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { getComputedCssValues } from "tns-core-modules/ui/page/page";


@Injectable()
export class StatAnalysisService {
  
    private numberOfRecentPointsToCompare = 30;
    private values = [1,2,3,4,5,6,7,8,9,10,6,7,8,2,5,6,7,8,9,2,4,6,7,8,2,4,6,3,6,8,9,3,6,7,8,3,2,5];
    private arraySum = 0;

    doStats() : string {

        this.arraySum = this.values.reduce((a, b) => a + b, 0)
        console.log(this.arraySum);

        // Stats stuff
        this.values.forEach(element => {
            

        });
        return 'stats stuff......';
    }


    otherStats() : string {

        return 'other stats stuff.....';
    }
}