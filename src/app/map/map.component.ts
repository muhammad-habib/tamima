import { Component, OnInit, Input, Output ,EventEmitter} from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() latitude: number  ;
  @Input() longitude: number  ;
  @Input() height:number =100;
  @Input() zoom:number   =10;
  @Input() label;
  @Input() draggable:boolean=true;
  @Input() editable=true;
  @Input() markers=[];

  marker:Marker;
  @Output() reLocation = new EventEmitter<Marker>();

  constructor() {
   }

  ngOnInit() {
    this.marker={
      latitude : this.latitude,
      longitude : this.longitude,
      draggable : this.draggable && this.editable,
      label : this.label 
    }
  }
  mapClicked($event: MouseEvent) {
    if(this.editable){
      this.marker.latitude= $event.coords.lat;
      this.marker.longitude= $event.coords.lng;
      this.reLocation.emit(this.marker);  
    }
  }
  
  markerDragEnd( $event: MouseEvent) {
    this.marker.latitude= $event.coords.lat;
    this.marker.longitude= $event.coords.lng;
    this.reLocation.emit(this.marker);
  }
  

}

interface Marker {
	latitude: number;
	longitude: number;
	label?: string;
	draggable: boolean;
}
