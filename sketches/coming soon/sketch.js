let s1, s2;
let gravity = 9.0;
let mass = 2.0;
var mouseSpeed;

function setup() {
  createCanvas(screen.availWidth, screen.availWidth);
  fill(255, 126);
  // Inputs: x, y, mass, gravity
  s1 = new Spring2D(0.0, width / 2, mass, gravity);
  s2 = new Spring2D(0.0, width / 2, mass, gravity);
  s3 = new Spring2D(0.0, width / 2, mass, gravity);
  s4 = new Spring2D(0.0, width / 2, mass, gravity);
  s5 = new Spring2D(0.0, width / 2, mass, gravity);
  s6 = new Spring2D(0.0, width / 2, mass, gravity);
  s7 = new Spring2D(0.0, width / 2, mass, gravity);
  s8 = new Spring2D(0.0, width / 2, mass, gravity);
  s9 = new Spring2D(0.0, width / 2, mass, gravity);
  s10 = new Spring2D(0.0, width / 2, mass, gravity);
  s11 = new Spring2D(0.0, width / 2, mass, gravity);





}

function draw() {
clear(); 

  s1.update(mouseX, mouseY);
  s1.display(mouseX, mouseY, 'C');
  s2.update(s1.x, s1.y);
  s2.display(s1.x, s1.y, 'o');

  s3.update(s2.x, s2.y);
  s3.display(s2.x, s2.y, 'm');
  s4.update(s3.x, s3.y);
  s4.display(s3.x, s3.y, 'i');

  s5.update(s4.x, s4.y);
  s5.display(s4.x, s4.y, 'n');
  s6.update(s5.x, s5.y);
  s6.display(s5.x, s5.y, 'g');

  s7.update(s6.x, s6.y);
  s7.display(s6.x, s6.y, ' ');
  s8.update(s7.x, s7.y);
  s8.display(s7.x, s7.y, 'S');

  s9.update(s8.x, s8.y);
  s9.display(s8.x, s8.y, 'o');

  s10.update(s9.x, s9.y);
  s10.display(s9.x, s9.y, 'o');

  s11.update(s10.x, s10.y);
  s11.display(s10.x, s10.y, 'n');
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

  this.display = function(nx, ny, character) {
    noStroke();
    mouseSpeed = abs(winMouseX - pwinMouseX);
    if(mouseSpeed > 100)
    {
      mouseSpeed = 100;
    }
  
    mouseSpeed = map(mouseSpeed, 0, 100, 30, 100);
  
    textSize(mouseSpeed);
    color(255, 255, 255);
    text(character,this.x, this.y);
    stroke(255);
  }
}