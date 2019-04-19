import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Item } from '../models/Item'
import { Observable } from 'rxjs';
import { getFirstTemplatePass } from '@angular/core/src/render3/state';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(public afs: AngularFirestore) {
    this.items = this.afs.collection('results').valueChanges();
   }

   getItems(){
      return this.items;
  }

}

