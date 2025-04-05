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

  it('should apply w-2/4 doubleSize is true', () => {
    fixture.componentRef.setInput('isDoubleSize', true);
    
    fixture.detectChanges();

    const hostCssClasses: string[] = compiled.classList.value.split(' ');

    expect(hostCssClasses).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
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

    let router: Router;
    let location: Location;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideRouter(routes)
        ]
      });

      router = TestBed.inject(Router);
      location = TestBed.inject(Location);
    })

    it('should navigate to "pokemons" if page not exists', async () => {
      await router.navigate(['unknown-page'])
      expect(location.path()).toBe('/pokemons');
    })

    it('should load the proper component', async () => {
      const baseRoute = routes.find((route) => route.path === '')?.children!;
      expect(baseRoute).toBeDefined();
      const abouteRoute = baseRoute.find((route) => route.path === 'about')!;
      expect(abouteRoute).toBeDefined();
      const aboutComponent = await abouteRoute.loadComponent!();
      expect((aboutComponent as any).default.name).toBe("AboutPageComponent")
      // await router.navigate(['unknown-page'])
      // expect(location.path()).toBe('/pokemons');
    })
    }

    let service: PokemonsService;
    let httpMock: HttpTestingController;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
        ],
      }).compileComponents();

      httpMock = TestBed.inject(HttpTestingController);
      service = TestBed.inject(PokemonsService);
      (service as any)._configApi.set(api)

    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should load a page of SimplePokemons', async () => {

      // usando subscribe
      // service.loadPage(1).subscribe((pokemons) => {
      //   console.log(expectedPokemons)
      //   expect(pokemons).toEqual(expectedPokemons);
      // });

      // usando firstValueFrom
      firstValueFrom(service.loadPage(5).pipe(tap((pokemons) => {
        expect(pokemons).toEqual(expectedPokemons);
      })));


      // Para obtener la url real
      // httpMock.expectOne(request => {
      //   console.log("url: ", request.url);
      //   return true;
      // });

      const req = httpMock.expectOne(
        `${apiBaseUrl}/pokemon?offset=80&limit=20`
      );

      console.log(req)

      expect(req.request.method).toBe('GET');

      req.flush(mockPokeApiResponse);
    });

    it('should load a Pokémon by ID', () => {
      const pokemonId = '1';

      firstValueFrom(service.loadPokemon(pokemonId).pipe(tap((pokemon: any) => {
        expect(pokemon).toEqual(mockPokemon);
      })));

      const req = httpMock.expectOne(
        `${apiBaseUrl}/pokemon/${pokemonId}`
      );

      expect(req.request.method).toBe('GET');

      req.flush(mockPokemon);
    });
```
