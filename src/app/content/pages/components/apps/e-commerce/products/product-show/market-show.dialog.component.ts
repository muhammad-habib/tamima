import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypesUtilsService } from '../../_core/utils/types-utils.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
	selector: 'm-markets-show-dialog',
	templateUrl: './market-show.dialog.component.html',
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketShowDialogComponent implements OnInit {
	market;
	marketDoc;
	marketForm: FormGroup;
	hasFormErrors: boolean = false;
	viewLoading: boolean = false;
	loadingAfterSubmit: boolean = false;
	userDoc:AngularFirestoreDocument<any>;
	tempPhoto={market:'',licence:''};
	tempGeo = {latitude:'',longitude:''};

	constructor(public dialogRef: MatDialogRef<MarketShowDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private fb: FormBuilder,
		private storage: AngularFireStorage,
		private typesUtilsService: TypesUtilsService) { }
	/** LOAD DATA */
	ngOnInit() {
		this.market = this.data.market;
		this.marketDoc = this.data.marketDoc;
		console.log(this.market)
		this.createForm();
		this.tempPhoto['market'] = this.market.photo;
		this.tempPhoto['licence'] = this.market.licencePhoto;
		this.tempGeo.latitude = this.market.l?this.market.l[0]:'';
		this.tempGeo.longitude = this.market.l?this.market.l[1]:'';
		// /* Server loading imitation. Remove this on real code */
		// this.viewLoading = true;
		// setTimeout(() => {
		// 	this.viewLoading = false;
		// }, 1000);
	}

	createForm() {
		// console.log(this.market);
		this.marketForm = this.fb.group({
			name: [this.market.name, Validators.required],
			phone: [this.market.phone,Validators.required],
			userName: [this.market.name, Validators.required],
			blocked: [this.market.blocked, Validators.required],
			verified: [this.market.verified, Validators.required],
			language: [this.market.language, Validators.required],
			status: [this.market.status, Validators.required],
			country: [this.market.country, Validators.required]
		});
		this.marketForm.get(name).disable();

	}

	/** UI */
	getTitle(): string {
			return `${this.market.name}`;
	}

	isControlInvalid(controlName: string): boolean {
		const control = this.marketForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

	onSubmit() {
		this.hasFormErrors = false;
		this.loadingAfterSubmit = false;
		const controls = this.marketForm.controls;
		/** check form */
		if (this.marketForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

		// const editedMarket = this.prepareMarket();
		// console.log(controls['blocked'].value);

		this.marketDoc.update({
			name 		: controls['name'].value,
			phone 		: controls['phone'].value,
			country 	: controls['country'].value,
			status 		: controls['status'].value,
			blocked 	: JSON.parse(controls['blocked'].value),
			verified 	: JSON.parse(controls['verified'].value),
			language 	: controls['language'].value,
			photo 		: this.tempPhoto['market']?this.tempPhoto['market']:this.market.photo,
			licencePhoto: this.tempPhoto['licence']?this.tempPhoto['licence']:this.market.licencePhoto,
			l 		    : [ this.tempGeo['latitude'],this.tempGeo['longitude']]
			});

    	this.dialogRef.close({
				'market':this.market,
				isEdit: true
			});
	}

	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	uploadPercent: Observable<number>;
	downloadURL: Observable<string>;
	isUploading = false;

	uploadFile(event,imageType) {
		const file = event.target.files[0];
		const filePath = 'profile_images/'+imageType+'_profile_'+this.market.userId+(new Date()).getTime;
		const fileRef = this.storage.ref(filePath);
		const task = this.storage.upload(filePath, file);

		// observe percentage changes
		this.uploadPercent = task.percentageChanges();
		// get notified when the download URL is available
		this.isUploading= true;
		task.snapshotChanges().pipe(
			finalize(() =>  fileRef.getDownloadURL().subscribe(
				res=>{this.tempPhoto[imageType] =res;
					this.isUploading= false;
				}
			) )
		 )
		.subscribe();
	  }

	  changeMarketLocation(location){
			this.tempGeo.latitude = location.latitude;
			this.tempGeo.longitude = location.longitude;
	  }


}
