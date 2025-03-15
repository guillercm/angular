# mis notas

### Desuscripción de observables
<code-block>
  <details>
  <summary>Usando take</summary>

  ```typescript
of("hola mundo").pipe(
  take(1),
)
.subscribe((data: string) => {
  //console.log(data)
});
  ```
  </details>

  <details>
  <summary>Usando takeUntilDestroyed</summary>

  ```typescript
private readonly _destroyRef = inject(DestroyRef);

of("hola mundo").pipe(
    takeUntilDestroyed(this._destroyRef),
)
.subscribe((data: string) => {
    //console.log(data)
});
  ```
  </details>

</code-block>



### Dos formas de crear un mapeador

<code-block>
  <details>
  <summary>gif.mapper.ts</summary>

  ```typescript
import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from './../interfaces/giphy.interfaces';

export class GifMapper {
  static mapGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    };
  }

  static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }
}

  ```
  </details>

  <details>
  <summary>simpsons-adapter.ts</summary>

  ```typescript
import { inject, Injectable } from '@angular/core';
import { ModelAdapter } from '@core/interfaces/adapter/model-adapter.interface';
import { ModelAdapterService } from '@core/services/model-adapter/model-adapter.service';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';
import { SimpsonResponse } from '@features/simpsons/interfaces/api/simpsonsRespose.interface';

@Injectable({
  providedIn: 'root',
})
export class SimpsonAdapter implements ModelAdapter<SimpsonResponse, Simpson> {

  private readonly _modelAdapter = inject(ModelAdapterService);

  adapt = (simpsonResponse: SimpsonResponse): Simpson => {
    return this._modelAdapter.adapt<SimpsonResponse, Simpson>(simpsonResponse, (simpsonResponse: SimpsonResponse) => {
      return {
        id: Number(simpsonResponse.id),
        fullName: simpsonResponse.nombre + " " + simpsonResponse.apellidos,
        age: simpsonResponse.edad,
        image: simpsonResponse.imagen,
        personality: simpsonResponse.personalidad,
        description: simpsonResponse.descripcion,
        funFact: simpsonResponse.dato_curioso
      }
    })
  }


  adaptArray = (simpsonsResponse: SimpsonResponse[]): Simpson[] =>
    this._modelAdapter.adaptArray<SimpsonResponse, Simpson>(simpsonsResponse, this.adapt)

}

  ```
  </details>

</code-block>




### Pasar de un observable a una señal
<code-block>
  <span>toSignal</span>

  ```typescript

  public urlPdf = toSignal<string>(
    inject(ActivatedRoute).data.pipe(
      map(data => environment.pdfPath.replace('{filename}', data['pdf']))
    )
  );

  ```
</code-block>

### Observables múltiples
<code-block>
  <span>switchMap</span>

  ```typescript
this._activateRoute.data.pipe(
  take(1),
  switchMap((data) => this._languageService.gethttpStatusErrors(data['http-status-code']))
).subscribe((httpStatus) => {
  this._httpStatus.set(httpStatus);
})
  ```
</code-block>

### Signals

<code-block>
  <span>code</span>

  ```typescript
// propiedad privada con getter.
private _name = signal<string>("");
public readonly name = this._name.asReadonly();
//NOTA: Si solo queremos que se pueda usar el getter en el template del componente,
// se debería de poner como protected

// Obtención de ViewContainerRef
private readonly _container = viewChild.required('container', { read: ViewContainerRef })
  //<ng-container #container></ng-container>

// inputs y outputs
public name = input.required<string>();

public onChangeName = output<string>();

// getters de varias propiedades signals
public readonly getFullName = computed<string>(() => this.name() + " " + this.lastName() )

// linkedSignal para cuando quiero que el valor de una señal se actualize en base al valor de otra y además poderle setear un valor distinto cuando quiera
private _simpsonId = signal<number>(1);

protected readonly simpsonId = this._simpsonId.asReadonly();

private _linkedIdSimpson = linkedSignal<number>(() => this.simpsonId());

simpsonEffects = effect(() => {
  this._linkedIdSimpson.set(78)
  console.log("idSimpson " + this._linkedIdSimpson())

  console.log(this.simpsonsRequest())

})


// si queremos ejecutar algo cuando 1 o más signals cambian de valor
effectLoadInfoUser = effect(() => this.loadInfoUser(this.name()))


// effect también se ejecuta 1 vez cuando se crea el componente, si queremos evitar esto,
// y que sólo se ejecute cuando las propiedades realmente hayan cambiado de valor podemos hacer:
// (ya de paso vemos el funcionamiento interno de esta app de los interceptores :) )
private readonly _interceptorService = inject(InterceptorService);

constructor() {
    let initialRun = true;
    effect(() => {
      const data = this._interceptorService.httpErrorData();
      if (initialRun) return;
      // ejecutaremos el código cuando haya un nuevo error http.
      //console.log(data);
    })

    effect(() => {
      const data = this._interceptorService.timeoutErrorData();
      if (initialRun) return;

      // ejecutaremos el código cuando hayamos echo una solicitud http y esta tarde mucho en hacerse
      //console.log(data);
    })

    effect(() => {
      const isLoading = this._interceptorService.isLoadingSomeHttpRequest();
      if (initialRun) {
        initialRun = false;
      }

      // ejecutaremos el código cuando hayamos echo una solicitud http y esta tarde mucho en hacerse
      if (isLoading) {
        //console.log("cargando...")
      } else {
        //console.log("terminó de cargar :)")
      }
    })

    
  }

  ```
</code-block>


### Notas de formularios
<code-block>
  <span>Evitar que el enter en un input envíe el formulario</span>

  ```html
  <form><input type="text" (keydown.enter)="$event.preventDefault()"></form>

  ```
</code-block>
 
## Recursos

[web para crear interfaces de usuario modernas en netlify](https://www.netlify.com/)


[decoradores de typescript](https://www.typescriptlang.org/docs/handbook/decorators.html)

[tailwind](https://tailwindcss.com/docs/installation/framework-guides/angular)

[zoneless](https://angular.dev/guide/experimental/zoneless)

[galeria de fotos para pruebas](https://flowbite.com/docs/components/gallery/)

[fuentes](https://fonts.google.com/selection#how-to-use)

[tailwindcss](https://tailwindcss.com/)

[daisyui instalación](https://daisyui.com/docs/install/angular/)



[daisyui componentes](https://daisyui.com/components)

[daisyui componente diff](https://daisyui.com/components/diff/)

[iconify](https://iconify.design/)

[evitar usar prefijo 'on' para los eventos outputs](https://angular.dev/style-guide#dont-prefix-output-properties)

[restcountries](https://restcountries.com/)

[content-projection](https://angular.dev/guide/components/content-projection)

[carrusel de imágenes](https://swiperjs.com/)


[neon.tech](https://neon.tech/)


[refactoring-ui](https://medium.com/refactoring-ui/7-practical-tips-for-cheating-at-design-40c736799886)

[midudev-refactoring-ui](https://www.youtube.com/watch?v=n189TdfbQIA)

[componente imagenes](https://unpic.pics/img/angular/)
<!-- 

<code-block>
  <details>
  <summary>your-component.ts</summary>

  ```typescript

  ```
  </details>

  <details>
  <summary>app.template.html</summary>

  ```html

  ```
  </details>

  <details>
  <summary>render</summary>

  ```typescript

  ```
  </details>
</code-block> -->
