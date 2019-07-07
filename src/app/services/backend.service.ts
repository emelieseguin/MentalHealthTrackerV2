import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";

const tokenKey = "token";

export class BackendService {
  
  static isLoggedIn(): boolean {
    return !!appSettings.getString("token");
  }

  static get token(): string {
    return appSettings.getString("token");
  }

  static set token(theToken: string) {
    appSettings.setString("token", theToken);
  }
}