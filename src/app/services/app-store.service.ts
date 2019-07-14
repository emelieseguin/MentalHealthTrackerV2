import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { UserInfo, UserInfoMap } from "../models/user-info.model";

@Injectable()
export class AppStoreService {
    
    userInfo: UserInfo;
}