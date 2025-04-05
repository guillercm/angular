import { TestBed } from "@angular/core/testing"
import { routes } from "./pokemon-ssr.routes"
import { provideRouter, Router } from "@angular/router"
import { Location } from "@angular/common";

describe('Pokemon routes', () => {

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


  it('should navigate to "About" redirects to "/about"', async () => {
    // console.log(routes)
    await router.navigate(['about'])
    expect(location.path()).toBe('/about');
  })

  it('should navigate to "pokemons/bulbasaur" redirects to "/pokemons/bulbasaur"', async () => {
    await router.navigate(['pokemons'], {queryParams: {page: 2}})
    expect(location.path()).toBe('/pokemons?page=2');
  })

  it('should navigate to "pokemons/bulbasaur" redirects to "/pokemons/bulbasaur"', async () => {
    await router.navigate(['pokemons/bulbasaur'])
    expect(location.path()).toBe('/pokemons/bulbasaur');
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
})
