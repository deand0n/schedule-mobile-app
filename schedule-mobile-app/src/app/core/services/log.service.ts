import {Injectable, isDevMode} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  public log(message: string): void {
    this.performLog(message, 'log');
  }

  public warn(message: string): void {
    this.performLog(message, 'warn');
  }

  public error(message: string): void {
    this.performLog(message, 'error');
  }

  public info(message: string): void {
    this.performLog(message, 'info');
  }

  private prepareMessage(message: string, level: string): string {
    const prefixes = [];

    prefixes.push(moment().format('YYYY-MM-DD HH:mm:ss.SSS'));

    if (level) {
      prefixes.push(level.toUpperCase());
    }
    const path = window.location.hash;
    if (path) {
      prefixes.push(path);
    }
    const prefix = prefixes.map(e => `[${e}]`).join(' ');
    return `${prefix} ${message}`;
  }

  private performLog(message: string, level: string): void {
    const preparedMessage = this.prepareMessage(message, level);
    try {
      if (isDevMode()) {
        console.log(preparedMessage);
      }
    } catch (e) {
      console.error(`Logging error: ${e}`);
    }
  }
}
