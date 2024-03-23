import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PlacesService } from 'src/app/services/places.service';
import { Map, MarkerOptions, marker, tileLayer, icon} from 'leaflet';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, AfterViewInit{

  constructor(
    private placeService: PlacesService
  ) { } 

  ngOnInit(): void {
    console.log(this.placeService.userLocation);
  }

  
  ngAfterViewInit(): void {

    const latitud = this.placeService.userLocation?.[0];
    const longitude = this.placeService.userLocation?.[1];

    const map = new Map('map').setView([Number(latitud), Number(longitude)], 13);

    const marketCustom: any = {
      iconUrl: 'https://i.ibb.co/Pwp6q7H/e591cd0e-7713-4ed2-bc57-ae8c29f0b336-removebg-preview.png',
      iconSize: [100,100]
    }


    const marketOptions: MarkerOptions = {
      icon: icon(marketCustom),
      draggable: true
    };

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker([Number(latitud), Number(longitude)], marketOptions).addTo(map).bindPopup('<h1>Mueve a Vacachamo a su destino</h1><img src="assets/vacachamo.webp" alt="Vacachamo" style="width: 100%">');

    map.fitBounds([
      [Number(latitud), Number(longitude)],
      [Number(latitud), Number(longitude)]
    ]);

    map.on('click', (e) => {
      console.log(e.latlng);
      // const map = new Map('map').setView([e.latlng.lat, e.latlng.lng], 13)

      const market = marker([e.latlng.lat, e.latlng.lng], marketOptions).addTo(map)
    } );
  }

}
