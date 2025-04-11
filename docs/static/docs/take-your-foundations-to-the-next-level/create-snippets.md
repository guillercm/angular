### Creación de snippets

#### Extensiones de visual code
- Easy Snippet

#### Crear snippet
- Primero tenemos que tener un código selecionado, después presionaremos ```Ctrl + Shift + P```; y buscaremos 'Easy Snnipet: Add snippet from Selection'.

    ```typescript
    import { TestBed } from "@angular/core/testing";
    import { CalculatorService } from "./calculator.service"

    describe('calculatorService', () => {

        let calculatorService: CalculatorService;

        beforeEach(() => {
            TestBed.configureTestingModule({});
            calculatorService = TestBed.inject(CalculatorService);
        })

        it('should be created', () => {
            expect(calculatorService).toBeTruthy();
        })

    })
    ```

- Después le daremos un nombre, en este caso, 'angular-service-test'.

- Lo modificaremos de esta forma:
```typescript
    // @prefix angular-service-test
    // @description 
    /* eslint-disable */
    import { TestBed } from "@angular/core/testing";

    describe('${1:Service}', () => {

        let service: ${1:Service};

        beforeEach(() => {
            TestBed.configureTestingModule({});
            service = TestBed.inject(${1:Service});
        })

        it('should be created', () => {
            expect(${1:Service}).toBeTruthy();
        })

    })
```

- Ahora cuando en algún fichero escribamos el nombre del snippet, en este caso, 'angular-service-test', visual code nos sugerirá añadirlo, y nos pondrá el cursos automáticamente en los sitios donde pone ${1:Service}.

```typescript
    // @prefix angular-component-test
    // @description 
    /* eslint-disable */

    import { ComponentFixture, TestBed } from "@angular/core/testing";

    describe('${1:AppComponent}', () => {

        let fixture: ComponentFixture<${1:AppComponent}>;
        let compiled: HTMLElement;
        let component: ${1:AppComponent}

        beforeEach(async () => {
            await TestBed.configureTestingModule({
            providers: [
                // ... test providers
            ],
            imports: [${1:AppComponent}]
            }).compileComponents();

            fixture = TestBed.createComponent(${1:AppComponent});
            compiled = fixture.nativeElement as HTMLElement;
            component = fixture.componentInstance;
        });

        it('should create the app', () => {
            expect(component).toBeTruthy();
        });

    });
```

NOTA: Para activar el cursor multilínea en visual code, colocaremos el cursor en una palabra, pulsaremos ```Ctrl + D``` en todas las coincidencias de esa palabra, y activaremos el cursor multilinea.