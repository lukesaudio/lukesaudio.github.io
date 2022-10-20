let platform;
let turtle, turtlePNG;
let movement = 3
let bgImg;

var x1 = 0;
var x2;

var scrollSpeed = 2;

function setup() {
	createCanvas(windowWidth, windowHeight);

  bgImg = loadImage("sky.jpg");

  world.gravity.y = 10;

	platform = new Sprite(windowWidth / 2, windowHeight / 2, 500, 50);
  platform.collider = 'static';


  turtle = new Sprite(platform.x, platform.y - 100);
  let c = color(0, 0, 0, 0);
    turtle.color = c;
  turtlePNG = loadImage('turtle.png');
  
    turtle.bounciness = 0.2;

    x2 = windowWidth;

	
}

function draw() {
  background(0);
image(bgImg, 0, 0, windowWidth, windowHeight);

  
  camera.on();
  imageMode(CENTER);

  image(turtlePNG, turtle.x, turtle.y, turtlePNG.width / 1.3, turtlePNG.height / 1.3);
  

  if (kb.pressing('ArrowLeft') || kb.pressing('a')) turtle.vel.x = -movement;
  else if (kb.pressing('ArrowRight') || kb.pressing('d')) turtle.vel.x = movement;
  else turtle.vel.x = 0;


	camera.x = turtle.x;
	camera.y = turtle.y;


	if (turtle.vel.y > 10) 
  {
    camera.x = windowHeight;
		turtle.vel.x = cos(frame);
	}
}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
  platform.position(windowWidth / 2, windowHeight / 2);
  bgImg.resize(windowWidth, windowHeight);

}