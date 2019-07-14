import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { UserInfo } from "../models/user-info.model";
import { JournalEntries } from "../models/journal.model";

@Injectable()
export class AppStoreService {
    
    userInfo: UserInfo;
    journalEntries: JournalEntries;
    symptoms: string[]; 
    graphedSymptoms: Map<string, boolean>;
}