import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService{
  recipeChanged=new Subject<Recipe[]>();


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

  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index];
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
  addIngredients(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
}
