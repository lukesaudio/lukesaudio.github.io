
var iterations = 6; //CAUTION: Higher values may crash your browser!
var sizes = [];
var pizzaJohnSVG;
let fonts = [];
let numberOfFonts = 4; //if you add more than 4 fonts to the project, change this number to match.
let words = ["GOOF", "FOR", "GOOD"]; //if you want a custom phrase, change the words here. Make sure to keep it to 3 words or change the counter logic in draw()
let counter = 0;

function preload()
{
      pizzaJohnSVG = loadImage("pizzaJohnPNG.png"); //preload the Pizza John SVG

      for(let i = 0; i < numberOfFonts  ; i++) //preload fonts based on a simple numerical naming scheme. Add your own fonts and change the numberOfFonts variable to match.
      {
        fontAddress = str(i+1) + ".ttf";
        console.log("Font name: " + fontAddress);
        fonts[i] = loadFont(fontAddress); //preload the fonts
      }
}

function setup() 
{
  createCanvas(windowWidth, windowHeight   ); //draw canvas to the size of the window
  for(let i = 0; i < iterations; i++){ sizes[i]= random(7, 34); } //generate random sizes for the background texts

  describe('A sketch that randomly draws the phrase \'goof for good\' in different fonts, colours and sizes over the canvas. Central text cycles through larger primary text saying \'GOOF FOR GOOD\'. Pizza John lurks behind this text. Press "s" to save a gif of the sketch from the last 5 seconds.'); //describe the sketch for screen readers
}

function draw() 
{

  //background(255, 255, 255, 255); //set background to white. Change value here to change background color based on RGBA values (0-255)
  frameRate(4); //how many times do we want to draw to the screen per second? Slower == less processing. Higher values might crash your browser!

  for(let j = 0; j < iterations; j++)
  {     
      for(let i = 0; i < iterations; i++)
      {             
        textFont(random(fonts)); //choose font at random
        textSize(sizes[i] * 3); //scale size up
        fill(random(200, 255), random(200, 255), random(200, 255), 200); //set fill to a light, fuller color with some transparency
        stroke(255, 0); //remove the stroke

        push(); //start a new drawing state. Only the stuff between push and pop will be affected by the translate function

          translate(random(width)-500, random(windowWidth) - 500); //randomly translate the canvas to give the next a new draw position. Offset to allow for text to fall on screen edges.
          var goofX = random(0, width); //pick an X axis position at random
          var goofY = random(0, height); //pick a Y axis position at random
          text("goof!", goofX, goofY);  //draw the text

          goofX = random(0, width); //pick an X axis position at random
          goofY = random(0, height); //pick a Y axis position at random
          text("good!", goofX, goofY); //draw the text

        pop(); //end the new drawing state

      }

    }

    imageMode(CENTER); //center the pizza john image
    image(pizzaJohnSVG, width/2, height/2.9, 300, 300); //draw the pizza john image near to the center of the canvas, scaled to 300x300 pixels. It peeks behind the text!

    //Draw a rectangle behind the text to aid in visibility
    fill(255, 0, 255, 255);
    stroke(9, 255);   
    strokeWeight(4);
    rectMode(CENTER)
    rect(width/2, height/2.2  , 400, 200);
    
    //setup the text properties for the main text
    fill(0, 255, 0, 200);
    textAlign(CENTER);
    textSize(150);
    stroke(0, 255);   
    strokeWeight(4);

    //choose a font and draw the main text
    textFont(fonts[3]);
    text(words[counter], width/2, height/2);

    //we use a looping counter here to cycle through the phrase GOOF [0] FOR [1] GOOD [2]
    counter++; 
    if(counter > 2) counter = 0;
}

function keyPressed() 
{
  //press 's' to save a gif of the sketch
  if (key === 's') {
    saveGif('mySketch', 5, { delay: 5 });
  }

}

function windowResized()
{
  resizeCanvas(windowWidth, windowHeight); //resize the canvas if the window is resized
}