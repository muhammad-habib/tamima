import { Injectable } from '@angular/core';
import { ActionNotificationComponent } from '../../_shared/action-natification/action-notification.component';
import { MatSnackBar, MatDialog } from '@angular/material';

import { DeleteEntityDialogComponent } from '../../_shared/delete-entity-dialog/delete-entity-dialog.component';
import { VerifyEntityDialogComponent} from '../../_shared/verify-entity-dialog/verify-entity-dialog.component';
import { BlockEntityDialogComponent } from '../../_shared/block-entity-dialog/block-entity-dialog.component';
import { FetchEntityDialogComponent } from '../../_shared/fetch-entity-dialog/fetch-entity-dialog.component';
import { UpdateStatusDialogComponent } from '../../_shared/update-status-dialog/update-status-dialog.component';


export enum MessageType {
	Create,
	Read,
	Update,
	Delete
}

@Injectable()
export class LayoutUtilsService {
	constructor(private snackBar: MatSnackBar,
		private dialog: MatDialog) { }

	// SnackBar for notifications
	showActionNotification(
		message: string,
		type: MessageType = MessageType.Create,
		duration: number = 10000,
		showCloseButton: boolean = true,
		showUndoButton: boolean = false,
		undoButtonDuration: number = 3000,
		verticalPosition: 'top' | 'bottom' = 'top'
	) {
		return this.snackBar.openFromComponent(ActionNotificationComponent, {
			duration: duration,
			data: {
				message,
				snackBar: this.snackBar,
				showCloseButton: showCloseButton,
				showUndoButton: showUndoButton,
				undoButtonDuration,
				verticalPosition,
				type,
				action: 'Undo'
			},
			verticalPosition: verticalPosition
		});
	}

	// Method returns instance of MatDialog
	deleteElement(title: string = '', description: string = '', waitDesciption: string = ''
										,confirm:string='مسح',cancel:string='ألغاء') {
		return this.dialog.open(DeleteEntityDialogComponent, {
			data: { title, description, waitDesciption,confirm,cancel },
			width: '440px'
		});
	}
	blockElement(title: string = '', description: string = '', waitDesciption: string = ''
										,confirm:string='حظر',cancel:string='ألغاء') {
		return this.dialog.open(BlockEntityDialogComponent, {
			data: { title, description, waitDesciption,confirm,cancel },
			width: '440px'
		});
	}

	verifyElement(title: string = '', description: string = '', waitDesciption: string = ''
											,confirm:string='اعتماد',cancel:string='ألغاء') {
		return this.dialog.open(VerifyEntityDialogComponent, {
			data: { title, description, waitDesciption,confirm,cancel },
			width: '440px'
		});
	}	
	// Method returns instance of MatDialog
	fetchElements(_data) {
		return this.dialog.open(FetchEntityDialogComponent, {
			data: _data,
			width: '400px'
		});
	}

	// Method returns instance of MatDialog
	updateStatusForCustomers(title, statuses, messages) {
		return this.dialog.open(UpdateStatusDialogComponent, {
			data: { title, statuses, messages },
			width: '480px'
		});
	}
}
