import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service'
import { Item } from '../models/Item'

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  items: Item[];

  constructor(private itemService: ItemService) { }

  ngOnInit() {
    this.itemService.getItems().subscribe(items => {
      console.log(items);
      this.items = items;
    });
  }

}
