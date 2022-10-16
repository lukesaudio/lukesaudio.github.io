
let customFont;
let pizzajohn;

function preload() 
{
  customFont = loadFont('/Righteous-Regular.ttf');
  pizzajohn = loadImage('/pizzajohnBIG.png');

}


let buttonHours;
let buttonMinutes;
let buttonSeconds;

let userSelection = 0;



function setup() 
{
  createCanvas(windowWidth, windowHeight, WEBGL);


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


}

function draw() 
{

  image(pizzajohn, 0 - 1920 / 2, 0 - 1080 / 2);

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


  text("Committing to the bit: " + finalCountdown, 0, 0);



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
