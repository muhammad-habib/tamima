import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../../_shared/firebase.service';
import { PaginationService } from '../../_shared/pagination.service';
import {reduce} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
	templateUrl: './orders-reports.component.html',
})
export class OrdersReportsComponent implements OnInit {
	// Table fields
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	// Selection
	selection = new SelectionModel<any>(true, []);
	// customersResult: CustomerModel[] = [];
	customersDoc: AngularFirestoreDocument<any>;
	sortField = 'createdAt';
	reverseDir = false;
	customers: Observable<any[]>;
	dataSource;
	displayedColumns = ['user', 'mobile', 'market', 'photo', 'price', 'createdAt'];
	@ViewChild(MatSort) sort: MatSort;
	public length: number;
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
	data: any[] = [];
	totalPrice = 0;
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
		this.page.data.subscribe(res => {
			this.totalPrice = 0;
			for (let obj of res) {
				if (obj.price)
					this.totalPrice += parseFloat(obj.price);
			}
		});

		// If the user changes the sort order, reset back to the first page.
	}
	getOrders() {
		this.page.init('requests', this.sortField, 'id', { reverse: this.reverseDir, prepend: false, 'filters': this.filters });
	}
	getOrdersLength() {
		const url = 'https://us-central1-tamima-c05fc.cloudfunctions.net/countCollection?name=requests';
		this.http.get(url).subscribe(
			data => {
				this.resultsLength = data['length'];
			});
	}


	scrollHandler(e) {
		if (e === 'bottom') {
			this.page.more();
		}

	}

	sortData($event) {
		this.sortField = $event.active;
		this.reverseDir = $event.direction == 'asc' || $event.direction == '' ? false : true;
		this.getOrders();
	}

	applyFilterOnMobile(filterValue: string) {
		if (filterValue) {
			this.filters['user.phone'] = filterValue;
			this.filters['market.phone'] = filterValue;
		}
		else {
			delete this.filters['user.phone'];
			delete this.filters['market.phone'];
		}
		this.getOrders();
	}

	orderStatusHandler(event) {
		if (event.value)
			this.filters['status.code'] = parseInt(event.value);
		else
			delete this.filters['status.code'];
		this.getOrders();
	}

}
