import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes:Recipe[]=[
    new Recipe('Palak Panner','Malaidar Palak Panner','https://vaya.in/recipes/wp-content/uploads/2018/03/Palak-Paneer.jpg'),
    new Recipe('Manchurian','Dry Manchurian','http://www.theterracekitchen.in/wp-content/uploads/2019/08/089.-Veg-Manchurian-1.png')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
