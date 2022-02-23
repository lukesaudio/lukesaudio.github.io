const { Vector } = require("c:/users/lukesaudio/.vscode/extensions/samplavigne.p5-vscode-1.2.8/p5types");

var backgroundImg, ufo, beam, platform;

var touchdown, gravitate;

var albums;

var currentlyCarrying;


var prevPosition;

function setup() {
  createCanvas(screen.availWidth,screen.availHeight );
  

  backgroundImg = loadImage('assets/background.png');


  ufo = createSprite(300, 150);
  ufo.maxSpeed = 6;
  ufo.friction = 0.02;
  ufo.setCollider("circle", 0,0, 20);

  var ufoGraphic = loadImage('assets/ufo.png');
  ufo.addImage(ufoGraphic);

  beam = createSprite(ufo.position.x, ufo.position.y + 35);
  beam.setCollider("rectangle", 0, 35, 600, 100);

  albums = new Group();

  touchdown = createSprite(500, 500);
  var touchdownGraphic = loadImage('assets/touchdown.jpg');
  touchdown.addImage(touchdownGraphic);

  gravitate = createSprite(800, 500);
  var gravitateGraphic = loadImage('assets/gravitate.jpg');
  gravitate.addImage(gravitateGraphic);

  albums.add(touchdown);
  albums.add(gravitate);  

  isCarrying = false;
  currentlyCarrying = "none";





} 

function draw() {
  background(backgroundImg);

 
  beam.position.x = ufo.position.x;
  beam.position.y = ufo.position.y + 335;
  

  if(keyDown("W"))
    {
    ufo.addSpeed(.3, 270);
    }

  if(keyDown("A"))
    {
    ufo.addSpeed(.3, 180);
    }

  if(keyDown("S"))
    {
    ufo.addSpeed(.3, 90);
    }

  if(keyDown("D"))
    {
    ufo.addSpeed(.3, 0);
    }

  if(keyDown(" "))
  {
    line(ufo.position.x - 300, ufo.position.y + 300, ufo.position.x + 300, ufo.position.y + 300) 

    if(albums.overlap(beam))
    {
      console.log("overlapping");  

      if(currentlyCarrying == "none")
      {
        console.log("Currently carrying == " + currentlyCarrying);  
        albums.overlap(beam, attach);
      }
    
      
    }


  }

  if(keyWentUp(" "))
  {
    isCarrying = false;
    currentlyCarrying = "none";
    console.log("isCarrying == " + isCarrying);
    console.log("Currently carrying == " + currentlyCarrying);  

  }








  drawSprites();
} 

function attach() 
{


if(this == touchdown)  
{
currentlyCarrying = "touchdown";
console.log("Currently carrying == " + currentlyCarrying);  


}
else if(this == gravitate)
{
  currentlyCarrying = "gravitate"
  console.log("Currently carrying == " + currentlyCarrying);  

}
else
{
  currentlyCarrying = "none"
  console.log("Currently carrying == " + currentlyCarrying);  

}


  
    
}
