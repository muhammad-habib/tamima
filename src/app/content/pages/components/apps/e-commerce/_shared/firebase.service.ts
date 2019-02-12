import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

import {AngularFirestore} from '@angular/fire/firestore';


@Injectable()
export class FirebaseService {

  users: any;

  constructor( private afs: AngularFirestore ) { }

  getUsers() {
    this.users = this.afs.collection('users').snapshotChanges().pipe(
		map(actions => actions.map(a => {
			const data = a.payload.doc.data();
			const id = a.payload.doc.id;
			return { id, ...data };
		})));
    return this.users;
  }
}
