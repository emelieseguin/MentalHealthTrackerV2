import {Injectable, Inject} from '@angular/core';
import * as fs from 'tns-core-modules/file-system';

@Injectable()
export class UtilsService {

  public getFilename(path: string) {
    let parts = path.split('/');
    return parts[parts.length - 1];
  }

  public documentsPath(filename: string) {
    return `${fs.knownFolders.documents().path}/${filename}`;
  }

  public getCurrentDateKey(): string {
    let today = new Date();
    let dayKey = `${today.getFullYear()}-${today.getUTCMonth() + 1}-${today.getDate()}`
    return dayKey;
  }

  public getMonth(): string {
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let monthIndex: number = new Date().getMonth();
    return months[monthIndex];
  }
}