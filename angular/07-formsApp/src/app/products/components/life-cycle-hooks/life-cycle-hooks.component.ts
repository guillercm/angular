import {Component} from '@angular/core';
import { LoggerService } from '../../services/logger.service';

@Component({
    selector: 'life-cycle-hooks',
    templateUrl: './life-cycle-hooks.component.html',
    styleUrls: ['./life-cycle-hooks.component.css']
})
export class LifeCycleHooksComponent {

    hasChild = false;
    hookLog: string[];

    text = 'Some text';
    private logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
        this.hookLog = logger.logs;
    }

    toggleChild(): void {
        this.hasChild = !this.hasChild;
        if (this.hasChild) {
            this.text = 'Some text';
            this.logger.clear(); // clear log on create
        }
        this.hookLog = this.logger.logs;
        this.logger.tick();
    }

    update(): void {
        this.text += ' and more text';
        this.logger.tick();
    }

}
