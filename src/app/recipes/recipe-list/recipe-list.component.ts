import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  recipes!:Recipe[];
  subscription!:Subscription;

  constructor(private recipeService:RecipeService,
              private route:Router,
              private activeRout:ActivatedRoute) { }
  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeChanged.subscribe(
      (recipes:Recipe[])=>{
        this.recipes=recipes
    })
    this.recipes=this.recipeService.getRecipes();
  }
  onRecipeAdded(){
      this.route.navigate(['new'],{relativeTo:this.activeRout});
  }


}
