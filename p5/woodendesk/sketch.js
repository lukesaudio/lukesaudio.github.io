var plankCoordinates = [];
var lineWiggle = [];

var plankStroke = [];
var plankStrokeWeight = [];
var plankSubDivColor = [];
var plankYMove = [];
var plankStroke2 = [];
var plankYMove2 = [];

let modifier = -5;
var plankColor = [];


var amountOfPlanks;
var amountOfWigglePoints;

let hasDrawnPlanks = false;

let coffeeStain;
let mastersDiss;
let undergradDiss;

var mDissX = 0;
var mDissY = 0;
var uDissX = 0;
var uDissY = 0;

var mouseXClick = 0;
var mouseYClick = 0;

var isDraggingM = false;
var isDraggingU = false;

let mastersOpen;
let undegradmastersOpen;





function preload()
{
  coffeeStain = loadImage('coffee.png');
  undergradDiss = loadImage('undergradDiss.png');
  mastersDiss = loadImage('mastersDiss.png');

}

function setup() 

{
  createCanvas(windowWidth, windowHeight);
  amountOfPlanks = 8;
  amountOfWigglePoints = 20;
  initWoodPlanks();

  mastersOpen = createButton('Open Document');
  mastersOpen.position(19, 19);
  
  undergradOpen = createButton('Open Document');
  undergradOpen.position(19, 19);
  


  uDissX = windowWidth/1.7;
  uDissY = windowHeight / 4
  
  mDissX = windowWidth / 10;
  mDissY = windowHeight / 10;


  mastersOpen.mousePressed(openDocuments(1));
  undergradOpen.mousePressed(openDocuments(0));
  


}

function draw() 
{
  background(color(137, 77, 39)); 


  drawPlanks();
  hasDrawnPlanks = true;

  
  

image(coffeeStain, windowWidth-700, 0, 700, 600);
image(undergradDiss, uDissX, uDissY);
undergradOpen.position(uDissX + undergradDiss.width/2 - (mastersOpen.width/2), uDissY + undergradDiss.height - 40);


image(mastersDiss, mDissX, mDissY);
mastersOpen.position(mDissX + mastersDiss.width/2 - (mastersOpen.width/2), mDissY + mastersDiss.height - 40);


}



function mouseDragged()
  {
    if(!isDraggingU)
    {
      if ((mouseX > mDissX - 150) && (mouseX < mDissX + 150))
      {
        if ((mouseY > mDissY - 150) && (mouseY < mDissY + 150)) 
        {
          mDissX = mouseX;
          mDissY = mouseY;
          isDraggingM = true;
        }
      }
      else
      {
        isDraggingM = false;
      }
    }


  if(!isDraggingM)
  {
    if ((mouseX > uDissX - 150) && (mouseX < uDissX + 150)) 
    {
      if ((mouseY > uDissY - 150) && (mouseY < uDissY + 150)) 
      {
        uDissX = mouseX;
        uDissY = mouseY;
        isDraggingU = true;
      }
      else
      {
        isDraggingU = false
      }

    }
  }
  
  }
  
  function mouseReleased(fxn)
    {
      isDraggingM = false;
      isDraggingU = false;
    }

function mouseTest()
{
  console("HEY HEY");
}

function mousePressed()
{
 
}

function initWoodPlanks()
{
  for(var i = 0; i <= amountOfPlanks; i++)
  {
    plankCoordinates.push(createVector(0, windowHeight / amountOfPlanks *  (i*1)));    

    plankStroke.push(color(random(17, 47), 17, 0, random(70, 120)));
    plankStrokeWeight.push(random(1, 7));
    plankSubDivColor.push(color(random(117, 147), 77, 39));
    plankYMove.push(random(1, 20));
    plankStroke2.push(color(0, 0, 0, random(20, 70)));
    plankYMove2.push(random(1, 80));
    plankColor.push(color(random(85, 105) - modifier, random(45, 55) - modifier, random(20, 30) - modifier));

  
  }
  
}

function drawPlanks()
{
  for(var i = 0; i <= amountOfPlanks; i++)
  {   
    stroke(plankStroke[i]);
    strokeWeight(3);

    line(plankCoordinates[i].x, plankCoordinates[i].y, windowWidth, plankCoordinates[i].y )

    let spaceLeft = plankCoordinates[i].y;
    strokeWeight(plankStrokeWeight[i]);
    drawRects(i);


    if(i+1 > amountOfPlanks)
    {

    }
    else
    {
      if(spaceLeft <= plankCoordinates[i + 1].y)
      {
        stroke(plankSubDivColor[i]);
        spaceLeft += plankYMove[i];
        line(0, spaceLeft, windowWidth, spaceLeft);
      }

    }

    
    spaceLeft = plankCoordinates[i].y;


    if(i < amountOfPlanks)
    {
      while(spaceLeft <= plankCoordinates[i + 1].y)
      {
        stroke(plankStroke2[i]);
        spaceLeft += plankYMove2[i];
        line(0, spaceLeft, windowWidth, spaceLeft);
      }
    }
 

  }

}

function drawRects(index)
{

  fill(plankColor[index]);

  rect(plankCoordinates[index].x, plankCoordinates[index].y, windowWidth, windowHeight/amountOfPlanks);
  
}

function openDocuments(index)
{
switch(index){
  case 0:
    window.open("https://lukesaudio.com/");
    break;
  case 1:
    window.open("https://lukesaudio.com/files/Luke%20Child%20Masters%20Dissertation.pdf");
    break;
  default:
    window.open('https://lukesaudio.com/files/Luke%20Child%20Masters%20Dissertation.pdf');
    break;
}
}



/*

function generateLineWiggle(yCoordinate)
{
  for(var i = 0; i <= amountOfWigglePoints; i++)
  {
    lineWiggle.push(windowWidth / amountOfWigglePoints * (i+1), yCoordinate + random(-2, 2));
  }
}
*/