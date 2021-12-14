import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
  public name:string;
  public description:string;
  public imagePath:string;
  public ingredients:Ingredient[]

  constructor(name:string,disc:string,imgPath:string,ingredeients:Ingredient[]){

    this.name=name;
    this.description=disc;
    this.imagePath=imgPath;
    this.ingredients=ingredeients;
  }
}
