import { Injectable } from '@angular/core';
import { UserInfo } from "../models/user-info.model";
import { knownFolders, File, Folder } from "tns-core-modules/file-system";
import { JournalEntries } from "../models/journal.model";
import { User } from '../profile/edit/edit.component';
import { JsonPipe } from '@angular/common';
import { AppStoreService } from './app-store.service';
import { DefaultUserService } from './default-user.service';
import { UtilsService } from './utils.service';
import { StatAnalysisService } from './stat-analysis.service';


const FolderName = 'files';
const GraphedSymptomsFile: string = 'graphed-symptoms.json';
const JournalEntriesFile: string = 'journalentries.json';
const SymptomsFile: string = 'symptoms.json';
const UserInfoFile: string = 'userinfo.json';
const RootEmail: string = 'emelieseguin@gmail.com';


// ----- From the AppStore Itself
// @Injectable()
// export class AppStoreService {
    
//     userInfo: UserInfo;
//     journalEntries: JournalEntries;
//     symptoms: string[]; 
//     graphedSymptoms: Map<string, boolean>;
// }

@Injectable({
    providedIn: 'root',
})
export class DataService {

    public documents = knownFolders.documents();
    public folder = this.documents.getFolder(FolderName);
    public userInfoFile = this.folder.getFile(UserInfoFile);
    public journalEntriesFile = this.folder.getFile(JournalEntriesFile);
    public symptomFile = this.folder.getFile(SymptomsFile);

    constructor(private appStore: AppStoreService, 
        private defaultUser: DefaultUserService,
        private utils: UtilsService,
        private statService: StatAnalysisService){

    }

    // Store User Info
    storeUserInfo(userInfo: UserInfo){

        if(userInfo.email != RootEmail)
        {
            return;
        }

        console.log(JSON.stringify(userInfo));
        this.userInfoFile.writeText(JSON.stringify(userInfo))
            .then(result => {
                console.log('Updated User info in database.');
            }
                
                ).catch(err => {
                    console.log('Could not update info.');
                });
    }

    // Pull User Info
    pullUserInfo(email: string) {

        if(email == RootEmail) {
            console.log(`User is: ${RootEmail}`);

            this.userInfoFile.readText()
            .then(result => {
                console.log('Pulled data from database.');
                console.log(result);
                // If the user exists -- the return their info TODO
                let user: UserInfo = JSON.parse(result);
                console.log('Parsed.');
                console.log(JSON.stringify(user));

                if(user.email == RootEmail){
                    this.appStore.userInfo = user;
                    return;
                }
            }
                ).catch(err => {
                    console.log('Could not read info from database. -- User');
                });
        } 
        this.appStore.userInfo = this.defaultUser.getNewUserInfo();
        this.appStore.userInfo.email = email;
    }

    // Store Journal Entries
    storeJournalEntries(email: string, journalEntries: JournalEntries){

        if(email != RootEmail)
        {
            return;
        }

        console.log(JSON.stringify(journalEntries));
        this.journalEntriesFile.writeText(JSON.stringify(journalEntries))
            .then(result => {
                console.log('Updated User info in database -- with Journal Entries.');
            }
                
                ).catch(err => {
                    console.log('Could not update info on Journal Entries.');
                });
    }
    
    // Pull Journal Entries
    pullJournalEntries(email: string) {

        if(email == RootEmail) {

            this.journalEntriesFile.readText()
            .then(result => {
                console.log('Pulled data from database.');
                console.log(result);
                // If the user exists -- the return their info TODO
                let journalEntries: JournalEntries = JSON.parse(result);
                console.log('I parsed');
                if(journalEntries){
                    this.appStore.journalEntries = journalEntries;
                    this.addTodaysEntryIfNeeded()
                    return;
                } 
            }
                ).catch(err => {
                    console.log('Could not read info from database. -- journal');
                    this.appStore.journalEntries = this.statService.getData();
                    this.storeJournalEntries(RootEmail, this.appStore.journalEntries);
                });
        } else {
            this.appStore.journalEntries = this.defaultUser.getDefaultJournalEntries(this.defaultUser.getDefaultSymptomsArray());
            this.addTodaysEntryIfNeeded()
        }

        console.log(JSON.stringify(this.appStore.journalEntries))
    }

    addTodaysEntryIfNeeded(){
        if( this.appStore.journalEntries.entries[this.utils.getCurrentDateKey()]){
        } else {
            this.appStore.journalEntries.entries[this.utils.getCurrentDateKey()] = this.defaultUser.getDefaultJournalEntry(this.defaultUser.getDefaultSymptomsArray());
        }
    }

    // Store Symptoms
    storeSymptoms(email: string, symptoms: string[]){

        if(email != RootEmail)
        {
            return;
        }

        this.symptomFile.writeText(JSON.stringify(symptoms))
            .then(result => {
                console.log('Updated symptoms info in database.');
            }
                
                ).catch(err => {
                    console.log('Could not update info.');
                });
    }

    // Pull Symptoms
    pullSymptoms(email: string) {

        if(email == RootEmail) {

            this.symptomFile.readText()
            .then(result => {
                let symptoms: string[] = JSON.parse(result);
                // console.log('Parsed.');
                // console.log(JSON.stringify(user));

                if(email == RootEmail){
                    this.appStore.symptoms = symptoms;
                    return;
                }
            }
                ).catch(err => {
                    console.log('Could not read info from database. -- Symptoms');
                });
        } 

        this.appStore.symptoms = this.defaultUser.getDefaultSymptomsArray();
    }


}