import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  subscription!:Subscription;
  editMode=false;
  editedIngredient!:Ingredient;
  editIndex!:number;
  @ViewChild('f') slForm!:NgForm;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription=this.shoppingListService.ingredientEditStarted.subscribe(
      (index:number)=>{
        this.editMode=true
        this.editIndex=index;
        this.editedIngredient=this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedIngredient.name,
          amount:this.editedIngredient.amount
        })

      }
      )
  }
  onSubmited(form:NgForm){
    const value=form.value;
    const newIngredient=new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editIndex,newIngredient);
    }
    else{
    this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode=false;
    form.reset();
  }
  onClear(){
    this.editMode=false;
    this.slForm.reset();
  }
  onDelete(){
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.onClear()
  }

}
