let textboxWidth;
let textboxHeight;

let textToConvert;
let textToNumbers;
let textToNumbersArray;
let textToNumbersQuantizedArray;


//AUDIO
let polySynth;
let octave;
let noteTimer;
let bpm;
let noteLength;
let crotchet;
let noteDivisiors;

let currentScale;
let keySig; 

let gui;

//GUI
let params = 
{
	BPM: 120,
  BPMMin: 60,
  BPMMax: 240,
  ThirdHarmony: false,
  FifthHarmony: false,
	Key: ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'],
  Scale: [
    "Major",
    "Natural Minor",
    "Harmonic Minor",
    "Melodic Minor",
    "Diminished",
    "Ionian",
    "Dorian",
    "Phrygian",
    "Lydian",
    "Mixolydian",
    "Aeolian",
    "Locrian",
],

reverb: false,
reverbTime: 3,
reverbTimeMin: 0,
reverbTimeMax: 10,
reverbTimeStep: 0.1,
reverbDecayRate: 2,
reverbDecayRateMin: 0,
reverbDecayRateMax: 100,
reverbReverse: false, 
reverbWetDry: 0.5,
reverbWetDryMin: 0,
reverbWetDryMax: 1.0,
reverbWetDryStep: 0.001,

delay:false,
delayType: ['Default', 'Stereo Ping Pong'],
delayTime: 0.5,
delayTimeMin: 0.0,
delayTimeMax: 1.0,
delayTimeStep: 0.001,


delayFeedback: 0.5,
delayFeedbackMin: 0.01,
delayFeedbackMax: 0.95,
delayFeedbackStep: 0.001,
delayFilter:1000,
delayfilterMin: 100,
delayfilterMax: 5000,

};

const alphabetUpper = 
[
  " ",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",

  
];

const alphabetLower = 
[
  
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  " ",
];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);


  textboxWidth = 700;
  textboxHeight = 350;

  textInput = createElement('textarea');
  setTextInputStyle();
  textInput.position(windowWidth / 2 - (textboxWidth/2), windowHeight/4);
  textInput.size(textboxWidth, textboxHeight);

  button = createButton('Musify your text');
  button.size(300, 100);
  button.style('font-size', '30px');
  button.position(textInput.x + (textInput.width / 2) - (button.width / 2), textInput.y + textInput.height + 16);
  button.mousePressed(musifyText);

  textToNumbers = "";
  textToNumbersArray = [];
  textToNumbersQuantizedArray = [];

  //AUDIO SETUP

  userStartAudio();

  //SYNTH SETUP
  polySynth = new p5.PolySynth();

  //NOTE PLAYBACK SETUP
  octave = 60;
  bpm = 180;
  noteDivisiors = [4, 8, 16, 32];
  crotchet = bpm / 60;
  noteLength = crotchet / 8;
  noteTimer = 0;

  //MUSICALITY SETUP
  keySig = pickRandomKey(keySignature);
  currentScale = pickRandomKey(musicalScalesPitchClasses);


  //AUDIO EFFECTS
  delay = new p5.Delay();
  polySynth.connect(delay);
  


  reverb = new p5.Reverb();
  polySynth.connect(reverb);

  //GUI
  gui = createGui('Control panel');

  gui.addObject(params);

    // Only call draw when then gui is changed
  noLoop();





}

function musifyText() 
{
  textToConvert = textInput.value();
  textInput.hide();
  button.hide();
  gui.toggleVisibility();

  convertTextToNumbers(textToConvert);

  for(let i = 0; i < textToNumbersArray.length; i++)
  {
    playSynth(i);
  }

  prepareFinalTextElements();


 


  
}

function convertTextToNumbers(_textToConvert)
{
  let indexToAppend;

  for(let i = 0; i < _textToConvert.length; i++)
  {

   let currentLetter = _textToConvert.charAt(i);

   if(currentLetter === currentLetter.toLowerCase())
   {   
    
    for(let i = 0; i < alphabetLower.length; i++)
    {
      if(currentLetter === alphabetLower[i] && currentLetter === " " )
      {
        textToNumbersArray.push("SPACE");
      }

      if(currentLetter === alphabetLower[i] && currentLetter != " ")
      {
        let index = i + octave;
        indexToAppend = index.toString();
        textToNumbersArray.push(index);

      }

    }
   }
   else
   for(let i = 0; i < alphabetUpper.size; i++)
    {
      if(currentLetter === alphabetUpper[i])
      {
        let index = i + octave;
        indexToAppend = index.toString();
        textToNumbersArray.push(index);

        break;
      }
    }
   
    //console.log("Adding " + indexToAppend + " to numbers string\n");
    textToNumbers += indexToAppend;
    textToNumbers += " ";
    //console.log("New numbers string is " + textToNumbers + "\n")
  }

}

function prepareFinalTextElements()
{
  select('.originalText').html(textToConvert);

  let tempText = "";
  for(let i = 0; i < textToNumbersArray.length; i++)
  {
      if(midiToNote[textToNumbersArray[i]] != undefined)
      {
        tempText += midiToNote[textToNumbersQuantizedArray[i]];
        tempText += ", ";


      }
      else {tempText += "\n";}
     

  }
   

  


  select('.convertedText').html(tempText);


  select('.originalText').style('display', 'flex');
  select('.convertedText').style('display', 'flex');


}

function playSynth(index) 
{
  if(textToNumbersArray[index] === "SPACE")
  {
    let randomIndex = random(noteDivisiors);
    noteLength = crotchet / randomIndex;
    noteTimer += 0.01;   
  }
  else
  {
    let note = textToNumbersArray[index];

    let noteToPlay = quantizeNoteToScale(note, currentScale, keySig);
    textToNumbersQuantizedArray.push(noteToPlay);

    let thirdToPlay = quantizeNoteToScale(note + 3, currentScale, keySig);
    let fifthToPlay = quantizeNoteToScale(note + 7, currentScale, keySig);



    polySynth.play(midiToNote[noteToPlay], 0.7, noteTimer, noteLength);
  
    if(params.delay) delay.process(polySynth , params.delayTime, params.delayFeedback, params.delayFilter);
    if(params.reverb)
    {
      reverb.drywet(params.reverbWetDry);
    }
    else
    {
      reverb.drywet(0);
    }


    if(params.ThirdHarmony) polySynth.play(midiToNote[thirdToPlay], 0.2, noteTimer, noteLength);
    if(params.ThirdHarmony) polySynth.play(midiToNote[fifthToPlay], 0.2, noteTimer, noteLength);





    noteTimer += noteLength + 0.01; 
  }
  
}

function setTextInputStyle()
{
  textInput.style('display',  'flex');
  textInput.style('align-items',  'center');
  textInput.style('justify-content',  'center');
  textInput.style('align-content',  'center');
  textInput.style('white-space',  'break-spaces');
  textInput.style('overflow',  'scroll');
  textInput.style('text-overflow',  'clip');


}

function pickRandomKey(obj) 
{
  var keys = Object.keys(obj);
  let scaleChosen = obj[keys[ keys.length * Math.random() << 0]];
  //console.log("Chosen Scale: " + scaleChosen + "\n");
  return scaleChosen;
};

function draw()
{
  if(bpm != params.BPM) {bpm = params.BPM; console.log("BPM: " + bpm + "\n")};

  if(params.Key === "C") keySig = keySignature.C;
  if(params.Key === "C#") keySig = keySignature.CSharp;
  if(params.Key === "D") keySig = keySignature.D;
  if(params.Key === "Eb") keySig = keySignature.EFlat;
  if(params.Key === "E") keySig = keySignature.E;
  if(params.Key === "F") keySig = keySignature.F;
  if(params.Key === "F#") {keySig = keySignature.FSharp; console.log("Key is: " + keySig + "\n");}
  if(params.Key === "G") keySig = keySignature.G;
  if(params.Key === "Ab") keySig = keySignature.AFlat;
  if(params.Key === "A") keySig = keySignature.A;
  if(params.Key === "Bb") keySig = keySignature.BFlat;
  if(params.Key === "B") keySig = keySignature.B;

  if(params.Scale === "Major") {currentScale = musicalScalesPitchClasses.major;}
  if(params.Scale === "Natural Minor") currentScale = musicalScalesPitchClasses.naturalMinor;
  if(params.Scale === "Harmonic Minor") currentScale = musicalScalesPitchClasses.harmonicMinor;
  if(params.Scale === "Melodic Minor") currentScale = musicalScalesPitchClasses.melodicMinor;
  if(params.Scale === "Diminished") currentScale = musicalScalesPitchClasses.diminished;
  if(params.Scale === "Ionian") currentScale = musicalScalesPitchClasses.ionian;
  if(params.Scale === "Dorian") currentScale = musicalScalesPitchClasses.dorian;
  if(params.Scale === "Phrygian") currentScale = musicalScalesPitchClasses.phrygian;
  if(params.Scale === "Lydian") currentScale = musicalScalesPitchClasses.lydian;
  if(params.Scale === "Mixolydian") currentScale = musicalScalesPitchClasses.mixolydian;
  if(params.Scale === "Aeolian") currentScale = musicalScalesPitchClasses.aeolian;
  if(params.Scale === "Locrian") currentScale = musicalScalesPitchClasses.locrian;

  if(params.delayType === "Default") delay.setType(0);
  else{delay.setType(1);}
  



}