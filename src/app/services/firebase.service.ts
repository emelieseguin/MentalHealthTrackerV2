import {Injectable, NgZone} from "@angular/core";
import {Gift} from "../models/gift.model";
import {User} from "../models/user.model";
import { BackendService } from "./backend.service";
import {UtilsService} from './utils.service';

import * as firebase from "nativescript-plugin-firebase";

@Injectable()
export class FirebaseService {

  constructor(private ngZone: NgZone, private utils: UtilsService){ }
 
  // Log the user in
  login(user: User) {
    return firebase.login({

      type: firebase.LoginType.PASSWORD,
      passwordOptions: user

    }).then(
      (result: any) => {
        console.log("I am logged in");
          BackendService.token = result.uid;
          return JSON.stringify(result);
      }, 
      (errorMessage: any) => {
        alert(errorMessage);
      });
  }

  logout(){
    BackendService.token = "";
    firebase.logout();    
  }
  
  register(user: User) {
    console.log('trying to actually register')
    return firebase.createUser({
      email: user.passwordOptions.email,
      password: user.passwordOptions.password
    }).then(
          function (result:any) {       
            return JSON.stringify(result);
          },
          function (errorMessage:any) {
            alert(errorMessage);
          }
      )
  }


  
//   resetPassword(email) {  /// will have to work on the reset password later!!
//     return firebase.resetPassword({
//     email: email
//     }).then((result: any) => {
//           alert(JSON.stringify(result));
//         },
//         function (errorMessage:any) {
//           alert(errorMessage);
//         }
//     ).catch(this.handleErrors);
//   }

//   getMyWishList(): Observable<any> {
//     return new Observable((observer: any) => {
//       let path = 'Gifts';
      
//         let onValueEvent = (snapshot: any) => {
//           this.ngZone.run(() => {
//             let results = this.handleSnapshot(snapshot.value);
//             console.log(JSON.stringify(results))
//              observer.next(results);
//           });
//         };
//         firebase.addValueEventListener(onValueEvent, `/${path}`);
//     });              
//   }

//   getMyGift(id: string): Observable<any> {
//     return new Observable((observer: any) => {
//       observer.next(this._allItems.filter(s => s.id === id)[0]);
//     });
//   }

//   getMyMessage(): Observable<any>{
//     return new Observable((observer:any) => {
//       firebase.getRemoteConfig({
//       developerMode: false, // play with this boolean to get more frequent updates during development
//       cacheExpirationSeconds: 300, // 10 minutes, default is 12 hours.. set to a lower value during dev
//       properties: [{
//       key: "message",
//       default: "Happy Holidays!"
//     }]
//   }).then(
//         function (result) {
//           console.log("Fetched at " + result.lastFetch + (result.throttled ? " (throttled)" : ""));
//           for (let entry in result.properties) 
//             { 
//               observer.next(result.properties[entry]);
//             }
//         }
//     );
//   });
// }

    

//   handleSnapshot(data: any) {
//     //empty array, then refill and filter
//     this._allItems = [];
//     if (data) {
//       for (let id in data) {        
//         let result = (<any>Object).assign({id: id}, data[id]);
//         if(BackendService.token === result.UID){
//           this._allItems.push(result);
//         }        
//       }
//       this.publishUpdates();
//     }
//     return this._allItems;
//   }

//    publishUpdates() {
//     // here, we sort must emit a *new* value (immutability!)
//     this._allItems.sort(function(a, b){
//         if(a.date < b.date) return -1;
//         if(a.date > b.date) return 1;
//       return 0;
//     })
//     this.items.next([...this._allItems]);
//   }

//   add(gift: string) {   
//     return firebase.push(
//         "/Gifts",
//         { "name": gift, "UID": BackendService.token, "date": 0 - Date.now(), "imagepath": ""}
//       ).then(
//         function (result:any) {
//           return 'Gift added to your wishlist!';
//         },
//         function (errorMessage:any) {
//           console.log(errorMessage);
//         }); 
//   }

//   editGift(id:string, description: string, imagepath: string){
//     this.publishUpdates();
//     return firebase.update("/Gifts/"+id+"",{
//         description: description, 
//         imagepath: imagepath})
//       .then(
//         function (result:any) {
//           return 'You have successfully edited this gift!';
//         },
//         function (errorMessage:any) {
//           console.log(errorMessage);
//         });  
//   }
//   editDescription(id:string, description: string){
//     this.publishUpdates();
//     return firebase.update("/Gifts/"+id+"",{
//         description: description})
//       .then(
//         function (result:any) {
//           return 'You have successfully edited the description!';
//         },
//         function (errorMessage:any) {
//           console.log(errorMessage);
//         });  
//   }
//   delete(gift: Gift) {
//     return firebase.remove("/Gifts/"+gift.id+"")
//       .catch(this.handleErrors);
//   }
  
//   uploadFile(localPath: string, file?: any): Promise<any> {
//       let filename = this.utils.getFilename(localPath);
//       let remotePath = `${filename}`;   
//       return firebase.uploadFile({
//         remoteFullPath: remotePath,
//         localFullPath: localPath,
//         onProgress: function(status) {
//             console.log("Uploaded fraction: " + status.fractionCompleted);
//             console.log("Percentage complete: " + status.percentageCompleted);
//         }
//       });
//   }

//   getDownloadUrl(remoteFilePath: string): Promise<any> {
//       return firebase.getDownloadUrl({
//         remoteFullPath: remoteFilePath})
//       .then(
//         function (url:string) {
//           return url;
//         },
//         function (errorMessage:any) {
//           console.log(errorMessage);
//         });
// }

  // handleErrors(error) {
  //   console.log(JSON.stringify(error));
  //   return Promise.reject(error.message);
  // }
}