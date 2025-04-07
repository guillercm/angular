### Testing

<br>

#### Tipos de pruebas

- Unitarias: Enfocada en partes atómicas.
    Funcionamientos específicos, como trabaja una función, una clase etc.

    - Pruebas atómicas simples.
    - Se recomienda no tener dependencia de otros componentes.
    - Debe de ser especializada en la pieza que estamos probando.

- Integración: Como funcionan diferentes elementos en conjunto, no deben de ser mayores a las unitarias.

- E2E - End to End: Como funciona un flujo de trabajo.
    - Flujo aislado de trabajo.
    
    - Prueban funcionalidades concretas.

    - Pruebas de casos improbables. Por ejemplo en un formulario en donde el usuario puede escribir lo que sea, probar que la aplicación no vaya a reventar en ningún caso. Inyecciones sql, caractéres especiales, etc.

<br>

#### Características de las pruebas

- Fáciles de escribir.

- Fáciles de leer, para posibles actualizaciones de ella en el futuro.

- Rápidas.

- Flexibles.

<br>

#### El triple "A"

- Arrange (Arreglar): Preparar el sujeto de pruebas.
    - Importaciones
    - Inicializaciones.

- Act (Actuar): 
    - Aplicar estímulos.
    - Llamar métodos.
    - Simular clicks. 

- Assert (Afirmar):
    - ¿Que a sucedido?
    - ¿Que es lo que realmente sucedió?

<br>

#### Coverage (Cobertura)

- Porcetaje de:
    - Lineas ejecutadas.
    - Ramas de decisión probadas.
    - Funciones / métodos invocados.
    - Condiciones evaluadas en ambos sentidos. (en un if, si se evaulua en el if, en el else etc)

- Lo ideal es hacer pruebas del 100% de la aplicación, pero si no es posible, por lo menos hacerlo de las partes más críticas de la aplicación.

#### Documentación
Esta documentación organiza y explica los ejemplos de testing del siguiente punto, abarcando pruebas unitarias simples, manejo de mocks y spies, pruebas de componentes y servicios, navegación y funciones asíncronas.

##### Suma de dos números
```typescript
it('should be 3', () => {
  // Arrange: inicialización de variables
  const number = 1;
  const number2 = 2;

  // Act: ejecución de la suma
  const result = number + number2;

  // Assert: verificación del resultado
  expect(result).toBe(3);
});
```
Se comprueba que la suma de 1 + 2 sea igual a 3.

##### Título de un Componente
```typescript
it(`should have the 'angular' title`, () => {
  const app = fixture.componentInstance;
  expect(app.title()).toEqual('Angular');
});

```
Se valida que el método title() retorne el valor esperado, "Angular".

##### Comprobación de Clases CSS Según Condición
```typescript
it('should apply w-2/4 when isDoubleSize is true', () => {
  fixture.componentRef.setInput('isDoubleSize', true);
  fixture.detectChanges();

  const hostCssClasses: string[] = compiled.classList.value.split(' ');
  expect(hostCssClasses).toContain('w-2/4');
  expect(component.isDoubleSize()).toBeTrue();
});

it('should apply w-1/4 when isDoubleSize is false', () => {
  const hostCssClasses: string[] = compiled.classList.value.split(' ');
  expect(hostCssClasses).toContain('w-1/4');
  expect(component.isDoubleSize()).toBeFalse();
});

```
Se prueban dos escenarios que asignan clases CSS diferentes en función del valor booleano de isDoubleSize.

##### Prueba de Contenido Proyectado
```typescript
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

```
Se verifica que el contenido proyectado en el componente se renderice correctamente con la clase "underline".


##### Prueba de Manejo de Longitud Máxima en un Servicio
```typescript
it('should handle max length correctly', () => {
  Array.from({ length: 10 }).forEach(() => {
    service.constructNumber('1');
  });
  expect(service.resultText().length).toBe(10);

  // Se intenta agregar otro dígito sin aumentar la longitud
  service.constructNumber('1');
  expect(service.resultText().length).toBe(10);
});

```
Se comprueba que el método constructNumber no permita que el resultado supere una longitud máxima definida (10 dígitos).

##### Creación de un Mock para CalculatorService
```typescript
class MockCalculatorService {
  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('20');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('-');
  public constructNumber = jasmine.createSpy('constructNumber');
}

```
Se utiliza un mock para simular el comportamiento del servicio, facilitando la verificación de interacciones y valores de retorno.

##### Pruebas del Servicio CalculatorService Real
```typescript
describe('CalculatorService', () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculatorService);
  });

  beforeAll(() => {
    // Configuración global si es necesario
  });

  afterEach(() => {
    // Limpieza tras cada test
  });

  afterAll(() => {
    // Limpieza global
  });

  it('should be created', () => {
    expect(CalculatorService).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.resultText()).toBe('0');
    expect(service.subResultText()).toBe('0');
    expect(service.lastOperator()).toBe('+');
  });
});
```
Se verifica la creación del servicio y que sus valores iniciales sean los esperados.

##### CalculatorComponent Utilizando el Mock
```typescript
describe('CalculatorComponent', () => {
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;
  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        { provide: CalculatorService, useClass: MockCalculatorService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
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
});

```
Se testea que el componente muestre los valores correctos en pantalla utilizando el mock del servicio para simular respuestas.

##### LayoutComponent con overrideComponent
```typescript
let component: LayoutComponent;
let fixture: ComponentFixture<LayoutComponent>;
let compiled: HTMLDivElement;

@Component({
  selector: 'pokemon-ssr-navbar',
  template: '<p>NAV</p>'
})
class NavbarComponentMock {}

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [LayoutComponent],
    providers: [provideRouter([])]
  })
  .overrideComponent(LayoutComponent, {
    add: { imports: [ NavbarComponentMock ] },
    remove: { imports: [ NavbarComponent ] }
  }).compileComponents();

  fixture = TestBed.createComponent(LayoutComponent);
  component = fixture.componentInstance;
  compiled = fixture.nativeElement;
  fixture.detectChanges();
});
```
Se muestra cómo reemplazar componentes reales por mocks usando overrideComponent para aislar pruebas.

##### Navegación con el Router
```typescript
let router: Router;
let location: Location;

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [ provideRouter(routes) ]
  });
  router = TestBed.inject(Router);
  location = TestBed.inject(Location);
});

it('should navigate to "pokemons" if page not exists', async () => {
  await router.navigate(['unknown-page']);
  expect(location.path()).toBe('/pokemons');
});

it('should load the proper component', async () => {
  const baseRoute = routes.find((route) => route.path === '')?.children!;
  expect(baseRoute).toBeDefined();
  const aboutRoute = baseRoute.find((route) => route.path === 'about')!;
  expect(aboutRoute).toBeDefined();
  const aboutComponent = await aboutRoute.loadComponent!();
  expect((aboutComponent as any).default.name).toBe("AboutPageComponent");
});
```
Se valida la navegación a rutas desconocidas y la carga dinámica del componente correspondiente.

##### Servicios con HttpClientTesting
```typescript
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
  (service as any)._configApi.set(api);
});

afterEach(() => {
  httpMock.verify();
});

it('should load a page of SimplePokemons', async () => {
  firstValueFrom(service.loadPage(5).pipe(tap((pokemons) => {
    expect(pokemons).toEqual(expectedPokemons);
  })));

  const req = httpMock.expectOne(`${apiBaseUrl}/pokemon?offset=80&limit=20`);
  expect(req.request.method).toBe('GET');
  req.flush(mockPokeApiResponse);
});
```
Se comprueba que el servicio realiza la petición HTTP correcta para obtener una página de datos y que la respuesta simulada se procesa adecuadamente.


##### Carga de un Pokémon por ID
```typescript
it('should load a Pokémon by ID', () => {
  const pokemonId = '1';
  firstValueFrom(service.loadPokemon(pokemonId).pipe(tap((pokemon: any) => {
    expect(pokemon).toEqual(mockPokemon);
  })));
  
  const req = httpMock.expectOne(`${apiBaseUrl}/pokemon/${pokemonId}`);
  expect(req.request.method).toBe('GET');
  req.flush(mockPokemon);
});
```
Se verifica que el servicio pueda obtener los datos de un Pokémon específico mediante una petición GET.

##### Asíncronas con Fetch
```typescript
const BASE_URL = environment.baseUrl;
const issueNumber = '123';
const mockComments: any[] = [
  { id: 1, body: 'First comment', user: { login: 'user1' } },
  { id: 2, body: 'Second comment', user: { login: 'user2' } },
];

describe('getIssue Comments', () => {
  it('should fetch issue comments successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueCommentsResponse = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK'
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

    const issue = await getIssueCommentsByNumber(issueNumber);
    expect(window.fetch).toHaveBeenCalledWith(requestURL, {
      headers: { ...authorization() }
    });
  });

  it('should throw an error if the response is not ok', async () => {
    const issueCommentsResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueCommentsResponse);

    try {
      await getIssueCommentsByNumber(issueNumber);
      // La ejecución no debería llegar aquí
      expect(true).toBeFalse();
    } catch (error) {
      expect(error).toBe(`Can't load comments issue ${issueNumber}`);
    }
  });
});
```
Se simulan respuestas de la API utilizando fetch, comprobando tanto el caso exitoso como el manejo de errores cuando la respuesta no es correcta.
