
let customFont;
let pizzajohn;
let pizza; 

let s1, s2;
let gravity = 9.0;
let mass = 2.0;

function preload() 
{
  customFont = loadFont('/projects/nerdfArters/16/Righteous-Regular.ttf');
  pizzajohn = loadImage('/projects/nerdfArters/16/pizzajohnBIG.png');
  pizza = loadImage('/projects/nerdfArters/16/pizzaPNG.png');
  pizzaCursor = pizza;
  pizzaCursor.size(16, 16);


}


let buttonHours;
let buttonMinutes;
let buttonSeconds;

let userSelection = 0;



function setup() 
{
  createCanvas(windowWidth, windowHeight);



  textFont(customFont);
  textSize(width / 25);
  textAlign(CENTER, CENTER);

  buttonHours = createButton('Hours');
  buttonHours.size(windowWidth / 5, 100);
  buttonHours.position(((windowWidth / 2 - windowWidth * 0.1) - buttonHours.width) - ((windowWidth / 5) / 2), 0);
  buttonHours.mousePressed(changeHours);

  buttonMinutes = createButton('Minutes');
  buttonMinutes.size(windowWidth / 5, 100);

  buttonMinutes.position((windowWidth / 2) - ((windowWidth / 5) / 2), 0);
  buttonMinutes.mousePressed(changeMinutes);

  buttonSeconds = createButton('Seconds');
  buttonSeconds.size(windowWidth / 5, 100);

  buttonSeconds.position(((windowWidth / 2 + windowWidth * 0.1) + buttonSeconds.width) - ((windowWidth / 5) / 2), 0);
  buttonSeconds.mousePressed(changeSeconds);

  //PHYSICS TIME
  s1 = new Spring2D(0.0, width / 2, mass, gravity);
  s2 = new Spring2D(0.0, width / 2, mass, gravity);
  s3 = new Spring2D(0.0, width / 2, mass, gravity);
  s4 = new Spring2D(0.0, width / 2, mass, gravity);




}

function draw() 
{

  image(pizzajohn, 0, 0);
  cursor(pizza);


  const d = new Date();
  let hours = d.getHours();
  let minutes = (hours*60) + d.getMinutes();
  let seconds = (hours * 60 * 60) + d.getSeconds();

  let hoursLeft = 24 - hours;
  let minutesLeft = (24*60) - minutes;
  let secondsLeft = (24*60*60) - seconds;

  let finalHours = "Hours remaining: " + hoursLeft;
  let finalMinutes = "Minutes remaining: " + minutesLeft;
  let finalSeconds = "Seconds remaining: " + secondsLeft;

  let finalCountdown;

  switch(userSelection)
  {
    case 0:
      finalCountdown = finalHours;
      break;
    case 1: 
      finalCountdown = finalMinutes;
      break;
    case 2:
      finalCountdown = finalSeconds;
      break;
      default:
        finalCountdown = finalHours;


  }


  text("Committing to the bit: " + finalCountdown, windowWidth / 2, windowHeight / 2);
  fill(255);
  s1.update(mouseX, mouseY);
  s1.display(mouseX, mouseY);
  s2.update(s1.x, s1.y);
  s2.display(s1.x, s1.y);

  s3.update(s2.x, s2.y);
  s3.display(s2.x, s2.y);
  s4.update(s3.x, s3.y);
  s4.display(s3.x, s3.y);





}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
  resizeButtons();
  textSize(width / 25);
  
} 

function changeHours() {
  userSelection = 0;
}

function changeMinutes() 
{
  userSelection = 1;
}

function changeSeconds() {
  userSelection = 2;
}

function resizeButtons()
{
  buttonHours.size(windowWidth / 5, 100);
  buttonHours.position(((windowWidth / 2 - windowWidth * 0.1) - buttonHours.width) - ((windowWidth / 5) / 2), 0);

  buttonMinutes.size(windowWidth / 5, 100);
  buttonMinutes.position((windowWidth / 2) - ((windowWidth / 5) / 2), 0);


  buttonSeconds.size(windowWidth / 5, 100);
  buttonSeconds.position(((windowWidth / 2 + windowWidth * 0.1) + buttonSeconds.width) - ((windowWidth / 5) / 2), 0);



}

function Spring2D(xpos, ypos, m, g) {
  this.x = xpos;// The x- and y-coordinates
  this.y = ypos;
  this.vx = 0; // The x- and y-axis velocities
  this.vy = 0;
  this.mass = m;
  this.gravity = g;
  this.radius = 30;
  this.stiffness = 0.2;
  this.damping = 0.7;

  this.update = function(targetX, targetY) {
    let forceX = (targetX - this.x) * this.stiffness;
    let ax = forceX / this.mass;
    this.vx = this.damping * (this.vx + ax);
    this.x += this.vx;
    let forceY = (targetY - this.y) * this.stiffness;
    forceY += this.gravity;
    let ay = forceY / this.mass;
    this.vy = this.damping * (this.vy + ay);
    this.y += this.vy;
  }

  this.display = function(nx, ny) {
    image(pizza, this.x, this.y, 70,  70);
  }
}