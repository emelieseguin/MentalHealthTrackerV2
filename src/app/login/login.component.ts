import {Component, wtfStartTimeRange} from '@angular/core';
import {Observable} from 'rxjs';
import {User, PasswordOptions} from '../models/user.model';
import { FirebaseService } from '../services/firebase.service';
import { prompt } from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { Page, isAndroid } from 'tns-core-modules/ui/page/page';
import { AppStoreService } from '../services/app-store.service';
import { DefaultUserService } from '../services/default-user.service';
import { DataService } from '../services/data.service';
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User;
  isLoggingIn = true;
  isAuthenticating = false;
  
  constructor(private firebaseService: FirebaseService, private page: Page, 
    private routerExtensions: RouterExtensions, private appStore: AppStoreService,
    private defaultUser: DefaultUserService, private dataService: DataService) {
  
    if (isAndroid) {
      this.page.actionBarHidden = true;
    }

    // TODO: read this from the input boxes, seems like this is actually needed for a weird reason
    this.user = new User();
    this.user.email = "";
    this.user.password = "";
    // this.user.email = "emelieseguin@gmail.com";
    // this.user.password = "password";
    // this.user.passwordOptions = {
      // email: "emelieseguin@gmail.com",
      // password: "password"
    // };
    
    // this.appStore.userInfo.email = this.user.email; 
    // Set the user email from the loggin
  }

 
 submit() {
   console.log(`${this.user.email} + ${this.user.password}`);
    this.isAuthenticating = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
     this.firebaseService.login(this.user)
     .then(() => {
        this.isAuthenticating = false;

        // Load the app data from the data base for the user
        this.dataService.pullSymptoms(this.user.email);
        this.dataService.pullUserInfo(this.user.email);
        this.dataService.pullJournalEntries(this.user.email);
    
        this.routerExtensions.navigate(["/main/default"], { clearHistory: true } );

      })
      .catch((message:any) => {
        this.routerExtensions.navigate(["/login"], { clearHistory: true } );
        this.isAuthenticating = false;
      });
  }

  saveEmail(args){

  }

  signUp() {

    this.user.passwordOptions = {
      email: this.user.email,
      password: this.user.password
    };

    this.firebaseService.register(this.user)
      .then(() => {
        this.isAuthenticating = false;
        this.toggleDisplay();
      })
      .catch((message:any) => {
        alert(message);
        this.isAuthenticating = false;
      });
  }

//   forgotPassword() {

//     prompt({
//       title: "Forgot Password",
//       message: "Enter the email address you used to register for Giftler to reset your password.",
//       defaultText: "",
//       okButtonText: "Ok",
//       cancelButtonText: "Cancel"
//     }).then((data) => {
//       if (data.result) {
//         this.firebaseService.resetPassword(data.text.trim())
//           .then((result:any) => {
//             if(result){
//               alert(result);
//             }
//          });
//       }
//     }); 
//  }
  
toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}