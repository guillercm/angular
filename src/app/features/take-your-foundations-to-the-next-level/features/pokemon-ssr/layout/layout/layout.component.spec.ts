import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import LayoutComponent from './layout.component';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let compiled: HTMLDivElement;

  @Component({
    selector: 'pokemon-ssr-navbar',
    template: '<p>NAV</p>'
  })
  class NavbarComponentMock {

  }

  beforeEach(async () => {

    // await TestBed.overrideComponent(LayoutComponent, {
    //   set: {
    //     imports: [NavbarComponentMock],
    //     schemas: [CUSTOM_ELEMENTS_SCHEMA]
    //   }
    // })

    //Forma recomendada
    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [provideRouter([])]
    })
    // .compileComponents();
    .overrideComponent(LayoutComponent, {
      add: {
        imports: [ NavbarComponentMock ]
      },
      remove: {
        imports: [ NavbarComponent ]
      }
    }).compileComponents();
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should render navbar and router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
    expect(compiled.querySelector('pokemon-ssr-navbar')).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
