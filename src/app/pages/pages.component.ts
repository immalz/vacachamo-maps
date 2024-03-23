import { Component } from '@angular/core';
import { PlacesService } from '../services/places.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  
  constructor(
    private placesService: PlacesService
  ) {}


  get isUserLocationReady(): boolean {
    return this.placesService.isUserLocationReady;
  }
}
