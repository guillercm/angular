import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
  selector: 'life-cycle-hook-child',
  templateUrl: './life-cycle-hook-child.component.html',
  styleUrls: ['./life-cycle-hook-child.component.css']
})
export class LifeCycleHookChildComponent implements OnChanges, OnInit, DoCheck,
AfterContentInit, AfterContentChecked,
AfterViewInit, AfterViewChecked,
OnDestroy {
  @Input() text!: string;

  private nextId = 1;

  private verb = 'initialized';

  constructor(private logger: LoggerService) {
    
      const is = this.text ? 'is' : 'is not';
      this.logIt(`text ${is} known at construction`);
  }

  ngOnInit(): void {
      this.logIt(`OnInit`);
  }

  // only called for/if there is an @input variable set by parent.
  ngOnChanges(changes: SimpleChanges): void {
      const changesMsgs: string[] = [];
      for (const change in changes) {
          if (change === 'text') {
              const currentValue = changes['text'].currentValue;
              changesMsgs.push(`text ${this.verb} to "${currentValue}"`);
          } else {
              changesMsgs.push(change + ' ' + this.verb);
          }
      }
      this.logIt(`OnChanges: ${changesMsgs.join('; ')}`);
      this.verb = 'changed'; // next time it will be a change
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngDoCheck(): void {
      this.logIt(`DoCheck`);
  }

  ngAfterContentInit(): void {
      this.logIt(`AfterContentInit`);
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterContentChecked(): void {
      this.logIt(`AfterContentChecked`);
  }

  ngAfterViewInit(): void {
      this.logIt(`AfterViewInit`);
  }

  // Beware! Called frequently!
  // Called in every change detection cycle anywhere on the page
  ngAfterViewChecked(): void {
      this.logIt(`AfterViewChecked`);
  }

  ngOnDestroy(): void {
      this.logIt(`OnDestroy`);
  }

  logIt(msg: string): void {
      this.logger.log(`#${this.nextId++} ${msg}`);
  }
}
