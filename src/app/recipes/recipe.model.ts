export class Recipe {
  public name:string;
  public description:string;
  public imagePath:string;

  constructor(name:string,disc:string,imgPath:string){

    this.name=name;
    this.description=disc;
    this.imagePath=imgPath;
  }
}
