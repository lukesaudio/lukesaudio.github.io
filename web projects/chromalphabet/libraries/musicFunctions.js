const musicalScalesPitchClasses = {
  major: [0, 2, 4, 5, 7, 9, 11],
  naturalMinor: [0, 2, 3, 5, 7, 8, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  melodicMinor: [0, 2, 3, 5, 7, 9, 11],
  diminished: [0, 2, 3, 5, 6, 8, 9, 11],
  ionian: [0, 2, 4, 5, 7, 9, 11],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  aeolian: [0, 2, 3, 5, 7, 8, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10]
};

const keySignature = {
  C: 0,
  CSharp: 1,
  D: 2,
  EFlat: 3,
  E: 4,
  F: 5,
  FSharp: 6,
  G: -5,
  AFlat: -4,
  A: -3,
  BFlat: -2,
  B: -1
};

const midiToNote = {
  0: "C-1",
  1: "C#-1",
  2: "D-1",
  3: "D#-1",
  4: "E-1",
  5: "F-1",
  6: "F#-1",
  7: "G-1",
  8: "G#-1",
  9: "A-1",
  10: "A#-1",
  11: "B-1",
  12: "C0",
  13: "C#0",
  14: "D0",
  15: "D#0",
  16: "E0",
  17: "F0",
  18: "F#0",
  19: "G0",
  20: "G#0",
  21: "A0",
  22: "A#0",
  23: "B0",
  24: "C1",
  25: "C#1",
  26: "D1",
  27: "D#1",
  28: "E1",
  29: "F1",
  30: "F#1",
  31: "G1",
  32: "G#1",
  33: "A1",
  34: "A#1",
  35: "B1",
  36: "C2",
  37: "C#2",
  38: "D2",
  39: "D#2",
  40: "E2",
  41: "F2",
  42: "F#2",
  43: "G2",
  44: "G#2",
  45: "A2",
  46: "A#2",
  47: "B2",
  48: "C3",
  49: "C#3",
  50: "D3",
  51: "D#3",
  52: "E3",
  53: "F3",
  54: "F#3",
  55: "G3",
  56: "G#3",
  57: "A3",
  58: "A#3",
  59: "B3",
  60: "C4",
  61: "C#4",
  62: "D4",
  63: "D#4",
  64: "E4",
  65: "F4",
  66: "F#4",
  67: "G4",
  68: "G#4",
  69: "A4",
  70: "A#4",
  71: "B4",
  72: "C5",
  73: "C#5",
  74: "D5",
  75: "D#5",
  76: "E5",
  77: "F5",
  78: "F#5",
  79: "G5",
  80: "G#5",
  81: "A5",
  82: "A#5",
  83: "B5",
  84: "C6",
  85: "C#6",
  86: "D6",
  87: "D#6",
  88: "E6",
  89: "F6",
  90: "F#6",
  91: "G6",
  92: "G#6",
  93: "A6",
  94: "A#6",
  95: "B6",
  96: "C7",
  97: "C#7",
  98: "D7",
  99: "D#7",
  100: "E7"
};

function quantizeNoteToScale(noteToQuantize, scaleToQuantzie, keySignatureToUse)
{
  if(noteToQuantize > 0)
  {
    let quantizeToC = quantizeNoteToCMajor(noteToQuantize);

    let quantizeToScale = applyModeToNote(quantizeToC, scaleToQuantzie);
  
    let finalNote = transposeToKey(quantizeToScale, keySignatureToUse);
    
    return finalNote;
  }
  else 
  {
    return noteToQuantize;
  }


}

function quantizeNoteToCMajor(noteToQuantize)
  {
    let pitch = noteToQuantize % 12;

    if(pitch === 1 || pitch === 3 || pitch === 6 || pitch === 8 || pitch === 10)
    {
      noteToQuantize++;
    }

    return noteToQuantize;

    
}

function applyModeToNote(noteToMode, desiredScalePitchClass)
  {

    let pitch = noteToMode % 12; //number beween 0 and 6

    let positionInArray = musicalScalesPitchClasses.major.indexOf(pitch);

    let indexOfOldPitchClass = musicalScalesPitchClasses.major[positionInArray];
    let indexOfNewPitchClass = desiredScalePitchClass[positionInArray];

    let modifier = indexOfNewPitchClass - indexOfOldPitchClass;


    return noteToMode + modifier;

}

function transposeToKey(noteToTranspose, keySignatureToUse)
{
    return noteToTranspose + keySignatureToUse;
}
  
 