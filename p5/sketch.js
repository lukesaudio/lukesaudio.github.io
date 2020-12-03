
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

function setup() 
{
  createCanvas(windowWidth / 3, windowWidth / 3, WEBGL);
  camera = createEasyCam();
  for(let i = 0; i < maxPoints; i++)
  {
    pointsArray.push(createVector(random(-maxDist, maxDist), random(-maxDist,maxDist), random(-maxDist, maxDist)));
    lerpArray.push(createVector(random(-maxDist, maxDist), random(-maxDist, maxDist), random(-maxDist, maxDist)));

    v3 = createVector(0, 0, 0);
    camera.zoom(25);

    timer = 20000;



    


  }


}

function draw() 
{

camera.rotateX(0.001);
camera.rotateY(0.001);
camera.rotateZ(0.001);




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



    if (millis() > timer)
    {
      clear();
      
      timer = timer + 20000;
    }


  }





}


function windowResized()
{
  resizeCanvas(windowWidth / 3, windowWidth / 3);
}


