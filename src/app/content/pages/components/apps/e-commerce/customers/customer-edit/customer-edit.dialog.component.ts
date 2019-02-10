import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypesUtilsService } from '../../_core/utils/types-utils.service';
import { CustomersService } from '../../_core/services/index';
import { CustomerModel } from '../../_core/models/customer.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
	selector: 'm-customers-edit-dialog',
	templateUrl: './customer-edit.dialog.component.html',
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerEditDialogComponent implements OnInit {
	customer;
	customerDoc;
	customerForm: FormGroup;
	hasFormErrors: boolean = false;
	viewLoading: boolean = false;
	loadingAfterSubmit: boolean = false;
	userDoc:AngularFirestoreDocument<any>;
	private afs: AngularFirestore;

	constructor(public dialogRef: MatDialogRef<CustomerEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private customerService: CustomersService,
		private typesUtilsService: TypesUtilsService) { }
	/** LOAD DATA */
	ngOnInit() {
		this.customer = this.data.customer;
		this.customerDoc = this.data.customerDoc;
		this.createForm();

		// /* Server loading imitation. Remove this on real code */
		// this.viewLoading = true;
		// setTimeout(() => {
		// 	this.viewLoading = false;
		// }, 1000);
	}

	createForm() {
		console.log(this.customer);
		this.customerForm = this.fb.group({
			name: [this.customer.name, Validators.required],
			phone: [this.customer.phone,Validators.required],
			userName: [this.customer.name, Validators.required],
			blocked: [this.customer.blocked, Validators.required],
			language: [this.customer.language, Validators.required]
		});
	}

	/** UI */
	getTitle(): string {
		if (this.customer.id ) {
			return `Edit customer '${this.customer.name}'`;
		}

		return 'New customer';
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
		console.log('_customer', _customer);
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
		console.log(controls['blocked'].value);

		this.customerDoc.update({
			name 		: controls['name'].value,
			phone 		: controls['phone'].value,
			blocked 	: JSON.parse(controls['blocked'].value),
			language 	: controls['language'].value,
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
}
