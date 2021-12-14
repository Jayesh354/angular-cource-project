import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private recipeService:RecipeService,
              private router:Router,
              private route:ActivatedRoute) { }
  recipe!:Recipe;
  id!:number;
  ngOnInit(): void {
    this.route.params.subscribe(
      (param:Params)=>{
          this.id = +param['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
      }
      )
  }
  onAddShoppingList(){
      this.recipeService.addIngredients(this.recipe.ingredients);
  }
  onRecipeEdit(){
      this.router.navigate(['edit'],{relativeTo:this.route})
     // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.route})
  }
}
