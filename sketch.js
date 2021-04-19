var dog, happyDog, database, foodS, foodStock
var dogImg, dogHappyImg;



function preload()
{
  dogImg = loadImage("dogImg.png");
  dogHappyImg = loadImage("dogImg1.png");


}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);
  foodStock.set(50);
  


  
}


function draw() {  
  background("green")

  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappyImg);


   
  }

  if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg);

  }
}

if(foodS == 0){
  
  dog.addImage(dogImg);
  foodS = 50;

}



  drawSprites();
  textSize(17);
  fill("white");
  text("Long Press up arrow key to feed your pet Dog Shiro",50,50);
  fill("white");
  text("Milk Bottles Remaining  "+foodS,170,440);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

