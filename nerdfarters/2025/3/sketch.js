let cloud1, cloud2, cloud3, cloud4, cloud5;
let background;
let cloud1pos, cloud2pos, cloud3pos, cloud4pos, cloud5pos;
let cloud1increment, cloud2increment, cloud3increment, cloud4increment, cloud5increment;
let cloud1height, cloud2height, cloud3height, cloud4height, cloud5height; 
let cloud1drop, cloud2drop, cloud3drop, cloud4drop, cloud5drop;
let cloud1lyric, cloud2lyric, cloud3lyric, cloud4lyric, cloud5lyric;   
let cloud1lyricPos, cloud2lyricPos, cloud3lyricPos, cloud4lyricPos, cloud5lyricPos;
let cloud1lyricHeight, cloud2lyricHeight, cloud3lyricHeight, cloud4lyricHeight, cloud5lyricHeight;
let cloud1lyricIncrement, cloud2lyricIncrement, cloud3lyricIncrement, cloud4lyricIncrement, cloud5lyricIncrement;

let font;

const swiftLyricPhrases = [
  "You made a deal with the devil, turns out my dick's bigger",
  "I’ve been dying of trying just to seem cool",
  "Matching scars, we wear them like awards",
  "Good thing I like my friends cancelled",
  "We danced through ashes just to feel alive",
  "You belong with me",
  "Cause darling I'm a nightmare dressed like a daydream",
  "We are never ever getting back together",
  "Loving him was red",
  "I knew you were trouble when you walked in",
  "I don't know about you, but I'm feeling 22",
  "So it's gonna be forever, or it's gonna go down in flames",
  "I remember it all too well",
  "You made a rebel of a careless man's careful daughter",
  "I'm the problem, it's me",
  "I can make the bad guys good for a weekend",
  "This love is difficult, but it's real",
  "My castle crumbled overnight",
  "You call me up again just to break me like a promise",
  "You kept me like a secret, but I kept you like an oath",
  "The old Taylor can't come to the phone right now",
  "I'm shining like fireworks over your sad empty town",
  "Time won't fly, it's like I'm paralyzed by it",
  "In my feelings more than Drake",
  "I never trust a narcissist, but they love me",
  "Your necklace hanging from my neck, the night we couldn't quite forget",
  "I think I've seen this film before, and I didn't like the ending",
  "I polish up real nice",
  "I swear I don't love the drama, it loves me",
  "And darling I will be loving you till we're 87",
  "You were the best thing, and I lost you",
  "It's me, hi, I'm the problem, it's me"
];


function preload() 
{

  background  = loadImage("background.jpeg")
  cloud1 = loadImage('/clouds/cloud1.svg');
  cloud2 = loadImage('/clouds/cloud2.svg');
  cloud3 = loadImage('/clouds/cloud3.svg');
  cloud4 = loadImage('/clouds/cloud4.svg');
  cloud5 = loadImage('/clouds/cloud5.svg');

  cloud1pos = -109;
  cloud2pos = -131;
  cloud3pos = -152;
  cloud4pos = -127;
  cloud5pos = -101;

  pickNewIncrements(1);
  pickNewIncrements(2);
  pickNewIncrements(3);
  pickNewIncrements(4);
  pickNewIncrements(5);

  pickNewHeight(1);
  pickNewHeight(2);
  pickNewHeight(3);
  pickNewHeight(4);
  pickNewHeight(5);

  pickNewLyric(1);
  pickNewLyric(2);
  pickNewLyric(3);
  pickNewLyric(4);
  pickNewLyric(5);

  pickNewLyricHeight(1);
  pickNewLyricHeight(2);
  pickNewLyricHeight(3);
  pickNewLyricHeight(4);
  pickNewLyricHeight(5);

  pickNewLyricIncrements(1);
  pickNewLyricIncrements(2);
  pickNewLyricIncrements(3);
  pickNewLyricIncrements(4);
  pickNewLyricIncrements(5);

  cloud1lyricPos = 0;
  cloud2lyricPos = 0;
  cloud3lyricPos = 0;
  cloud4lyricPos = 0;
  cloud5lyricPos = 0;

  font = loadFont('font.ttf');


}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textAlign(LEFT);
  textSize(32);
  fill(48, 48, 107, 180);
  textWidth(40);
  textFont(font);
  imageMode(CENTER);



  
}

function draw() 
{

    image(background, windowWidth, windowHeight);

  cloud1pos += cloud1increment;
  if(cloud1pos > width + 100) { cloud1pos = -100; pickNewIncrements(1); pickNewHeight(1); pickNewDrop(1); pickNewLyric(1); cloud1lyricPos = 0;  }

  cloud2pos += cloud2increment;
  if(cloud2pos > width + 100) { cloud2pos = -100; pickNewIncrements(2); pickNewHeight(2); pickNewDrop(2); pickNewLyric(2); cloud2lyricPos = 0; }

  cloud3pos += cloud3increment;
  if(cloud3pos > width + 100) { cloud3pos = -100; pickNewIncrements(3); pickNewHeight(3); pickNewDrop(3); pickNewLyric(3); cloud3lyricPos = 0; }
  
  cloud4pos += cloud4increment;
  if(cloud4pos > width + 100) { cloud4pos = -100; pickNewIncrements(4); pickNewHeight(4); pickNewDrop(4); pickNewLyric(4); cloud4lyricPos = 0; }

  cloud5pos += cloud5increment;
  if(cloud5pos > width + 100) { cloud5pos = -100; pickNewIncrements(5); pickNewHeight(5); pickNewDrop(5); pickNewLyric(5); cloud5lyricPos = 0; }

  tint(255, 200);
  image(cloud1, cloud1pos, cloud1height, 800, 800);
  image(cloud2, cloud2pos, cloud2height, 500, 500);
  image(cloud3, cloud3pos, cloud3height, 400, 400);
  image(cloud4, cloud4pos, cloud4height, 700, 700);
  image(cloud5, cloud5pos, cloud5height, 600, 600);


  cloud1lyricPos += cloud1lyricIncrement;
  cloud2lyricPos += cloud2lyricIncrement;
  cloud3lyricPos += cloud3lyricIncrement;
  cloud4lyricPos += cloud4lyricIncrement;
  cloud5lyricPos += cloud5lyricIncrement;
  
  if(cloud1lyricPos > width + 500) { cloud1lyricPos = 0; pickNewLyric(1); pickNewLyricHeight(1); pickNewLyricIncrements(1); }
  if(cloud2lyricPos > width + 500) { cloud2lyricPos = 0; pickNewLyric(2); pickNewLyricHeight(2); pickNewLyricIncrements(2); }
  if(cloud3lyricPos > width + 500) { cloud3lyricPos = 0; pickNewLyric(3); pickNewLyricHeight(3); pickNewLyricIncrements(3); }
  if(cloud4lyricPos > width + 500) { cloud4lyricPos = 0; pickNewLyric(4); pickNewLyricHeight(4); pickNewLyricIncrements(4); }
  if(cloud5lyricPos > width + 500) { cloud5lyricPos = 0; pickNewLyric(5); pickNewLyricHeight(5); pickNewLyricIncrements(5); }

  text(cloud1lyric, cloud1lyricPos - 500, cloud1height - 302);
  text(cloud2lyric, cloud2lyricPos - 500, cloud2height - 329);
  text(cloud3lyric, cloud3lyricPos - 500, cloud3height - 320);
  text(cloud4lyric, cloud4lyricPos - 500, cloud4height - 120);
  text(cloud5lyric, cloud5lyricPos - 500, cloud5height - 230);



}

function pickNewIncrements(cloudNum)
{
  let newIncrement = random(0.1, 2);

  if(cloudNum == 1) { cloud1increment = newIncrement; }
  if(cloudNum == 2) { cloud2increment = newIncrement; } 
  if(cloudNum == 3) { cloud3increment = newIncrement; }
  if(cloudNum == 4) { cloud4increment = newIncrement; }
  if(cloudNum == 5) { cloud5increment = newIncrement; }

}

function pickNewLyricIncrements(cloudNum)
{
  let newIncrement = random(0.5, 4);

  if(cloudNum == 1) { cloud1lyricIncrement = newIncrement; }
  if(cloudNum == 2) { cloud2lyricIncrement = newIncrement; } 
  if(cloudNum == 3) { cloud3lyricIncrement = newIncrement; }
  if(cloudNum == 4) { cloud4lyricIncrement = newIncrement; }
  if(cloudNum == 5) { cloud5lyricIncrement = newIncrement; }

}

function pickNewHeight(cloudNum)
{
  let newHeight = random(1, windowHeight);

  if(cloudNum == 1) { cloud1height = newHeight; }
  if(cloudNum == 2) { cloud2height = newHeight; } 
  if(cloudNum == 3) { cloud3height = newHeight; }
  if(cloudNum == 4) { cloud4height = newHeight; }
  if(cloudNum == 5) { cloud5height = newHeight; }

}

function pickNewDrop(cloudNum)
{
  let newDrop = random(1, width);
  if(cloudNum == 1) { cloud1drop = newDrop; }
  if(cloudNum == 2) { cloud2drop = newDrop; } 
  if(cloudNum == 3) { cloud3drop = newDrop; }
  if(cloudNum == 4) { cloud4drop = newDrop; }
  if(cloudNum == 5) { cloud5drop = newDrop; } 
}

function pickNewLyric(cloudNum)
{
  let randomIndex = floor(random(swiftLyricPhrases.length));
  let selectedPhrase = swiftLyricPhrases[randomIndex];

  if(cloudNum == 1) { cloud1lyric = selectedPhrase; }
  if(cloudNum == 2) { cloud2lyric = selectedPhrase; } 
  if(cloudNum == 3) { cloud3lyric = selectedPhrase; }
  if(cloudNum == 4) { cloud4lyric = selectedPhrase; }
  if(cloudNum == 5) { cloud5lyric = selectedPhrase; } 
}

function pickNewLyricHeight(cloudNum)
{
  let newLyricHeight = random(1, windowHeight - 300);

  if(cloudNum == 1) { cloud1lyricHeight = newLyricHeight; }
  if(cloudNum == 2) { cloud2lyricHeight = newLyricHeight; } 
  if(cloudNum == 3) { cloud3lyricHeight = newLyricHeight; }
  if(cloudNum == 4) { cloud4lyricHeight = newLyricHeight; }
  if(cloudNum == 5) { cloud5lyricHeight = newLyricHeight; }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}