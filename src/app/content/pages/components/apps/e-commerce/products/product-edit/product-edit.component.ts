import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, forkJoin, from, of, BehaviorSubject } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import { ProductsService } from '../../_core/services/index';
import { SpecificationsService } from '../../_core/services/specification.service';
import { ProductRemarksService } from '../../_core/services/index';
import { ProductSpecificationsService } from '../../_core/services/index';
import { ProductModel } from '../../_core/models/product.model';
import { SpecificationModel } from '../../_core/models/specification.model';
import { TypesUtilsService } from '../../_core/utils/types-utils.service';
import { ListStateModel } from '../../_core/utils/list-state.model';
import { SubheaderService } from '../../../../../../../core/services/layout/subheader.service';
import { LayoutUtilsService, MessageType } from '../../_core/utils/layout-utils.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomersService } from '../../_core/services/index';
import { CustomerModel } from '../../_core/models/customer.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'm-product-edit',
	templateUrl: './product-edit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductEditComponent implements OnInit {
	product;
	oldProduct: ProductModel;
	selectedTab: number = 0;
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$ = this.loadingSubject.asObservable();
	productForm: FormGroup;
	hasFormErrors: boolean = false;

	public marketForm: FormGroup;
	marketDoc ;
    market;


	constructor(private activatedRoute: ActivatedRoute,
		private router: Router,
		private productsService: ProductsService,
		private typesUtilsService: TypesUtilsService,
		private fb: FormBuilder,
		public dialog: MatDialog,
		private afs: AngularFirestore,
		private subheaderService: SubheaderService,
		private layoutUtilsService: LayoutUtilsService) {

			this.loadingSubject.next(true);
			this.activatedRoute.queryParams.subscribe(params => {
				const id = params.id;
				console.log(id);			
				if (id ) {
					this.marketDoc = this.afs.doc('markets/'+id);
					this.marketDoc.valueChanges().subscribe(value=>this.market=value);
					console.log(this.market);
							this.createForm();
				} 
			});
	

		 }

	ngOnInit() {
	}

	initProduct() {
		this.createForm();
		this.loadLists();
		this.loadingSubject.next(false);
		if (!this.product.id) {
			this.subheaderService.setBreadcrumbs([
				{ title: 'eCommerce', page: '/ecommerce' },
				{ title: 'Products',  page: '/ecommerce/products' },
				{ title: 'Create product', page: '/ecommerce/products/add' }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit product');
		this.subheaderService.setBreadcrumbs([
			{ title: 'eCommerce', page: '/ecommerce' },
			{ title: 'Products',  page: '/ecommerce/products' },
			{ title: 'Edit product', page: '/ecommerce/products/edit', queryParams: { id: this.product.id } }
		]);
	}

	createForm() {
		this.marketForm = this.fb.group({
			name: [this.market.name, Validators.required],
			phone: [this.market.phone,Validators.required],
			userName: [this.market.name, Validators.required],
			blocked: [this.market.blocked, Validators.required],
			language: [this.market.language, Validators.required]
		});
	}

	loadLists() {
	}

	goBack(id = 0) {
		let _backUrl = 'ecommerce/markets';
			_backUrl += '?id=' + id;
		this.router.navigateByUrl(_backUrl);
	}

	refreshProduct(id = 0) {
		const _refreshUrl = 'ecommerce/markets/edit?id=' + id;
		this.router.navigateByUrl(_refreshUrl);
	}

	reset() {
		this.product = Object.assign({}, this.oldProduct);
		this.createForm();
		this.hasFormErrors = false;
		this.productForm.markAsPristine();
        this.productForm.markAsUntouched();
        this.productForm.updateValueAndValidity();
	}

	onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.productForm.controls;
		/** check form */
		if (this.productForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		// tslint:disable-next-line:prefer-const
		let editedProduct = this.prepareProduct();
		this.updateProduct(editedProduct, withBack);
	}

	prepareProduct(): ProductModel {
		const controls = this.productForm.controls;
		const _product = new ProductModel();
		_product.id = this.product.id;
		_product.model = controls['model'].value;
		_product.manufacture = controls['manufacture'].value;
		_product.modelYear = +controls['modelYear'].value;
		_product.mileage = +controls['mileage'].value;
		_product.description = controls['description'].value;
		_product.color = controls['color'].value;
		_product.price = +controls['price'].value;
		_product.condition = +controls['condition'].value;
		_product.status = +controls['status'].value;
		_product.VINCode = controls['VINCode'].value;
		_product._userId = 1; // TODO: get version from userId
		_product._createdDate = this.product._createdDate;
		_product._updatedDate = this.product._updatedDate;
		_product._updatedDate = this.typesUtilsService.getDateStringFromDate();
		_product._createdDate = this.product.id > 0 ? _product._createdDate : _product._updatedDate;
		_product._isNew = this.product.id > 0 ? false : true;
		_product._isUpdated = this.product.id > 0;
		return _product;
	}

	updateProduct(_product: ProductModel, withBack: boolean = false) {
	}


	onAlertClose($event) {
		this.hasFormErrors = false;
	}
}
