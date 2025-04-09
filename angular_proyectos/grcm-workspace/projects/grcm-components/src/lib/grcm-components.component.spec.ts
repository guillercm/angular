import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrcmComponentsComponent } from './grcm-components.component';

describe('GrcmComponentsComponent', () => {
  let component: GrcmComponentsComponent;
  let fixture: ComponentFixture<GrcmComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrcmComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrcmComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
