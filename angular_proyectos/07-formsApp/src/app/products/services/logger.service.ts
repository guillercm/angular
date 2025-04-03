import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  logs: string[] = [];

  constructor() {
  }

  log(msg: string): void {
          this.logs.push(msg);
  }

  clear(): void {
      this.logs = [];
  }

  // schedules a view refresh to ensure display catches up
  tick(): void {
      this.tick_then(() => {
      });
  }

  tick_then(fn: () => any): void {
      setTimeout(fn, 0);
  }
}
