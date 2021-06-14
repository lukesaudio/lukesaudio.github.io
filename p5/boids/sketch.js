

let flock;
var canvas;
var bgrColour;
let img;
let centreStart;
let cornerStart;
let counter;
let current;

let input, button;
let currentCheat;
let cheats = [];

let cheatCounter;
let cheatsActivated;


function preload() {
  img = loadImage('../../images/headcircle.png');
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);

  

  canvas.style('z-index', '-1');
  centreStart = createVector(windowWidth / 2, windowHeight / 2);
  cornerStart = createVector(0, 0);
  counter = 0;
  current = createVector(0, 0);
  input = createInput();
  input.position(windowHeight / 100, windowHeight / 100);

  input.hide();
  
  button = createButton('submit');
  button.style('padding', '0');
  button.position(input.x + input.width + 10, input.height/3);
  button.mouseClicked(setCurrentCheat);

  button.hide();


  currentCheat = "none";
  cheatsActivated = false;
  cheatCounter = 0;

  cheats.push('none', 'LukesFaceio', 'Raycast', 'Sunshine', 'ItsOver9000');








  flock = new Flock();
  // Add an initial set of boids into the system
  for (let i = 0; i < 100; i++) {
    let b = new Boid(width / 2,height / 2);
    flock.addBoid(b);

    bgrColour = color(3, 0, 3);
  }
}

function draw() {
  background(bgrColour);
  flock.run();

}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
}

Flock.prototype.run = function() {
  for (let i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x, y) {
  this.acceleration = createVector(0, 0);
  this.velocity = createVector(random(-1, 1), random(-1, 1));
  this.position = createVector(x, y);
  this.r = 3.0;
  this.maxspeed = 3;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force

}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  let sep = this.separate(boids);   // Separation
  let ali = this.align(boids);      // Alignment
  let coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  let desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  let steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  let theta = this.velocity.heading() + radians(90);
 
  //-------------------------------------------------------------------------------------------------------- CHOOSE WHAT COOL EFFECT U WANT

  switch(currentCheat)
  {
    case "none":
           
      break;
    case "LukesFaceio":
      image(img, this.position.x - 10, this.position.y - 10, 50, 50);
      break;

    case "Raycast":
      line(cornerStart.x, cornerStart.y, this.position.x - 10, this.position.y - 10);
      break;

    case "Sunshine":
      
      stroke(255, random(100, 255), 0);
      fill(255, 255, 0);
      strokeWeight(2);
      line(centreStart.x, centreStart.y, this.position.x - 10, this.position.y - 10);
         

      
       break;

       case 'ItsOver9000':
        stroke(255, random(100, 255), 0);
        fill(255, 255, 0);
        strokeWeight(2);
        line(centreStart.x, centreStart.y, this.position.x - 10, this.position.y - 10);
        line(cornerStart.x, cornerStart.y, this.position.x - 10, this.position.y - 10);
        image(img, this.position.x - 10, this.position.y - 10, 50, 50);




    default: break;
  }
  

  

  push();
  translate(this.position.x, this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r * 2);
  vertex(-this.r, this.r * 2);
  vertex(this.r, this.r * 2);
  endShape(CLOSE);


  pop();
}

// Wraparound
Boid.prototype.borders = function() {
  if (this.position.x < -this.r)  this.position.x = width + this.r;
  if (this.position.y < -this.r)  this.position.y = height + this.r;
  if (this.position.x > width + this.r) this.position.x = -this.r;
  if (this.position.y > height + this.r) this.position.y = -this.r;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  let desiredseparation = 25.0;
  let steer = createVector(0, 0);
  let count = 0;
  // For every boid in the system, check if it's too close
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // Calculate vector pointing away from neighbor
      let diff = p5.Vector.sub(this.position, boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0,0);
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    let steer = p5.Vector.sub(sum, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  let neighbordist = 50;
  let sum = createVector(0, 0);   // Start with empty vector to accumulate all locations
  let count = 0;
  for (let i = 0; i < boids.length; i++) {
    let d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0, 0);
  }
}

function enterCheatCode(inputtedCheat)
{
  for(var i = 0; i < cheats.length; i++)
  {
    if(inputtedCheat == cheats[i])
    {
      console.log("Success: Cheatcode " + inputtedCheat + " activated!");
    }
    else 

    {
      console.log("Error: incorrect cheat entered");
    }
  }

}

function setCurrentCheat()
{
  currentCheat = input.value();
  enterCheatCode(currentCheat);
}

function keyTyped() 
{
  if(!cheatsActivated)
  {
  switch(key)
  {
    case 'c':
      cheatCounter = 1;
      console.log("c");
      console.log(cheatCounter);

      break;
      
      case 'h':
        if(cheatCounter == 1)
        {
          cheatCounter = 2;
          console.log("h");
          console.log(cheatCounter);
        }
        else cheatCounter = 0;
        break;

        case 'e':
          if(cheatCounter == 2)
          {
            cheatCounter = 3;
            console.log("e");
            console.log(cheatCounter);
          }
          else cheatCounter = 0;
          break;

          case 'a':
            if(cheatCounter == 3)
            {
              cheatCounter = 4;
              console.log("a");
              console.log(cheatCounter);
            }
            else cheatCounter = 0;
            break;

            case 't':
              if(cheatCounter == 4)
              {
                cheatCounter = 5;
                console.log("t");
                console.log(cheatCounter);
              }
              else cheatCounter = 0;
              break;

              case 's':
                if(cheatCounter == 5)
                {
                  cheatCounter = 5;
                  console.log("s");
                  console.log(cheatCounter);
                  cheatsActivated = true;

                  console.log("cheats activated")

                  button.style('display', 'block');
                  input.style('display', 'block');
                }
                else cheatCounter = 0;
                break;

                default:
                  cheatCounter = 0;
                  break;
  }
}
  



 

  
}
