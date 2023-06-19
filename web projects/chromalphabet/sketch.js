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
  " ",
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
  
];
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

reverbTime: 1,
reverbTimeMin: 0,
reverbTimeMax: 5,
reverbTimeStep: 0.1,
reverbPreDelay: 0.5,
reverbPreDelayMin: 0.0,
reverbPreDelayMax: 1.0,
reverbPreDelayStep: 0.01,
reverbWetDry: 0.5,
reverbWetDryMin: 0,
reverbWetDryMax: 1.0,
reverbWetDryStep: 0.001,

delayTime: 0.5,
delayTimeMin: 0.0,
delayTimeMax: 1.0,
delayTimeStep: 0.001,
delayWetDry: 0.5,
delayWetDryMin:0.0,
delayWetDryMax:1.0,
delayWetDryStep:0.01,
delayFeedback: 0.5,
delayFeedbackMin: 0.01,
delayFeedbackMax: 0.90,
delayFeedbackStep: 0.001,

bits: 8,
bitsMin: 1,
bitsMax:16,




};

let textboxWidth;
let textboxHeight;
let textToConvert;
let textToNumbers;
let textToNumbersArray;
let textToNumbersQuantizedArray;

let gui;

let octave;
let noteTimer;
let bpm;
let noteLength;
let crotchet;
let noteDivisiors;

let currentScale;
let keySig;

let synth;
const feedbackDelay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
const reverb = new Tone.Reverb(0.5).toDestination();
const crusher = new Tone.BitCrusher(4).toDestination();

const recorder = new Tone.Recorder();
let recording;
let canDownload;
const meter = new Tone.Meter();
meter.normalRange = true;
Tone.Destination.connect(meter);
setInterval(() => 
{
  if(meter.getValue() > 0.01)
  {
      downloadButton.attribute('disabled', true);

  }
  else
  {
      downloadButton.removeAttribute('disabled');

  }
}, 150);



function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  textboxWidth = 700;
  textboxHeight = 350;

  textInput = createElement('textarea');
  setTextInputStyle();
  textInput.position(windowWidth / 2 - (textboxWidth/2), windowHeight/4);
  textInput.size(textboxWidth, textboxHeight);
  textInput.id("textInput");

  button = createButton('Musify your text');
  button.size(300, 100);
  button.style('font-size', '30px');
  button.id("play-btn");
  document.getElementById("play-btn").addEventListener("click", () => { if (Tone.context.state !== "running") Tone.start();});
  button.position(textInput.x + (textInput.width / 2) - (button.width / 2), textInput.y + textInput.height + 16);
  button.mousePressed(musifyText);  

  resetButton = createButton('Reset');
  resetButton.size(300, 50);
  resetButton.style('font-size', '30px');
  resetButton.position(textInput.x + (textInput.width / 2)  - (resetButton.width / 2), textInput.y + textInput.height);
  resetButton.mousePressed(resetWebpage);
  resetButton.hide();

  pauseButton = createButton('Pause Recording');
  pauseButton.size(500, 50);
  pauseButton.style('font-size', '30px');
  pauseButton.position(textInput.x + (textInput.width / 2)  - (pauseButton.width / 2), resetButton.y + pauseButton.height);
  pauseButton.mousePressed(stopRecorder);
  pauseButton.hide();

  downloadButton = createButton('Download last performance');
  downloadButton.size(500, 50);
  downloadButton.style('font-size', '30px');
  downloadButton.attribute('disabled', true);
  downloadButton.position(textInput.x + (textInput.width / 2)  - (downloadButton.width / 2), pauseButton.y + downloadButton.height);
  downloadButton.mousePressed(downloadPerformance);
  downloadButton.hide();



  textToNumbers = "";
  textToNumbersArray = [];
  textToNumbersQuantizedArray = [];


  //GUI
  gui = createGui('Control panel');
  gui.addObject(params);
  
 
  //NOTE PLAYBACK SETUP
  octave = 60;
  bpm = 180;
  noteDivisiors = [4, 8, 16, 32];
  crotchet = bpm / 60;
  noteLength = crotchet / 8;
  noteTimer = 0;

  //MUSICALITY SETUP
  synth = new Tone.PolySynth().toDestination();
  startAudioEffectProcesses();
  canDownload = false;




    // Only call draw when then gui is changed
  noLoop();

  




}

function setTextInputStyle()
{
  console.log("Set Text Input Style called\n")

  textInput.style('display',  'flex');
  textInput.style('align-items',  'center');
  textInput.style('justify-content',  'center');
  textInput.style('align-content',  'center');
  textInput.style('white-space',  'break-spaces');
  textInput.style('overflow',  'scroll');
  textInput.style('text-overflow',  'clip');


}

function musifyText() 
{

  textToConvert = textInput.value();
  textInput.hide();
  button.hide();
  downloadButton.show();
  resetButton.show();
  pauseButton.show();





  //gui.toggleVisibility();

  convertTextToNumbers(textToConvert);

  noteTimer = Tone.now(); 
  recorder.start();
  
  Tone.Destination.connect(recorder);
 

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

        textToNumbersArray.push(-1);
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
   {
   for(let i = 0; i < alphabetUpper.length; i++)
    {

      if(currentLetter === alphabetUpper[i] && currentLetter === " " )
      {    

        textToNumbersArray.push(-1);
      }

      if(currentLetter === alphabetUpper[i] && currentLetter != " ")
      {

        let index = i + octave;
        indexToAppend = index.toString();
        textToNumbersArray.push(index);

      }

    }
  }

}
}

function prepareFinalTextElements()
{
  textToConvert = textToConvert.replaceAll(' ', "\n");
  select('.originalText').html(textToConvert);

  let tempText = "";

  for(let i = 0; i < textToNumbersQuantizedArray.length; i++)
  {
    if(textToNumbersQuantizedArray[i] === -1) tempText += "\n";
    if(midiToNote[textToNumbersQuantizedArray[i]] !== undefined) tempText += midiToNote[textToNumbersQuantizedArray[i]] + ", ";
  }

  select('.convertedText').html(tempText);
  select('.originalText').style('display', 'flex');
  select('.convertedText').style('display', 'flex');


}

function pickRandomKey(obj) 
{
  var keys = Object.keys(obj);
  let scaleChosen = obj[keys[ keys.length * Math.random() << 0]];
  return scaleChosen;
};

function playSynth(index) 
{
  if(textToNumbersArray[index] === -1)
  {
    textToNumbersQuantizedArray.push(-1);
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

    synth.triggerAttackRelease(midiToNote[noteToPlay], noteLength, noteTimer);
    if(params.ThirdHarmony) synth.triggerAttackRelease(midiToNote[thirdToPlay], noteLength, noteTimer);
    if(params.FifthHarmony) synth.triggerAttackRelease(midiToNote[fifthToPlay], noteLength, noteTimer);

    noteTimer += noteLength + 0.01; 
  }
  
}

function resetWebpage()
{
  console.log("Resetting...\n");
  canDownload = false;

  synth.dispose();
  
  this.hide();
  textInput.show();
  button.show();
  downloadButton.hide();  
  pauseButton.hide();

  //gui.toggleVisibility();

  select('.originalText').style('display', 'none');
  select('.convertedText').style('display', 'none');


  textToConvert = "";
  textToNumbersArray = [];
  textToNumbersArray.length = 0;
  textToNumbersQuantizedArray = [];
  textToNumbersQuantizedArray.length = 0;

   synth = new Tone.PolySynth().toDestination();
   startAudioEffectProcesses();

}

function startAudioEffectProcesses()
{
  synth.connect(crusher);
  synth.connect(feedbackDelay);
  synth.connect(reverb);
}

function draw()
{
  
  if(bpm != params.BPM) {bpm = params.BPM;};

  if(params.Key === "C") keySig = keySignature.C;
  if(params.Key === "C#") keySig = keySignature.CSharp;
  if(params.Key === "D") keySig = keySignature.D;
  if(params.Key === "Eb") keySig = keySignature.EFlat;
  if(params.Key === "E") keySig = keySignature.E;
  if(params.Key === "F") keySig = keySignature.F;
  if(params.Key === "F#") {keySig = keySignature.FSharp;}
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

  feedbackDelay.set(
    {
      delayTime: params.delayTime, 
      feedback:params.delayFeedback, 
      wet: params.delayWetDry
    });

    reverb.set(
      {
        decay: params.reverbTime,
        preDelay: params.reverbPreDelay,
        wet: params.reverbWetDry,

      });

      crusher.set(
        {
          bits: params.bits
        });
  


}

function downloadPerformance()
{
  console.log(meter.getValue());

  if(meter.getValue() < 0.51)
  {
    setTimeout(async () => {
    
   
    downloadButton.removeAttribute('disabled');
    // the recorded audio is returned as a blob
     recording = await recorder.stop();
     const url = URL.createObjectURL(recording);
  const anchor = document.createElement("a");
  anchor.download = "recording.mp3";
  anchor.href = url;
  anchor.click();
   
  }) ;
}
else
{
  console.log("Too loud!");
}

  


 
}

function stopRecorder()
{
 
    recorder.pause();
    synth.dispose();
    pauseButton.label = "Recording stopped";
    pauseButton.attribute('disabled', true);
  
}
