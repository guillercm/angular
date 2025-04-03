import { Component } from '@angular/core';

interface DataDatePipe {
  label?: string;
  format?: string;
  timezone?: string;
  locale?: string;
}

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css'
})
export class BasicsPageComponent {
  public nameLower: string = 'fernando';
  public nameUpper: string = 'FERNANDO';
  public fullName: string = 'fErNAndo hErReRa';

  public customDate: Date = new Date();

  data: DataDatePipe[] = [
    { label: '', format: '', timezone: '', locale: '' },
    { label: '', format: 'short', timezone: '', locale: '' },
    { label: '', format: 'long', timezone: '', locale: '' },
    { label: '', format: 'MMMM', timezone: '', locale: '' },
    { label: '', format: 'MMMM dd, yyyy', timezone: '', locale: '' },
    { label: '', format: 'long', timezone: 'GMT-6', locale: '' },
    { label: '', format: 'long', timezone: 'GMT-4', locale: '' },
    { label: '', format: 'long', timezone: '', locale: 'es-HN' },
    { label: '', format: 'long', timezone: '', locale: 'en-US' },
    { label: '', format: 'long', timezone: '', locale: 'fr-CA' },
    { label: 'Hora de Madrid', format: 'hh.mm', timezone: 'GMT+1', locale: '' },
    { label: 'Hora de Canarias', format: 'hh.mm', timezone: 'GMT+0', locale: '' }
  ];
  

  getStringDatePipe({format, timezone, locale}: DataDatePipe): string {
    if (locale && !timezone) timezone = " ";
    return ` fecha | date ${format ? `:'${format}'` : ''}${timezone ? ` :'${timezone.trim()}'` : ''}${locale ? ` :'${locale}'` : ''}`;
  }
}
