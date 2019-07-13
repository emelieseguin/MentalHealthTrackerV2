import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {User, PasswordOptions} from '../models/user.model';
import { FirebaseService } from '../services/firebase.service';
import { prompt } from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { Page, isAndroid } from 'tns-core-modules/ui/page/page';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User;
  isLoggingIn = true;
  isAuthenticating = false;

  
  constructor(private firebaseService: FirebaseService, private page: Page, private routerExtensions: RouterExtensions) {
            if (isAndroid) {
                this.page.actionBarHidden = true;
            }
              this.user = new User();
              this.user.email = "emelieseguin@gmail.com";
              this.user.password = "password";
              this.user.passwordOptions = new PasswordOptions();
              this.user.passwordOptions.email = "emelieseguin@gmail.com";
              this.user.passwordOptions.password = "password";

              console.log('back to login');
            }

 
 submit() {
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
        console.log('done this...')
        this.routerExtensions.navigate(["/main/default"], { clearHistory: true } );

      })
      .catch((message:any) => {
        this.isAuthenticating = false;
      });
  }

  signUp() {
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

  forgotPassword() {

    // prompt({
    //   title: "Forgot Password",
    //   message: "Enter the email address you used to register for Giftler to reset your password.",
    //   defaultText: "",
    //   okButtonText: "Ok",
    //   cancelButtonText: "Cancel"
    // }).then((data) => {
    //   if (data.result) {
    //     this.firebaseService.resetPassword(data.text.trim())
    //       .then((result:any) => {
    //         if(result){
    //           alert(result);
    //         }
    //      });
    //   }
    // }); 
 }
  
toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}