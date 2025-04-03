import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { StylesMapsService } from './services/styles-maps.service';
import { CounterAloneComponent } from '../alone/components/counter-alone/counter-alone.component';
import { Seccion31Component } from './pages/seccion31/seccion31.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchBoxComponent } from '../shared/components/search-box/search-box.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MapsService, PlacesService } from './services';
import { PlacesApiClientService } from './api/places-api-client.service';
import { DirectionsApiClientService } from './api/directions-api-client.service';



@NgModule({
  declarations: [
    MiniMapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkersPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent,
    Seccion31Component,
    MapViewComponent,
    LoadingComponent,
    SearchBarComponent,
    SearchResultsComponent,

  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    CounterAloneComponent,
    SideMenuComponent,
    MatProgressSpinnerModule,
    SearchBoxComponent
  ],
  providers: [
    StylesMapsService,
    PlacesService,
    MapsService,
    PlacesApiClientService,
    DirectionsApiClientService,
    provideHttpClient(withInterceptorsFromDi())
  ]
})
export class MapsModule { }
