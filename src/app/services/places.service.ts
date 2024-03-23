import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.userLocation = [coords.latitude, coords.longitude];
        resolve(this.userLocation);
      },
      ( error ) => { 
          alert('No se pudo obtener la geolocalización del usuario.');
          console.log(error);
          reject(error);
      });
    });
  }
}
