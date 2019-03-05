import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, Query} from '@angular/fire/firestore';
import {tap, take, scan, map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

// Options to reproduce firestore queries consistently
interface QueryConfig {
	path: string; // path to collection
	field: string; // field to orderBy
	limit?: number; // limit per query
	reverse?: boolean; // reverse order?
	prepend?: boolean; // prepend to source?
}

@Injectable()
export class PaginationService {

	// Source data
	private _done = new BehaviorSubject(false);
	private _loading = new BehaviorSubject(false);
	private _data = new BehaviorSubject([]);
	public deletedDoc: any =  {};

	private query: QueryConfig;

	// Observable data
	data: Observable<any>;
	done: Observable<boolean> = this._done.asObservable();
	loading: Observable<boolean> = this._loading.asObservable();

	constructor( private afs: AngularFirestore ) {
		// console.log('hh');

	}

	// Initial query sets options and defines the Observable
	init(path, field, syncField, opts?) {
		this.reset();
		this.query = {
			path,
			field,
			limit: 10,
			reverse: false,
			prepend: false,
			...opts
		};


		let first;
		if (Object.keys(this.query['filters']).length > 0) {
			first = this.handelFilters(this.query['filters']);
		} else {
			first = this.afs.collection(this.query.path, ref => {
				return ref
					.orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
					.limit(this.query.limit);
			});
		}

		this.mapAndUpdate(first);

		// Create the observable array for consumption in components
		this.data = this._data.asObservable().pipe(
			scan( (acc, val) => {
				// console.log(acc,this.deletedDoc);
				if (this.deletedDoc) {
					acc = acc.filter(item => item.doc.id !== this.deletedDoc.id);
					this.deletedDoc = {};
				}
				if (Object.keys(this.query['filters']).length > 0) {
					return this.syncFilteredData(acc, val, this.query['filters'], syncField);
				} else {
					acc = this.syncData(acc, val, syncField);
					return this.query.prepend ? val.concat(acc) : acc.concat(val);
				}
			}));
	}

	// Retrieves additional data from firestore
	more() {
		const cursor = this.getCursor();
		const more = this.afs.collection(this.query.path, ref => {
			return ref
				.orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
				.limit(this.query.limit)
				.startAfter(cursor);
		});
		this.mapAndUpdate(more);
	}

	// Determines the doc snapshot to paginate query
	private getCursor() {
		const current = this._data.value;
		if (current.length) {
			return this.query.prepend ? current[0].doc : current[current.length - 1].doc;
		}
		return null;
	}


	// Maps the snapshot to usable format the updates source
	private mapAndUpdate(col: AngularFirestoreCollection<any>) {

		if (this._done.value || this._loading.value) {
			return;
		}

		// loading
		this._loading.next(true);

		// Map snapshot with doc ref (needed for cursor)
		return col.snapshotChanges().pipe(
			map(arr => {
				// console.log(arr)
				let values = arr.map(snap => {
					const data = snap.payload.doc.data();
					const doc = snap.payload.doc;
					return { ...data, doc };
				});

				// If prepending, reverse array
				values = this.query.prepend ? values.reverse() : values;

				// update source with new values, done loading
				this._data.next(values);
				this._loading.next(false);

				// no more values, mark done
				if (!values.length) {
					this._done.next(true);
				}
			})).subscribe(res => {
			// console.log(res);
		});

	}

	// Reset the page
	reset() {
		this._data.next([]);
		this._done.next(false);
	}

	// Sync Data
	syncData(oldData, newData, syncField){
		if (oldData.length) {
			const syncedData = [];
			for (let i in oldData){
				let shared = false;
				for (let j in newData) {
					if (oldData[i][syncField] === newData[j][syncField]) {
						shared = true;
						break;
					}
				}
				if (!shared) {
					syncedData.push(oldData[i]);
				}
			}
			oldData = syncedData;
		}
		return oldData;
	}

	handelFilters(filters) {
		const first = this.afs.collection(this.query.path, ref => {
			let nQuery: Query = ref;
			for (const filter in filters) {
				if (filter == 'createdAt') {
					nQuery = nQuery.where(filter, '>',  filters[filter]);
				} else {
					nQuery = nQuery.where(filter, '==',  filters[filter]);
				}
			}
			return nQuery;
		});
		return first;
	}

	// Sync filtered Data
	syncFilteredData(oldData, newData, filters, syncField) {
		console.log(newData, filters);

		const syncedData = [];
		let oldAndNewData = [];
		for (let i in oldData){
			let shared = false;
			for (let j in newData) {
				if (oldData[i][syncField] === newData[j][syncField]) {
					shared = true;
					break;
				}
			}
			if (!shared) {
				syncedData.push(oldData[i]);
			}
		}
		oldAndNewData = syncedData.concat(newData);
		if (filters['createdAt'])
		{
			var  nextday = new Date(filters['createdAt'].getFullYear(), filters['createdAt'].getMonth(), filters['createdAt'].getDate() + 1);
		}
		console.log(nextday);
		for (const filter in filters) {
			const filteredArr =  [];
			for (const i in oldAndNewData) {
				if (oldAndNewData[i][filter] === filters[filter]) {
					filteredArr.push(oldAndNewData[i]);
				}

				if (filter === 'createdAt') {
					if (new Date(oldAndNewData[i][filter].seconds * 1000) > filters[filter]
						&& new Date(oldAndNewData[i][filter].seconds * 1000) < nextday
					) {
						filteredArr.push(oldAndNewData[i]);
					}
				}
			}
			oldAndNewData = filteredArr;
		}
		return oldAndNewData;
	}
}
