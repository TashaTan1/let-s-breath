let mic;
let vol;
let breathIN = 4;
let breathINTITLE;
let holdBREATH = 7;
let holdBREATHTITLE;
let breathOUT = 8;
let breathOUTTITLE;
let button;
let relax = 6;

let relaxShow = true;
let textBreathShow = false;
let textHoldShow = false;
let textBreathOshow = false;

let shouldstartbreathintimer = false;
let shouldstartHoldtimer = false;
let shouldstartBreathOtimer = false;

let breathingROUNDS = 1;


function setup() {
  createCanvas(windowWidth, windowHeight);
 //assign mic input
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(39, 96, 121);
  let vol = mic.getLevel();

  noStroke();
  ellipse(width / 2, 350, 100 + vol * 2000, 100 + vol * 2000);
//timer
  if (frameCount % 60 == 0 && relax > 0) {
    
    relax--;
  }
  if (relaxShow == true) {
    textSize(32);
    textAlign(CENTER);
    textFont("Roboto");
    text("Relax and find a comfortable position.", width / 2, 80);
    textSize(50);
    fill(255);
  }
//if relax time is up, show text for breath
  if (relax == 0) {
  relaxShow = false;
  textBreathShow = true;
  textHoldShow = false;
  textBreathOshow = false;
  shouldstartbreathintimer = true;
  shouldstartHoldtimer = false;
  shouldstartBreathOtimer = false;
  }
  
   if (breathIN == 0) {
  relaxShow = false;
  textBreathShow = false;
  textHoldShow = true;
  textBreathOshow = false;
  shouldstartbreathintimer = false;
  shouldstartHoldtimer = true;
  shouldstartBreathOtimer = false;
  }
  if (
    frameCount % 60 == 0 &&
    breathIN > 0 && textBreathShow == true &&
    shouldstartbreathintimer == true
  ) {
    // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    breathIN--;
  }
  if (textBreathShow == true && shouldstartbreathintimer == true) {
    displayText("Breath in through your nose", breathIN);
  }

 

  if (holdBREATH == 0) {
  relaxShow = false;
  textBreathShow = false;
  textHoldShow = false;
  textBreathOshow = true;
    
  shouldstartbreathintimer = false;
  shouldstartHoldtimer = false;
  shouldstartBreathOtimer = true;
  }
  
  if (frameCount % 60 == 0 && holdBREATH > 0 && shouldstartHoldtimer == true && textHoldShow == true) {
    // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    holdBREATH--;
  }
  if (textHoldShow == true && shouldstartHoldtimer == true && textBreathShow == false) {
    displayText("Hold your breath", holdBREATH);
  }


  if (
    frameCount % 60 == 0 &&
    breathOUT > 0 &&
    shouldstartBreathOtimer == true
  ) {
    // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    breathOUT--;
  }

  if (breathOUT == 0) {
    textBreathOshow = false;
    shouldstartHoldtimer = false;
    shouldstartBreathOtimer = false;
  }

  if (
    textBreathOshow == true &&
    shouldstartHoldtimer == false &&
    shouldstartBreathOtimer == true
  ) {
    displayText("Breath out through your mouth", breathOUT);
  }

  if (breathIN == 0 && holdBREATH == 0 && breathOUT == 0) {
    breathingROUNDS = breathingROUNDS + 1;
    if (breathingROUNDS < 5) {
      console.log(breathingROUNDS);
      repeat();
    } else {
      button = createButton("Repeat Breathing Exercise");
      button.position(width / 2 - 200, 200);
      button.mousePressed(function goToAnotherPage() {
        window.location.href =
          "https://tashatan1.github.io/let-s-breath/";
      });
      button = createButton("Back to Homepage");
      button.position(width / 2 + 80, 200);
      button.mousePressed(function goToAnotherPage() {
        window.location.href =
          "tashatan1.github.io/front-page-/";
      });
    }
  }
}

//Method Display Title and Seconds
function displayText(title, seconds) {
  textSize(32);
  textAlign(CENTER);
  textFont("Roboto");
  text(title, width / 2, 80);
  textSize(50);
  text("\n" + seconds, width / 2, 80);
  fill(255);
}

//repeats the breathing up to 4 rounds
function repeat() {
  textBreathShow = true;
  textHoldShow = false;
  textBreathOshow = true;
  shouldstartHoldtimer = false;
  shouldstartBreathOtimer = false;

  breathIN = 4;
  holdBREATH = 7;
  breathOUT = 8;
}
