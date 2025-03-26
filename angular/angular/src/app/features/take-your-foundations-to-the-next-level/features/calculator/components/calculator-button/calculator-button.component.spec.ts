import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-button.component';

describe('CalculatorButtonComponent', () => {
  let component: CalculatorButtonComponent;
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('button classes', () => {
    const buttonElement = compiled.querySelector('button');

    expect(buttonElement).not.toBeNull();

    expect(buttonElement?.getAttribute("type")).toBe("button");

    const mustHaveClasses = 'w-full h-16 outline-none focus:outline-none hover:bg-indigo-700/20'.split(' ');

    const buttonClasses = buttonElement?.classList.value.split(' ');

    mustHaveClasses.map((className) => {
      expect(buttonClasses).toContain(className)
    })
  });

});
