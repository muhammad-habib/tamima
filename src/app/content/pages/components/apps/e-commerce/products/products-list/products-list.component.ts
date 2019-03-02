import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
// Material
import { MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
// RXJS
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { fromEvent, merge, Observable, BehaviorSubject, combineLatest } from 'rxjs';
// Services
import { ProductsService } from '../../_core/services/index';
import { LayoutUtilsService, MessageType } from '../../_core/utils/layout-utils.service';
import { SubheaderService } from '../../../../../../../core/services/layout/subheader.service';
// Models
import { ProductModel } from '../../_core/models/product.model';
import { ProductsDataSource } from '../../_core/models/data-sources/products.datasource';
import { QueryParamsModel } from '../../_core/models/query-models/query-params.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from '../../_shared/firebase.service';
import { PaginationService } from '../../_shared/pagination.service';
import { FormControl } from '@angular/forms';
import { MarketEditDialogComponent } from '../product-edit/market-edit.dialog.component';

// Table with EDIT item in new page
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/components/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	selector: 'm-products-list',
	templateUrl: './products-list.component.html',
	styles: ['table {width: 100%;}'],
})
export class ProductsListComponent implements OnInit {

	marketsDoc: AngularFirestoreDocument<any>;
	markets: Observable<any[]>;
	dataSource;
	displayedColumns = ['name', 'photo','licencePhoto','rateCount','rateRatio', 'phone', 'status' ,'blocked', 'actions'];
	@ViewChild(MatSort) sort: MatSort;
	public length: number;
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
	data: any[] = [];
	resultsPerPage = 3;
	items: Observable<any[]>;
	hiddenPagination = false;
	query = new FormControl();
	block = new FormControl();
	status = new FormControl();
	nextPage = new FormControl();
	filters: any = {};
	sortField = 'name';
	reverseDir = false;


	constructor(
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private afs: AngularFirestore,
		private http: HttpClient,
		private fs: FirebaseService,
		public page: PaginationService
	) {
	}
	ngOnInit() {
		this.query.setValue('');
		this.status.setValue('');
		this.block.setValue('');
		this.nextPage.setValue('');
		this.getMarkets();
	}

	getMarkets() {
		this.page.init('markets', this.sortField, 'marketId', { reverse: this.reverseDir, prepend: false, 'filters': this.filters });
	}

	scrollHandler(e) {
		if (e === 'bottom') {
			this.page.more();
		}
		// if (e === 'top') {
		//   this.page.more()
		// }
	}
	getItemCssClassByStatus(status: number = 0): string {
		switch (status) {
			case 0:
				return 'metal';
			case 1:
				return 'success';
			case 2:
				return 'danger';
		}
		return '';
	}
	getItemStatusString(status: boolean = false): string {
		switch (status) {
			case true:
				return 'Blocked';
			case false:
				return 'Un Blocked';
		}
		return '';
	}

	/** Delete */
	deleteMarket(market) {
		const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.DESCRIPTION');
		const _waitDescription: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			const customerDoc = this.afs.doc('markets/'+market.marketId);
			if (customerDoc) {
				this.page.deletedDoc = market.doc;
				customerDoc.delete().then(d => {
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
				});
			}
		});

	}
	toggleMarketBlock(_item){
		const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_SIMPLE.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_SIMPLE.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_SIMPLE.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_SIMPLE.MESSAGE');

		const dialogRef = this.layoutUtilsService.blockElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			let marketDoc = this.afs.doc('markets/'+_item.marketId);
			if(marketDoc){
				marketDoc.update({'blocked':!_item.blocked}).then(d=>{
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Update);
				});
			}
		});
	}



	/** Edit */
	editMarket(market) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
		saveMessageTranslateParam += market['marketId']? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = market['marketId']? MessageType.Update : MessageType.Create;
		let marketDoc = this.afs.doc('markets/'+market.marketId);

		const dialogRef = this.dialog.open(MarketEditDialogComponent, {data: {marketDoc,market}});
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, false);
			// this.loadMarketsList();
		});
	}


	statusChangedHandler($event) {
		if ($event.value)
			this.filters['status'] = $event.value;
		else
			delete this.filters['status'];
		this.getMarkets();

	}

	blockChangedHandler($event) {
		if ($event.value)
			switch ($event.value) {
				case 'true':
					this.filters['blocked'] = true;
					break;
				case 'false':
					this.filters['blocked'] = false;
					break;
			}
		else
			delete this.filters['blocked'];
		this.getMarkets();
	}

	applyFilter(filterValue: string) {
		if (filterValue)
			this.filters['name'] = filterValue;
		else
			delete this.filters['name'];
		this.getMarkets();
	}

	applyFilterOnMobile(filterValue: string) {
		if (filterValue)
			this.filters['phone'] = filterValue;
		else
			delete this.filters['phone'];
		this.getMarkets();
	}

	sortData($event) {
		this.sortField = $event.active;
		this.reverseDir = $event.direction == 'asc' || $event.direction == '' ? false : true;
		this.getMarkets();
	}


}

