
let customFont;
let pizzajohn;
let pizza; 

let s1, s2, s3, s4;
let gravity = 9.0;
let mass = 2.0;

const springs = [new Spring2D()];

function preload() 
{
  customFont = loadFont('/projects/nerdfArters/16/Righteous-Regular.ttf');
  pizzajohn = loadImage('/projects/nerdfArters/16/pizzajohnBIG.png');
  pizza = loadImage('/projects/nerdfArters/16/pizzaPNG.png');
 


}


let buttonHours;
let buttonMinutes;
let buttonSeconds;

let newPizza;
let currentPizzaCount = 1;

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

  
  newPizza = createButton('Summon New Pizza. Current Pizza Count: ' + currentPizzaCount);
  newPizza.size(windowWidth / 5, 100);
  newPizza.position((windowWidth / 2) - ((windowWidth / 5) / 2), 100);
  newPizza.mousePressed(summonNewPizza);



  //PHYSICS TIME


    springs[0] = new Spring2D(0.0, width / 2, mass, gravity);
  

  





}

function draw() 
{

  image(pizzajohn, 0, 0);
  cursor(pizza);
  currentPizzaCount = springs.length;
  newPizza.html('Summon New Pizza. Current Pizza Count: ' + currentPizzaCount);


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



  



displaySprings();






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

  newPizza.size(windowWidth / 5, 100);
  newPizza.position((windowWidth / 2) - ((windowWidth / 5) / 2), 100);




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

function displaySprings()
{
  springs[0].update(mouseX, mouseY);
  springs[0].display(mouseX, mouseY);


  for(var i = 1; i < springs.length; i++)
  {
    springs[i].update(springs[i-1].x, springs[i-1].y);
    springs[i].display(springs[i-1].x, springs[i-1].y);

  }
  

}

function summonNewPizza()
{
  springs[springs.length] = new Spring2D(0.0, width / 2, mass, gravity);
}