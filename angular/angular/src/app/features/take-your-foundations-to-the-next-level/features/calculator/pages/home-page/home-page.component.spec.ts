import { ComponentFixture, TestBed } from "@angular/core/testing";
import HomePageComponent from "./home-page.component";

describe('HomePageComponent', () => {

  let fixture: ComponentFixture<HomePageComponent>;
  let compiled: HTMLElement;
  let component: HomePageComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        // ... test providers
      ],
      imports: [HomePageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePageComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    expect(compiled.querySelector('calculator')).not.toBeNull();
  });

  it('should contain basic css classes', () => {
    const divElement = compiled.querySelector('calculator')?.parentElement;
    console.log(divElement)
    const divClasses = divElement?.classList.value.split(' ');

    const shouldHave =
      'min-h-screen flex items-center justify-center'.split(
        ' '
      );

    shouldHave.forEach((className) => {
      expect(divClasses).toContain(className);
    });
  });
});
