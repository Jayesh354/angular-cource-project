import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode:boolean=false;
  id!:number;
  recipeForm!:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private recipeService:RecipeService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param:Params)=>{
      this.id= +param['id'];
      this.editMode=param['id']!=null;
      this.initForm();

    })
  }
  private initForm(){

    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);

    if(this.editMode){
      const recipe:Recipe=this.recipeService.getRecipe(this.id);

      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name':new FormControl(ingredient.name,Validators.required),
            'amount':new FormControl(ingredient.amount,
              [Validators.required,Validators.pattern(/^[1-9][0-9]*$/)])
          }))
        }
      }
    }

    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9][0-9]*$/)])
      })
    )
  }
  onSubmit(){


    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    else{
        this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.activatedRoute});
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onDeleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

}
