let distances = [];
let stepX;
let stepY;
let currentY;
let maxSteps;
let prevPos;
let index;

let exceededHeight = false;

let backgroundColourPicker;



//GUI
var information;
var sqaureSize;
var squareSizeRandom;

var shapeColour;
var shapeColourAlpha;

var strokeColour;
var strokeColourAlpha;

var backgroundColour;
var backgroundColourAlpha;



let pauseButton;
let userPaused;



let resetButton;

let colourChanged;
let canSetBackground;

let showGUI;

//timer   
let ra=0, rb=0, startT, deltaT = 1000, doit = false;


function setup() 
{
  var gui = createGui('Colour Picker GUI');
  information = "Press P to start/pause - Press the Space bar to reset the canvas to use your new colour, and then press P to restart";
  squareSize = 20;
  squareSizeRandom = false;

  shapeColour =  '#4F4D92';
  shapeColourAlpha = 50;

  strokeColour = '#ffffff';
  strokeColourAlpha = 0;

  backgroundColour = '#ffffff';






  gui.addGlobals('information', 'squareSize', 'squareSizeRandom', 'shapeColour','shapeColourAlpha', 'strokeColour', 'strokeColourAlpha', 'backgroundColour');
  



  //----------------------------------------------------------------------------------------VARIABKLE INITIALISE 

  createCanvas(windowWidth, windowHeight);
  


  stepX = 4;  
  stepY = 20;
  currentY = 0;
  frameRate(0); 
  canSetBackground = true;
  

  userPaused = true;


  prevPos = 0-stepX;
  maxSteps = 10000;

  index = 0;
  background(255, 255, 255);
  
 
  
  //----------------------------------------------------------------------------------------POINTS PLOTTING 

  while(!exceededHeight)
  {    
   if(prevPos + 4 < windowWidth)
   {
     
    distances[index] = createVector(prevPos + stepX, currentY + random(-20, 20));
    prevPos+=stepX;
    index++;

   }

   else
   {
    distances[index] = createVector(0, 0);
    prevPos = 0-stepX;
    currentY += random(20, 50);

   }

   if(currentY > windowHeight)
   {
     exceededHeight = true;
   }


  }


   
  //----------------------------------------------------------------------------------------TIMER 
  startT=millis();

  
  //----------------------------------------------------------------------------------------RESET INDEX COUNTER
  index = 0;




}

function draw() 
{

    if(canSetBackground)
    {
      var backgroundColourRGB= color(backgroundColour);
      var r = backgroundColourRGB._getRed();
      var g = backgroundColourRGB._getGreen();
      var b = backgroundColourRGB._getBlue();      

      background(r, g, b);
      
      canSetBackground = false;
    }



  //----------------------------------------------------------------------------------------DRAW SQUARES



  var strokeColourRGB= color(strokeColour);
  var r = strokeColourRGB._getRed();
  var g = strokeColourRGB._getGreen();
  var b = strokeColourRGB._getBlue();
  
  stroke(r, g, b, strokeColourAlpha);

  var shapeColorRGB= color(shapeColour);
  r = shapeColorRGB._getRed();
  g = shapeColorRGB._getGreen();
  b = shapeColorRGB._getBlue();

  fill(r, g, b, shapeColourAlpha);

  if(squareSizeRandom)
  {
    square(distances[index].x, distances[index].y, random(10, 100));

  }
  else
  square(distances[index].x, distances[index].y, squareSize);

  index++;


}


function pauseSquares()
{
 switch(userPaused)
 {
   case true: userPaused = false;
   frameRate(60);
   
   break;
   case false: userPaused = true;
   frameRate(0);
   break;
   default: userPaused = true;
   break;
 }
}

function resetCanvas()
{
  index = 0;
  background(255, 255, 255);
  userPaused = true;
  canSetBackground = true;
  frameRate(0);
}

function toggleStroke()
{

}

function keyPressed() 
{

  if(keyCode === 32) //SPACE
  {
    resetCanvas();
  }

  if (keyCode === 71) // KEY G
  {
    if(showGUI) showGUI = false;
    else showGUI = true;
  } 
  else {
    value = 0;
  }

  if(keyCode === 80) //KEY P
  {
    pauseSquares();
  }



 

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}