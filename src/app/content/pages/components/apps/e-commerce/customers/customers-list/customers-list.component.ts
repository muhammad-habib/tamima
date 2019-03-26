import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
// Material
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, MatSnackBar, MatDialog, MatTable, MatTableDataSource} from '@angular/material';
// RXJS
import {debounceTime, distinctUntilChanged, tap, map, startWith, switchMap, catchError, scan} from 'rxjs/operators';
import {fromEvent, merge, forkJoin, Observable, of as observableOf} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
// Services
import {CustomersService} from '../../_core/services/index';
import {LayoutUtilsService, MessageType} from '../../_core/utils/layout-utils.service';
// Models
import {CustomerModel} from '../../_core/models/customer.model';
// Components
import {CustomerEditDialogComponent} from '../customer-edit/customer-edit.dialog.component';
import {AngularFirestoreDocument, AngularFirestore} from '@angular/fire/firestore';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {FirebaseService} from '../../_shared/firebase.service';
import {PaginationService} from '../../_shared/pagination.service';
import { CustomerShowDialogComponent } from '../customer-show/customer-show.dialog.component';

@Component({
	selector: 'm-customers-list',
	templateUrl: './customers-list.component.html',
	styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {
	// Table fields
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	// Selection
	selection = new SelectionModel<CustomerModel>(true, []);
	customersResult: CustomerModel[] = [];

	customersDoc: AngularFirestoreDocument<any>;
	customers: Observable<any[]>;
	dataSource;
	displayedColumns = ['name','photo', 'country', 'language', 'phone', 'blocked', 'actions'];
	@ViewChild(MatSort) sort: MatSort;
	public length: number;
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
	data: any[] = [];
	filters: any = {};
	query = new FormControl();
	nextPage = new FormControl();
	sortField = 'name';
	reverseDir = false;

	constructor(
		private customersService: CustomersService,
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

	getUsers() {
		this.page.init('users', this.sortField, 'userId', { reverse: this.reverseDir, prepend: false, 'filters': this.filters });

	}

	/** LOAD DATA */
	ngOnInit() {
		this.getUsersLength();
		this.getUsers();
		// If the user changes the sort order, reset back to the first page.
	}


	/** ACTIONS */
	/** Delete */
	deleteCustomer(user) {
		const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.DESCRIPTION');
		const _waitDescription: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDescription);

		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			const customerDoc = this.afs.doc('users/' + user.userId);
			// console.log(customerDoc);
			if (customerDoc) {
				this.page.deletedDoc = user.doc;
				customerDoc.delete().then(d => {
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
				});
			}
		});
	}

	toggleCustomerBlock(_item: CustomerModel){
		const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_SIMPLE.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_SIMPLE.DESCRIPTION');
		const _waitDescription: string = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_SIMPLE.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_SIMPLE.MESSAGE');
		const _blockOrUnBlock = _item.blocked?'فك الحظر':'حظر';
		const dialogRef = this.layoutUtilsService.blockElement(_title, _description, _waitDescription,_blockOrUnBlock);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const customerDoc = this.afs.doc('users/' + _item['userId']);
			if (customerDoc) {
				customerDoc.update({'blocked': !_item.blocked}).then(d => {
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Update);
				});
			}
		});
	}

	/** Edit */
	editCustomer(customer) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
		saveMessageTranslateParam += customer['userId']? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = customer['userId']? MessageType.Update : MessageType.Create;
		let customerDoc = this.afs.doc('users/'+customer.userId);

		const dialogRef = this.dialog.open(CustomerEditDialogComponent, {data: {customerDoc,customer}});
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, false);
			// this.loadCustomersList();
		});
	}


	masterToggle() {
		if (this.selection.selected.length === this.customersResult.length) {
			this.selection.clear();
		} else {
			this.customersResult.forEach(row => this.selection.select(row));
		}
	}

	/** UI */
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
				return 'محظور';
			case false:
				return 'غير محظور';
		}
		return '';
	}

	getUsersLength() {
		const url = 'https://us-central1-tamima-c05fc.cloudfunctions.net/countCollection?name=users';
		this.http.get(url).subscribe(
			data => {
				this.resultsLength = data['length'];
			});
	}


	verifyChangedHandler($event) {
		if ($event.value)
			switch ($event.value) {
				case 'true':
					this.filters['verified'] = true;
					break;
				case 'false':
					this.filters['verified'] = false;
					break;
			}
		else
			delete this.filters['verified'];
		this.getUsers();

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
		this.getUsers();
	}

	applyFilter(filterValue: string) {
		if (filterValue)
			this.filters['name'] = filterValue;
		else
			delete this.filters['name'];
		this.getUsers();
	}

	applyFilterOnMobile(filterValue: string) {
		if (filterValue)
			this.filters['phone'] = filterValue;
		else
			delete this.filters['phone'];
		this.getUsers();
	}

	scrollHandler(e) {
		if (e === 'bottom') {
			this.page.more();
		}
		// if (e === 'top') {
		//   this.page.more()
		// }
	}

	sortData($event) {
		// console.log($event);
		this.sortField = $event.active;
		this.reverseDir = $event.direction == 'asc' || $event.direction == '' ? false : true;
		this.getUsers();
	}

	showCustomer(customer){
		let marketData = this.afs.doc('users/'+customer.userId).valueChanges().subscribe(m=>{
			console.log(m)
			const dialogRef = this.dialog.open(CustomerShowDialogComponent, {data: {customer:m}});
			dialogRef.afterClosed().subscribe(res => {
				marketData.unsubscribe();
			});
	
		});		
	}
}
