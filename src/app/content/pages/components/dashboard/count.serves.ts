import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
const API_PRODUCTSPECS_URL = 'https://us-central1-tamima-c05fc.cloudfunctions.net/countCollection';
// Real REST API
@Injectable()
export class CountService {
	constructor(private http: HttpClient) { }

    getCount(type:string): Observable<any> {
		const url = API_PRODUCTSPECS_URL + '?name=' + type;
		return this.http.get<any>(url);
	}

    
}

