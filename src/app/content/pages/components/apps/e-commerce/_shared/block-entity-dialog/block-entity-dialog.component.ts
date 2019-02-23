import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'm-block-entity-dialog',
	templateUrl: './block-entity-dialog.component.html'
})
export class BlockEntityDialogComponent implements OnInit {
	viewLoading: boolean = false;

	constructor(
		public dialogRef: MatDialogRef<BlockEntityDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	onYesClick(): void {
		/* Server loading imitation. Remove this */
		this.viewLoading = true;
		setTimeout(() => {
			this.dialogRef.close(true); // Keep only this row
		}, 2500);
	}
}
