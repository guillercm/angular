### Ejemplos de testing

```typescript
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

  it(`should have the 'angular' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title()).toEqual('Angular');
  });

  it('should render router-outlet', () => {
    // expect(compiled.querySelector('router-outlet')).not.toEqual(null);
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should apply w-1/4 doubleSize is false', () => {
    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  @Component({
    standalone: true,
    imports: [CalculatorButtonComponent],
    template: `
      <calculator-button>
        <span class="projected-content underline">Test content</span>
      </calculator-button>
    `,
  })
  class TestHostComponent {}

  it('should display projected content', () => {
    const testHostFixture = TestBed.createComponent(TestHostComponent);

    const compiled = testHostFixture.nativeElement as HTMLDivElement;
    const projectedContent = compiled.querySelector('.projected-content');

    expect(projectedContent).not.toBeNull();
    expect(projectedContent?.classList.contains('underline')).toBeTrue();
  });

  it('should handle max length correctly', () => {
    Array.from({ length: 10 }).forEach(() => {
        service.constructNumber('1');
    });

    expect(service.resultText().length).toBe(10);

    service.constructNumber('1');
    expect(service.resultText().length).toBe(10);
  });


  class MockCalculatorService {
    public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
    public subResultText = jasmine
        .createSpy('subResultText')
        .and.returnValue('20');
    public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-');

    public constructNumber = jasmine.createSpy('constructNumber');
  }

  describe('CalculatorService', () => {

    let service: CalculatorService;

    // Antes de cada prueba
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);
    })

    // Antes de todas las pruebas
    beforeAll(() => {

    })

    // Después de cada prueba
    afterEach(() => {

    })

    // Después de todas las pruebas
    afterAll(() => {

    })

    it('should be created', () => {
        expect(CalculatorService).toBeTruthy();
    })

    it('should be created with default values', () => {
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    })
  }


  describe('CalculatorComponent', () => {
    let fixture: ComponentFixture<CalculatorComponent>;
    let compiled: HTMLElement;
    let component: CalculatorComponent;

    let mockCalculatorService: MockCalculatorService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorComponent],
            providers: [
                {
                    provide: CalculatorService,
                    useClass: MockCalculatorService,
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CalculatorComponent);
        compiled = fixture.nativeElement as HTMLElement;
        component = fixture.componentInstance;

        mockCalculatorService = TestBed.inject(
            CalculatorService
        ) as unknown as MockCalculatorService;

        // fixture.detectChanges();
    });

    it('should display proper calculation values', () => {
        mockCalculatorService.resultText.and.returnValue('123');
        mockCalculatorService.subResultText.and.returnValue('456');
        mockCalculatorService.lastOperator.and.returnValue('*');

        fixture.detectChanges();

        expect(compiled.querySelector('span')?.innerText).toBe('456 *');

        expect(component.resultText()).toBe('123');
        expect(component.subResultText()).toBe('456');
        expect(component.lastOperator()).toBe('*');
    });
  }
```