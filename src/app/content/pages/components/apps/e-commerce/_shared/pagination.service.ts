import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
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

	private query: QueryConfig;

	// Observable data
	data: Observable<any>;
	done: Observable<boolean> = this._done.asObservable();
	loading: Observable<boolean> = this._loading.asObservable();

	constructor( private afs: AngularFirestore ) {

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
		console.log(this.query['filters'], Object.keys(this.query['filters']).length);
		if (Object.keys(this.query['filters']).length > 0) {
			console.log("fff");
		 	this.handelFilters(this.query['filters']);

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
				acc = this.syncData(acc, val, syncField);
				return this.query.prepend ? val.concat(acc) : acc.concat(val);
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
		console.log(filters);
		const query = this.afs.collection(this.query.path);
		for (const filter in filters) {
			console.log(filters[filter]);
			// query = query.where(...)
			// query = query.where(...)
			// query = query.where(...)
			// query = query.orderBy(...)
		}
		// query.get().then(...)

		// const first = this.afs.collection(this.query.path, ref => {
		// 	return ref
		// 		.orderBy(this.query.field, this.query.reverse ? 'desc' : 'asc')
		// 		.limit(this.query.limit);
		// });
	}
}
