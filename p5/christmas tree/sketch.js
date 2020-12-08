let topPadding;

let pointsArray = [];
let pointsArrayLeft = [];


let startPoint;
let nextPoint; 

let maxLayerLength;

let newLayerWidth;
let newLayerHeight;

let treeLayers;

let endMiddlePoint;





function setup() 
{
  createCanvas(1000, 1000);
  topPadding = 16;
  treeLayers = 15;
  maxLayerLength = width * 0.9;

  

  startPoint = createVector(width/2, topPadding);
  endMiddlePoint = createVector(0, 0);
  pointsArray.push(startPoint);
  pointsArrayLeft.push(startPoint);

  circle(pointsArray[0].x, pointsArray[0].y, 10)
  



}

function draw() 
{
  


  rotate(random(0, 4));
  translate(millis());
  strokeWeight(2);

  for(let i = 0; i < treeLayers; i+=2)
  {
    newLayerWidth = random((i * i) + 20, ((i * i) * 2) + 20);
    newLayerHeight = random((i * i), (i*i));

    let firstPoint = createVector(pointsArray[i].x + newLayerWidth, pointsArray[i].y + newLayerHeight);
    let firstPointLeft = createVector(pointsArray[i].x - newLayerWidth, pointsArray[i].y + newLayerHeight);

    
    pointsArray.push(firstPoint);
    pointsArrayLeft.push(firstPointLeft);
  
    let nextPoint = createVector(firstPoint.x - newLayerWidth, firstPoint.y);
    let nextPointLeft = createVector(firstPoint.x + newLayerWidth, firstPoint.y);

    pointsArray.push(nextPoint);
    pointsArrayLeft.push(nextPointLeft);

    drawTree(i);
 



    endMiddlePoint.x = pointsArray[i+2].x;
    endMiddlePoint.y = pointsArray[i+2].y;



  }

  fill('brown');
  rect(endMiddlePoint.x -20, endMiddlePoint.y, 40, endMiddlePoint.y + height);

  noFill();
  
  

  
  for(let i = 0; i < treeLayers; i+=2)
  {
   
    drawBaubles(i);
    drawTinsel(i, newLayerHeight);

  }

  fill('gold')
  star(startPoint.x, startPoint.y, 10, 5, 5);
  noFill();

  drawBackground();


 

}

function drawTree(i)
{
  line(pointsArray[i].x, pointsArray[i].y, pointsArray[i+1].x, pointsArray[i+1].y);
  line(pointsArray[i+1].x, pointsArray[i+1].y, pointsArray[i+2].x, pointsArray[i+2].y);

  line(pointsArray[i].x, pointsArray[i].y, pointsArrayLeft[i+1].x, pointsArrayLeft[i+1].y);
  line(pointsArrayLeft[i+1].x, pointsArrayLeft[i+1].y, pointsArray[i+2].x, pointsArray[i+2].y);

  

}

function drawBaubles(i)
{
  fill('white');
  circle(pointsArray[i+1].x, pointsArray[i+1].y, i*2);
  circle(pointsArrayLeft[i+1].x, pointsArrayLeft[i+1].y, i*2);
  noFill();

}

function drawTinsel(i, layerHeight)
{
  fill('royalblue');
  arc((pointsArrayLeft[i+1].x + pointsArray[i+1].x) / 2, pointsArrayLeft[i+1].y, pointsArray[i+1].x - pointsArrayLeft[i+1].x, layerHeight / 7, 0, PI, CHORD);
  noFill();
}

function drawBackground()
{
  fill('green');
  rect(0, height-100, width, 100);
  noFill();
}

function star(x, y, radius1, radius2, npoints)
{
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

