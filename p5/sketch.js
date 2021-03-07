
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


var gui;
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

var strokeThickness = 0.1;
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











function setup() 
{
  
  output = createCanvas(windowWidth / 3, windowWidth / 3, WEBGL);
  

  camera = createEasyCam();


  for(let i = 0; i < maxPoints; i++)
  {
    pointsArray.push(createVector(random(-maxDist, maxDist), random(-maxDist,maxDist), random(-maxDist, maxDist)));
    lerpArray.push(createVector(random(-maxDist, maxDist), random(-maxDist, maxDist), random(-maxDist, maxDist)));

    v3 = createVector(0, 0, 0);
    camera.zoom(25);

    timer = 20000;




  }
  
  
gui = createGui('Double Click/Tap me for parameters!');
gui.addGlobals('colourValueR', 'colourValueG', 'colourValueB', 'strokeThickness', 'canvasRotationX', 'canvasRotationY', 'canvasRotationZ');
gui.addButton("clearCanvas", function() {
  clearCanvas();
});

gui.addButton("saveOutput", function() {
  saveOutput();
});


gui.toggleCollapsed();
gui.setWidth(width);
gui.setPosition(x, y);

  


}

function draw() 
{

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

}


function windowResized()
{
  resizeCanvas(windowWidth / 3, windowWidth / 3);
  gui.setWidth(width);

  
}

function clearCanvas()
{
  clear();
}

function saveOutput()
{
 

  saveCanvas(output, "output", 'png');
}






