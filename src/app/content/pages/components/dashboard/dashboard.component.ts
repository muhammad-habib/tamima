import { Component, OnInit } from '@angular/core';
import { CountService} from './count.serves'
import { HttpClient} from '@angular/common/http';
@Component({
	selector: 'm-dashboard',
	templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

	public requests;
	public users;
	public markets;
	public data = {};

	constructor(private http: HttpClient
	) {
		// this.subheaderService.setTitle('Dashboard');
		// this.getCountOf('orders');
		// this.getCountOf('users');
		// this.getCountOf('markets');
		// this.orders = 15;
		this.getLength('markets');
		this.getLength('users');
		this.getLength('requests');
	}

	ngOnInit(): void {
	}
	getLength(collection) {
		const url = 'https://us-central1-tamima-c05fc.cloudfunctions.net/countCollection?name='+collection;
		this.http.get(url).subscribe(
			data => {
				this.data[collection] = data['length'];
				console.log(this.data[collection],data);
			});
	}

	// getCountOf(type) {
	// 	return this.countService.getCount(type).subscribe(res=>{this.orders=res['length']
	// 	console.log(this.orders);
	// 	this.orders = 30;

	// })
	// }

}
