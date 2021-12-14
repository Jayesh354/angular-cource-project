import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients:Ingredient[]=[
    new Ingredient('Palak',100),
    new Ingredient('Paneer',250)
  ];
  constructor() { }

  ngOnInit(): void {
  }
  onIngredeintAdded(ingre:Ingredient){
      this.ingredients.push(ingre);
  }

}
