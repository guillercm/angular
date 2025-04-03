import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPdfComponent } from './shared-pdf.component';

describe('SharedPdfComponent', () => {
  let component: SharedPdfComponent;
  let fixture: ComponentFixture<SharedPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
