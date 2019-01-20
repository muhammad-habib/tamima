import { BaseModel } from './_base.model';

export class CustomerModel  extends BaseModel {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	userName: string;
	gender: string;
	status: number; // 0 = Active | 1 = Suspended | Pending = 2
	dateOfBbirth: string;
	dob: Date;
	ipAddress: string;
	type: number; // 0 = Business | 1 = Individual

	phone:string;
	country:string;
	Verified:boolean;
	photo:string;
	name:string;
	address: [any];
	blocked:boolean; 
	// created_at:Date;
	// updated_at:Date;
	language:string;


	// latitude,
	// longitude,
	// address
	// title,
	// description
	// favorite



	clear() {
		this.dob = new Date();
		this.firstName = '';
		this.lastName = '';
		this.email = '';
		this.userName = '';
		this.gender = 'Female';
		this.ipAddress = '';
		this.type = 1;
		this.status = 1;
	}
}
