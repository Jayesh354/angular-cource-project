import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients!:Ingredient[];
  private ingChanged!:Subscription;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnDestroy(): void {
    this.ingChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients=this.shoppingListService.getIngredients();

    this.ingChanged = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients:Ingredient[])=>{
          this.ingredients=ingredients;
      }
    )
  }
  onSelect(index:number){
    this.shoppingListService.ingredientEditStarted.next(index);
  }


}
