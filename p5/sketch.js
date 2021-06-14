

let pointsArray = [];
let lerpArray = [];

let maxPoints = 8;
let padding = 16; 

let step = 0.01;
let amount = 0;

let maxDist = 1000;

let v3;
let camera;

let timer;

let cheatsActive;

var gui;
var guiActive;
var colourValueR = 0;
var colourValueRMin = 0;
var colourValueRMax = 255;
var colourValueRStep = 1;

var colourValueG = 0;
var colourValueGMin = 0;
var colourValueGMax = 255;
var colourValueGStep = 1;

var colourValueB = 0;
var colourValueBMin = 0;
var colourValueBMax = 255;
var colourValueBStep = 1;

var strokeThickness = 0;
var strokeThicknessMin = 0.01;
var strokeThicknessMax = 1;
var strokeThicknessStep = 0.01;

var canvasRotationX = 0;
var canvasRotationXMin = 0;
var canvasRotationXMax = 10;
var canvasRotationXStep = 0.001;

var canvasRotationY = 0;
var canvasRotationYMin = 0;
var canvasRotationYMax = 10;
var canvasRotationYStep = 0.001;

var canvasRotationZ = 0;
var canvasRotationZMin = 0;
var canvasRotationZMax = 10;
var canvasRotationZStep = 0.001;

let output;

//Box Drawing

var fontForText;
var shouldDrawText;








function setup() 
{
    //____________________________________________________________________________________________________________ARTs

  colourValueR = random(0, 255);
  colourValueG = random(0, 255);
  colourValueB = random(0, 255);
  strokeThickness = random(0.01, 1);
  canvasRotationX = random(0, 10);
  canvasRotationY = random(0, 10);
  canvasRotationZ = random(0, 10);

  fontForText = loadFont('fonts/Manjari-Bold.ttf');
  shouldDrawText = true;
  cheatsActive= false;



  output = createCanvas(windowWidth / 3, windowWidth / 3, WEBGL);
  output.parent("sketchBox");
  

  camera = createEasyCam();


  for(let i = 0; i < maxPoints; i++)
  {
    pointsArray.push(createVector(random(-maxDist, maxDist), random(-maxDist,maxDist), random(-maxDist, maxDist)));
    lerpArray.push(createVector(random(-maxDist, maxDist), random(-maxDist, maxDist), random(-maxDist, maxDist)));

    v3 = createVector(0, 0, 0);
    camera.zoom(25);
    timer = 20000;

  }
  
  //____________________________________________________________________________________________________________GUI
  

  guiActive = false;


  //____________________________________________________________________________________________________________BOX DRAWING



}

function draw() 
{
  //____________________________________________________________________________________________________________ART



camera.rotateX(canvasRotationX);
camera.rotateY(canvasRotationY);
camera.rotateZ(canvasRotationZ);
  


 


stroke(colourValueR, colourValueG, colourValueB);
strokeWeight(strokeThickness);

  for(let i = 0; i < pointsArray.length; i++)
  {   

    let next = i+1;
    if(next >= pointsArray.length){ next = 0;} 

    if (amount > 1 || amount < 0) 
    { 
      step *= -1;
    }

    amount += step;

    v3 = p5.Vector.lerp(pointsArray[i], lerpArray[i], amount);

    pointsArray[i] = v3;

    let mouseXPos = map(mouseX, -100, 100);
  
    line(pointsArray[i].x, pointsArray[i].y, pointsArray[i].z, pointsArray[next].x, pointsArray[next].y, pointsArray[next].z);




  }

 
  if(shouldDrawText)
  {
    textFont(fontForText);
    textSize(20);
    stroke(255);
    strokeWeight(200);
    fill(255, 255, 255);
    switch(cheatsActive)
    {
      case false:
        text("welcome to lukesaudio", random(0, width), random(0, height));
        break;
      case true:
        text("Sunshine", random(0, width), random(0, height));
        break;
      default:
        text("welcome to lukesaudio", random(0, width), random(0, height));

        break;

        
    }
  }


}



function windowResized()
{
  if(windowWidth > 600)
  {
    resizeCanvas(windowWidth / 3, windowWidth / 3);

  }

  else
  {
    resizeCanvas(windowWidth, windowWidth);
    
  }

  if(windowWidth < 600)
  {
    if(gui)
    {
      gui.setWidth(windowWidth);
      gui.setPosition(0, 0);
    }
   
    


  }
  else
  {
    if(gui)
    {
      gui.setWidth(width);
      gui.setPosition(output.position().x,output.position().y);
  
    }

  }



  
}

function clearCanvas()
{
  clear();
}

function saveOutput()
{
    saveCanvas(output, "output", 'png');
}

function keyPressed()
{
  if(keyCode == 71)
  {
    if(!guiActive)
    {
      makeGUI();
      guiActive = true;

    }
  }
}

function toggleTextDrawing()
{
  switch(shouldDrawText)
  {
    case true:
      shouldDrawText = false;
      break;
    case false:
      shouldDrawText = true;
      break;
    default: shouldDrawText = true;
  }
}

function toggleCheats()
{
  cheatsActive = true;
}

function makeGUI()
{
  
gui = createGui('double click here for parameters. click and drag to move.'  );
gui.addGlobals('colourValueR', 'colourValueG', 'colourValueB', 'strokeThickness', 'canvasRotationX', 'canvasRotationY', 'canvasRotationZ');

gui.addButton("Refresh Canvas", function() {
  clearCanvas();
});

gui.addButton("Save Output", function() {
  saveOutput();
});

gui.addButton("Toggle Text Drawing", function() {
  toggleTextDrawing();
});

gui.addButton("u wan some cheets???", function() {
  toggleCheats();
});


gui.toggleCollapsed();
gui.setWidth(width);


gui.setPosition(output.position().x,output.position().y);

}






