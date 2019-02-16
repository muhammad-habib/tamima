import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { LayoutUtilsService } from '../../_core/utils/layout-utils.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../../_shared/firebase.service';
import { PaginationService } from '../../_shared/pagination.service';
import { ShowOrderOnMapComponent } from '../show-order-on-map/show-order-on-map.component';

@Component({
	selector: 'm-orders-list',
	templateUrl: './orders-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent implements OnInit {
	// Table fields
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	// Selection
	selection = new SelectionModel<any>(true, []);
	// customersResult: CustomerModel[] = [];

	customersDoc: AngularFirestoreDocument<any>;
	customers: Observable<any[]>;
	dataSource;
	displayedColumns = ['user','mobile','market','photo','price','createdAt'];
	@ViewChild(MatSort) sort: MatSort;
	public length: number;
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
	data: any[] = [];
	filters: any = {};
	query = new FormControl();
	nextPage = new FormControl();
	hiddenPagination = false;

	constructor(
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private translate: TranslateService,
		private afs: AngularFirestore,
		private http: HttpClient,
		private fs: FirebaseService,
		public page: PaginationService
	) {
	}



	/** LOAD DATA */
	ngOnInit() {
		this.getOrdersLength();
		this.getOrders();

		// If the user changes the sort order, reset back to the first page.
	}
	getOrders() {
		this.page.init('requests', 'createdAt', 'id', { reverse: false, prepend: false, 'filters': this.filters });
	}
	getOrdersLength() {
		const url = 'https://us-central1-tamima-c05fc.cloudfunctions.net/countCollection?name=requests';
		this.http.get(url).subscribe(
			data => {
				this.resultsLength = data['length'];
			});
	}

	editOrder(order){

		const dialogRef = this.dialog.open(ShowOrderOnMapComponent,{data: {order}});

		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			// this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, false);
		});

	}

	scrollHandler(e) {
		if (e === 'bottom') {
			this.page.more();
		}
		// if (e === 'top') {
		//   this.page.more()
		// }
	}

}
