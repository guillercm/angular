import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrcmExampleLoginComponent } from './example-login.component';
import { provideRouter } from '@angular/router';


describe('GrcmExampleLoginComponent', () => {
  let component: GrcmExampleLoginComponent;
  let fixture: ComponentFixture<GrcmExampleLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrcmExampleLoginComponent],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrcmExampleLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
