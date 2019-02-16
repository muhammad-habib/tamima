import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() lat: number  ;
  @Input() lng: number  ;
  @Input() height:number =100;
  @Input() zoom:number   =10;
  @Input() label;
  @Input() draggable:boolean=true;
  marker:Marker;
  @Output() reLocation = new EventEmitter<Marker>();

  constructor() {
   }

  ngOnInit() {
    this.marker={
      lat : this.lat,
      lng : this.lng,
      draggable : this.draggable,
      label : this.label 
    }
  }
  mapClicked($event: MouseEvent) {
    this.marker.lat= $event.coords.lat;
    this.marker.lng= $event.coords.lng;
    this.reLocation.emit(this.marker);
  }
  
  markerDragEnd( $event: MouseEvent) {
    this.marker.lat= $event.coords.lat;
    this.marker.lng= $event.coords.lng;
    this.reLocation.emit(this.marker);
  }
  

}

interface Marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
