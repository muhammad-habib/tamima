import {Component, OnInit, ElementRef, Output, ViewChild, ChangeDetectionStrategy} from '@angular/core';
// Material
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatSnackBar, MatDialog, MatTable, MatTableDataSource} from '@angular/material';
// RXJS
import {debounceTime, distinctUntilChanged, tap, map, startWith, switchMap, catchError} from 'rxjs/operators';
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
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
	selector: 'm-customers-list',
	templateUrl: './customers-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersListComponent implements OnInit {
	// Table fields
	// Filter fields
	@ViewChild('searchInput') searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	// Selection
	selection = new SelectionModel<CustomerModel>(true, []);
	customersResult: CustomerModel[] = [];

	customersDoc: AngularFirestoreDocument<any>;
	customers: Observable<any[]>;

	dataSource;
	displayedColumns = ['name', 'country', 'language', 'phone', 'blocked', 'actions'];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatTable) myTable: MatTable<any>;
	public length: number;
	resultsLength = 0;
	isLoadingResults = true;
	isRateLimitReached = false;
	data: any;
	resultsPerPage = 3;
	query = new FormControl();
	block = new FormControl();
	status = new FormControl();
	nextPage = new FormControl();
	items: Observable<any[]>;
	hiddenPagination = false;

	constructor(
		private customersService: CustomersService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private afs: AngularFirestore,
		private http: HttpClient,
	) {
		this.dataSource = new MatTableDataSource<any>([]);
		this.query.setValue('');
		this.status.setValue('');
		this.block.setValue('');
		this.nextPage.setValue('');
	}

	/** LOAD DATA */
	ngOnInit() {
		this.getUsersLength();
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
		this.query.valueChanges.subscribe(value => {
		});
		this.block.valueChanges.subscribe(value => {
		});
		this.status.valueChanges.subscribe(value => {
		});
		this.nextPage.valueChanges.subscribe(value => {
		});
		this.loadUsersList(
			this.nextPage.valueChanges,
			this.block.valueChanges,
			this.status.valueChanges,
			this.query.valueChanges,
			this.sort.sortChange,
			this.paginator.page
		);
	}

	loadUsersList(lastMarketId, block, status, query, sortChange = null, page = null) {
		merge(lastMarketId, block, status, query, sortChange, page)
			.pipe(
				startWith({}),
				switchMap(() => {
					this.isLoadingResults = true;
					return this.getUsersListService(
						this.nextPage.value,
						this.status.value,
						this.block.value,
						this.query.value,
						this.sort.active,
						this.sort.direction,
						this.paginator.pageIndex + 1,
						this.resultsPerPage
					);
				}),
				map(data => {
					// Flip flag to show that loading has finished.
					this.isLoadingResults = false;
					this.isRateLimitReached = false;
					return data;
				}),
				catchError(() => {
					this.isLoadingResults = false;
					// Catch if the API has reached its rate limit. Return empty data.
					this.isRateLimitReached = true;
					return observableOf([]);
				})
			).subscribe(data => {
			this.data = data;
		});
	}

	getUsersListService(nextPage: any, status: any, block: any, query: string, sort: string, order: string, page: number, resultsPerPage): Observable<any> {
		return this.afs.collection('users', ref => {
			console.log(nextPage);
			if (nextPage === 1) {
				return ref.limit(resultsPerPage).orderBy('userId', 'asc').startAfter(this.data[this.data.length - 1].userId);
			} else if (nextPage === 0) {
				if (this.data[0].forward === 1) {
					return ref.limit(resultsPerPage).orderBy('userId', 'desc').startAfter(this.data[0].userId);
				} else {
					return ref.limit(resultsPerPage).orderBy('userId', 'desc').startAfter(this.data[this.data.length - 1].userId);
				}
			} else {
				if (status && !block && !query) {
						status = (status == 'true');
						this.hiddenPagination = true;
						return ref.where('verified', '==', status);
				}

				if (status && block && !query) {
					block = (block == 'true');
					status = (status == 'true');
					this.hiddenPagination = true;
					return ref.where('blocked', '==', block)
						.where('verified', '==', status);
				}

				if (query && status && block) {
					block = (block == 'true');
					status = (status == 'true');
					this.hiddenPagination = true;
					return ref.where('name', '==', query)
						.where('blocked', '==', block)
						.where('verified', '==', status);
				}

				if (query && status && !block) {
					status = (status == 'true');
					this.hiddenPagination = true;
					return ref.where('name', '==', query)
						.where('verified', '==', status);
				}

				if (query && !status && block) {
					block = (block == 'true');
					this.hiddenPagination = true;
					return ref.where('name', '==', query)
						.where('blocked', '==', block);
				}

				if (query && !status && !block) {
					this.hiddenPagination = true;
					return ref.where('name', '==', query);
				}

				if (!query && !status && block) {
					block = (block == 'true');
					this.hiddenPagination = true;
					return ref.where('blocked', '==', block);
				}
				this.hiddenPagination = false;
				return ref.limit(resultsPerPage).orderBy('userId', 'asc');
			}
		}).snapshotChanges().pipe(
			map(actions => actions.map(a => {
				this.data = a.payload.doc.data();
				this.data['forward'] = nextPage;
				const id = a.payload.doc.id;
				return {id, ...this.data};
			})));
	}

	/** FILTRATION */
	filterConfiguration(isGeneralSearch: boolean = true): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;

		if (this.filterStatus && this.filterStatus.length > 0) {
			filter.status = +this.filterStatus;
		}

		if (this.filterType && this.filterType.length > 0) {
			filter.type = +this.filterType;
		}

		filter.lastName = searchText;
		if (!isGeneralSearch) {
			return filter;
		}

		filter.firstName = searchText;
		filter.email = searchText;
		filter.ipAddress = searchText;
		return filter;
	}

	/** ACTIONS */
	/** Delete */
	deleteCustomer(user) {
		const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_SIMPLE.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.afs.collection('users', ref => {
				const th = this;
				ref.doc(user.id).delete().then(function() {
					th.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
				}).catch(function(error) {
					console.error("Error removing document: ", error);
				});
			});
		});
	}

	deleteCustomers() {
		const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const idsForDeletion: number[] = [];
			for (let i = 0; i < this.selection.selected.length; i++) {
				idsForDeletion.push(this.selection.selected[i].id);
			}
			this.customersService
				.deleteCustomers(idsForDeletion)
				.subscribe(() => {
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
					// this.loadCustomersList();
					this.selection.clear();
				});
		});
	}

	toggleCustomerBlock(_item: CustomerModel){		
		const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_MULTY.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_MULTY.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_MULTY.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.BLOCK_CUSTOMER_MULTY.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			const idsForDeletion: number[] = [];
			for (let i = 0; i < this.selection.selected.length; i++) {
				idsForDeletion.push(this.selection.selected[i].id);
			}

			let customerDoc = this.afs.doc('users/'+_item.id);	
			if(customerDoc){
				customerDoc.update({'blocked':!_item.blocked}).then(d=>{
					this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Update);
					this.selection.clear();
				});	
			}
		});
	}

	/** Fetch */
	fetchCustomers() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.lastName}, ${elem.firstName}`,
				id: elem.id.toString(),
				status: elem.status
			});
		});
		this.layoutUtilsService.fetchElements(messages);
	}

	addCustomer() {
		const newCustomer = new CustomerModel();
		newCustomer.clear(); // Set all defaults fields
		this.editCustomer(newCustomer);
	}

	/** Edit */
	editCustomer(customer: CustomerModel) {
		let saveMessageTranslateParam = 'ECOMMERCE.CUSTOMERS.EDIT.';
		saveMessageTranslateParam += customer.id > 0 ? 'UPDATE_MESSAGE' : 'ADD_MESSAGE';
		const _saveMessage = this.translate.instant(saveMessageTranslateParam);
		const _messageType = customer.id > 0 ? MessageType.Update : MessageType.Create;
		const dialogRef = this.dialog.open(CustomerEditDialogComponent, {data: {customer}});
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			this.layoutUtilsService.showActionNotification(_saveMessage, _messageType, 10000, true, false);
			// this.loadCustomersList();
		});
	}

	/** SELECTION */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.customersResult.length;
		return numSelected === numRows;
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
				return 'Blocked';
			case false:
				return 'Un Blocked';
		}
		return '';
	}

	getItemCssClassByType(status: number = 0): string {
		switch (status) {
			case 0:
				return 'accent';
			case 1:
				return 'primary';
			case 2:
				return '';
		}
		return '';
	}

	getItemTypeString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'Business';
			case 1:
				return 'Individual';
		}
		return '';
	}

	onPaginateChange(event) {
		if (event.pageIndex > event.previousPageIndex) {
			this.nextPage.setValue(1);
		} else if (event.pageIndex < event.previousPageIndex) {
			this.nextPage.setValue(0);
		}
	}

	getUsersLength() {
		const url = 'https://us-central1-tamima-c05fc.cloudfunctions.net/countCollection?name=users';
		this.http.get(url).subscribe(
			data => {
				this.resultsLength = data['length'];
			});
	}

	verifyChangedHandler($event) {
		this.status.setValue($event.value);
	}

	blockChangedHandler($event) {
		this.block.setValue($event.value);
	}

	applyFilter(filterValue: string) {
		this.query.setValue(filterValue);
	}
}
