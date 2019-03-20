import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypesUtilsService } from '../../_core/utils/types-utils.service';
import { CustomersService } from '../../_core/services/index';
import { CustomerModel } from '../../_core/models/customer.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'm-customer-show-dialog',
	templateUrl: './customer-show.dialog.component.html',
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerShowDialogComponent implements OnInit {
	customer;
	customerDoc;
	customerForm: FormGroup;
	hasFormErrors: boolean = false;
	viewLoading: boolean = false;
	loadingAfterSubmit: boolean = false;
	userDoc:AngularFirestoreDocument<any>;
	tempPhoto:string;

	constructor(public dialogRef: MatDialogRef<CustomerShowDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private customerService: CustomersService,
		private storage: AngularFireStorage,
		private typesUtilsService: TypesUtilsService) { }
	/** LOAD DATA */
	ngOnInit() {
		this.customer = this.data.customer;
		this.customerDoc = this.data.customerDoc;
		this.createForm();
		this.tempPhoto = this.customer.photo;
		// /* Server loading imitation. Remove this on real code */
		// this.viewLoading = true;
		// setTimeout(() => {
		// 	this.viewLoading = false;
		// }, 1000);
	}

	createForm() {
		// console.log(this.customer);
		this.customerForm = this.fb.group({
			name: [this.customer.name, Validators.required],
			phone: [this.customer.phone,Validators.required],
			userName: [this.customer.name, Validators.required],
			blocked: [this.customer.blocked ? 'true' : 'false', Validators.required],
			language: [this.customer.language, Validators.required]
		});
	}

	/** UI */
	getTitle(): string {
			return `${this.customer.name}`;
	}

	isControlInvalid(controlName: string): boolean {
		const control = this.customerForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	/** ACTIONS */
	prepareCustomer(): CustomerModel {
		const controls = this.customerForm.controls;
		const _customer = new CustomerModel();
		_customer.id = this.customer.id;
		_customer.name = controls['name'].value;
		_customer.phone = controls['phone'].value;
		_customer.blocked = controls['blocked'].value;
		_customer.language = controls['language'].value;
		// console.log('_customer', _customer);
		return _customer;
	}

	onSubmit() {
		this.hasFormErrors = false;
		this.loadingAfterSubmit = false;
		const controls = this.customerForm.controls;
		/** check form */
		if (this.customerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		// const editedCustomer = this.prepareCustomer();
		// console.log(controls['blocked'].value);

		this.customerDoc.update({
			name 		: controls['name'].value,
			phone 		: controls['phone'].value,
			blocked 	: JSON.parse(controls['blocked'].value),
			language 	: controls['language'].value,
			photo 		: this.tempPhoto?this.tempPhoto:this.customer.photo
			});

    	this.dialogRef.close({
				'customer':this.customer,
				isEdit: true
			});
	}

	updateCustomer(_customer: CustomerModel) {
		this.customer.
		this.loadingAfterSubmit = true;
		this.viewLoading = true;
		this.customerService.updateCustomer(_customer).subscribe(res => {
			/* Server loading imitation. Remove this on real code */
			this.viewLoading = false;
			this.viewLoading = false;
			this.dialogRef.close({
				_customer,
				isEdit: true
			});
		});
	}

	createCustomer(_customer: CustomerModel) {
		this.loadingAfterSubmit = true;
		this.viewLoading = true;
		this.customerService.createCustomer(_customer).subscribe(res => {
			this.viewLoading = false;
			this.dialogRef.close({
				_customer,
				isEdit: false
			});
		});
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	uploadPercent: Observable<number>;
	downloadURL: Observable<string>;
	isUploading = false;

	uploadFile(event) {
		const file = event.target.files[0];
		const filePath = 'profile_images/profile_'+this.customer.userId+(new Date()).getTime;
		const fileRef = this.storage.ref(filePath);
		const task = this.storage.upload(filePath, file);

		// observe percentage changes
		this.uploadPercent = task.percentageChanges();
		// get notified when the download URL is available
		this.isUploading= true;
		task.snapshotChanges().pipe(
			finalize(() =>  fileRef.getDownloadURL().subscribe(
				res=>{this.tempPhoto =res;
					this.isUploading= false;
				}
			) )
		 )
		.subscribe()
	  }


}
