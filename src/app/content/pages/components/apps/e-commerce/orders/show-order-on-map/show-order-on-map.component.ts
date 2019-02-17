import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'm-show-order-on-map',
  templateUrl: './show-order-on-map.component.html',
  styleUrls: ['./show-order-on-map.component.scss']
})
export class ShowOrderOnMapComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShowOrderOnMapComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
  }

}
