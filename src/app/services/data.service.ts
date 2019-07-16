import { Injectable } from '@angular/core';
import { UserInfo } from "../models/user-info.model";
import { knownFolders, File, Folder } from "tns-core-modules/file-system";
import { JournalEntries } from "../models/journal.model";
import { User } from '../profile/edit/edit.component';
import { JsonPipe } from '@angular/common';
import { AppStoreService } from './app-store.service';
import { DefaultUserService } from './default-user.service';
import { UtilsService } from './utils.service';


const FolderName = 'files';
const GraphedSymptomsFile: string = 'graphed-symptoms.json';
const JournalEntriesFile: string = 'journal-entires.json';
const SymptomsFile: string = 'symptoms.json';
const UserInfoFile: string = 'user-info.json';
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
    public symptomFile = this.folder.getFile(UserInfoFile);
    public journalEntriesFile = this.folder.getFile(JournalEntriesFile);

    constructor(private appStore: AppStoreService, 
        private defaultUser: DefaultUserService,
        private utils: UtilsService){

    }

    // Store User Info
    storeUserInfo(userInfo: UserInfo){

        if(userInfo.email != RootEmail)
        {
            return;
        }

        console.log(JSON.stringify(userInfo));
        this.symptomFile.writeText(JSON.stringify(userInfo))
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

            this.symptomFile.readText()
            .then(result => {
                // console.log('Pulled data from database.');
                // console.log(result);
                // If the user exists -- the return their info TODO
                let user: UserInfo = JSON.parse(result);
                // console.log('Parsed.');
                // console.log(JSON.stringify(user));

                let actualUser: UserInfo = {
                    email: RootEmail,
                    firstName: user.firstName,
                    lastName:  user.lastName,
                    sex: user.sex,
                    age: user.age,
                    diagnoses: user.diagnoses,
                    treatments: user.treatments
                    
                };

                if(user.email == RootEmail){
                    this.appStore.userInfo = actualUser;
                    return;
                }
            }
                ).catch(err => {
                    console.log('Could read info from database.');
                });
        } else {
            this.appStore.userInfo = this.defaultUser.getNewUserInfo();
            this.appStore.userInfo.email = email;
        }
    }

        // Store User Info
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
    
        // Pull User Info
        pullJournalEntries(email: string) {
    
            if(email == RootEmail) {
    
                this.journalEntriesFile.readText()
                .then(result => {
                    console.log('Pulled data from database.');
                    console.log(result);
                    // If the user exists -- the return their info TODO
                    let journalEntries: JournalEntries = JSON.parse(result);

                    if(journalEntries){
                        this.appStore.journalEntries = journalEntries;
                        this.addTodaysEntryIfNeeded()
                        return;
                    }
                }
                    ).catch(err => {
                        console.log('Could read info from database.');
                    });
            } else {
                this.appStore.journalEntries = this.defaultUser.getDefaultJournalEntries(this.defaultUser.getDefaultSymptomsArray());
                this.addTodaysEntryIfNeeded()
            }
        }

        addTodaysEntryIfNeeded(){
            if( this.appStore.journalEntries.entries[this.utils.getCurrentDateKey()]){
                console.log('');
                console.log('');
                console.log('exists');
                console.log('');
                console.log('');
            } else {
                console.log('does not exists');
                this.appStore.journalEntries.entries[this.utils.getCurrentDateKey()] = this.defaultUser.getDefaultJournalEntry(this.defaultUser.getDefaultSymptomsArray());
            }
        }
}