import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientChanged=new Subject<Ingredient[]>();
  ingredientEditStarted=new Subject<number>();
  private ingredients:Ingredient[]=[
    new Ingredient('Palak',100),
    new Ingredient('Paneer',250)
  ];

  getIngredients(){
    return this.ingredients.slice();
  }
  getIngredient(index:number){
    return this.ingredients[index];
  }
  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  updateIngredient(index:number,updatedIngredient:Ingredient){
    this.ingredients[index]=updatedIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
