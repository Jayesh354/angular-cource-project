import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{


  constructor(private shoppingListService:ShoppingListService){

  }
  recipeSelected=new EventEmitter<Recipe>();
  private recipes:Recipe[]=[
    new Recipe('Palak Panner','Malaidar Palak Panner','https://vaya.in/recipes/wp-content/uploads/2018/03/Palak-Paneer.jpg',
              [new Ingredient('Palak',50),
              new Ingredient('Panner',10)]),
    new Recipe('Manchurian','Dry Manchurian','http://www.theterracekitchen.in/wp-content/uploads/2019/08/089.-Veg-Manchurian-1.png',
              [new Ingredient('Manchurian',50),
              new Ingredient('Cabbage',1)])
  ];

  getRecipe(){
    return this.recipes.slice();
  }
  addIngredients(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
