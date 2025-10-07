let blockAmount = 50;
let blocksPos = [];
let blocksOffset = [];
let blocksWord = [];
let blockHeight = 50;
let blockWidth = 200;
let blocksColour = [];
let widthDivisior;

let jengaFont;
let jengaImage;
let backgroundImage;
let hankandjohn;


const nerdfighteriaWords = [
  "DFTBA",
  "Nerdfighter",
  "Hank Green",
  "John Green",
  "Vlogbrothers",
  "The Fault in Our Stars",
  "CrashCourse",
  "SciShow",
  "Pizza John",
  "French the Llama",
  "Tiny Chicken Disease",
  "Decreasing Worldsuck",
  "Project for Awesome",
  "The Anthropocene Reviewed",
  "Looking for Alaska",
  "Paper Towns",
  "Turtles All the Way Down",
  "Don't Forget to Be Awesome",
  "Giraffe Love",
  "The Yeti",
  "Thoughts from Places",
  "Nerdfighter Art",
  "Hanklerfish",
  "Good morning, John",
  "Good morning, Hank",
  "Worlds Largest Ball of Paint",
  "RACKS!",
  "Giant Squid of Anger",
  "Beanie Sandfurbs",
  "AFC Wimbledon",
  "Mars",
  "NO EDGE",
  "Quadragcon",
  "Hiroyuki Doi",
  "This is Tuberculosis",
  "AART",
  "ABFE",
  "Sharpie Face",
  "Dustin's freakin' dinosaurs",
  "Stupid walks",
  "Sycamore Trees",
  "Tuataria",
  "Grey Speckled Walls",
  "Airports",
  "Diet Dr Pepper",
  "Humanity's Relationship with the Moon",
  "Bald John Green",
  "The Other John Green",
  "Happy Dance",
  "We're Here Because",
  "ANONYMOUS",
  "Marcus Browne"


];

function preload()
{
  jengaFont = loadFont("1.ttf");
  jengaImage = loadImage("wood.jpeg");
  backgroundImage = loadImage("background.jpg");
  hankandjohn = loadImage("hankandjohn.png");
}

function setup() 
{
  createCanvas(windowWidth, windowHeight);
  textFont(jengaFont);
  textAlign(CENTER);
  textSize(20);
  stroke(86, 50, 50, 50);
  widthDivisior = random(1, 6);

  for(let i = 0; i < blockAmount; i++)
  {
    blocksPos[i] = 0 - (i * 100);
    blocksOffset[i] = random(-40, 40);
    blocksWord[i]= random(nerdfighteriaWords);
    blocksColour[i] = random(200, 255);
  }
}

function draw() 
{
  frameRate(40);
  image(backgroundImage, 0, 0, windowWidth, windowHeight);
  image(hankandjohn, 0, 0, windowWidth, windowHeight);

  for(let i = 0; i < blocksPos.length; i++)
  {
    fill(150, blocksColour[i], 150);
    let currentRect = rect(windowWidth/widthDivisior + blocksOffset[i], blocksPos[i], blockWidth, blockHeight);
    image(jengaImage, windowWidth/widthDivisior + blocksOffset[i], blocksPos[i], blockWidth, blockHeight);
    fill(0, 0, 0, 180);
    blocksPos[i] = blocksPos[i] += 30;
    
    text(blocksWord[i], windowWidth/widthDivisior + blocksOffset[i], blocksPos[i] - (blockHeight/6), blockWidth, blockHeight);
    if(blocksPos[i] > windowHeight - ((i+1) * blockHeight)) blocksPos[i] = windowHeight - ((i+1) * blockHeight);


  }

}
