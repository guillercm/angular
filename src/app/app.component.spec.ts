import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { I18nPluralPipe, TitleCasePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { appConfig } from './app.config';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        // ... other test providers
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService(),
        { provide: LOCALE_ID, useValue: 'es' },
        { provide: I18nPluralPipe },
        { provide: TitleCasePipe }
      ],
      // providers: [...appConfig.providers],
      imports: [AppComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () => {
    // A = Arrange
    const number = 1;
    const number2 = 2;

    // A = Act
    const result = number + number2;

    // A = Assert
    // if (result !== 3) throw new Error('No es 3!')
    expect(result).toBe(3)
  })

  // it(`should have the 'angular' title`, () => {
  //   const app = fixture.componentInstance;
  //   expect(app.title()).toEqual('Angular');
  // });

  it('should render router-outlet', () => {
    // expect(compiled.querySelector('router-outlet')).not.toEqual(null);
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
});
