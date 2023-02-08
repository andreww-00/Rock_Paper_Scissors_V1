//Defines global variable
const Fire = document.querySelector(".Fire");
const Water = document.querySelector(".Water");
const Flora = document.querySelector(".Flora");
const roundResult = document.querySelector(".match_results")
let playerStatus = document.querySelector(".playerHP")
let monsterStatus = document.querySelector(".monsterHP")
roundResult.setAttribute("style", "white-space:pre;");
let playerHP = 5;
let monsterHP = 5;
//global variables for animation
const wizard_height = 190;
const wizard_width = 231;
const wizard_position = 600;
let x_pos = 0;
let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let skelSprite = new Image ();
skelSprite.src = "/Images/undead_idle_sheet.png";
let wizSprite = new Image();
wizSprite.src = "/Images/Idle.png";   
let skelHeight = 32;
let skelWidth = 48;
let skelX = 450
let skelY = 175

//animation functions
function animate_wiz () {
    context.clearRect(-100,-75, wizard_position, wizard_position);
    context.drawImage(wizSprite, x_pos, 0, wizard_width, wizard_height, -100, -75, wizard_position, wizard_position);
    x_pos += 231; 
    if (x_pos == 1386) x_pos = 0;
}

if (wizSprite.complete) {
 context.drawImage(wizSprite, x_pos, 0, wizard_width, wizard_height, -100, -75, wizard_position, wizard_position);   
} else {
    wizSprite.onload = function () {
        setInterval(animate_wiz, 50); 
        }
}

if (skelSprite.complete) {
    context.drawImage(skelSprite, x,0,skelWidth,skelHeight, skelX, skelY, 300, 200);
} else {
    skelSprite.onload = function () {
    setInterval(animate_skel,250)
    }
}
let x = 0;
function animate_skel () {
    context.clearRect(0,0, 750, 400);
    context.drawImage(skelSprite, x,0,skelWidth,skelHeight,skelX,skelY,300,200);
    x+=skelWidth;
    if (x == 864 ) x = 0;
}


//listens for button inputs 
Fire.addEventListener("click", (e) => {
  playRound("FIRE", getComputerChoice());
});
Water.addEventListener("click", (e) => {
  playRound("WATER", getComputerChoice());
});
Flora.addEventListener("click", (e) => {
  playRound("FLORA", getComputerChoice());
});

//generates computer selection
function getComputerChoice() {
  let choices = ["FIRE", "WATER", "FLORA"];
  return choices[Math.floor(Math.random() * 3)];
}

//logic for Fire Water Flora
function playRound(playerSelection, computerSelection) {
  if (playerSelection == "FIRE") {
    if (computerSelection == "FIRE") {
      roundResult.textContent = "Tied round keep fighting! fire and fire!"
      document.body.appendChild(roundResult);
    } else if (computerSelection == "FLORA") {
      monsterHP -= 1;
      roundResult.textContent = "Round Won! Fire Burns Flora!"
      monsterStatus.textContent = "Monster HP: " + monsterHP;
      document.body.appendChild(roundResult);
    } else if (computerSelection == "WATER") {
      playerHP -= 1;
      roundResult.textContent = "Round Lost! Water puts out Fire!"
      document.body.appendChild(roundResult);
      playerStatus.textContent = "Player HP:" + playerHP
    } else {
      console.log("Something went wrong?");
    }

  } else if (playerSelection == "WATER") {
    if (computerSelection == "WATER") {
      roundResult.textContent = "Tied round keep fighting! Water and Water!";
      document.body.appendChild(roundResult);
    } else if (computerSelection == "FIRE") {
      monsterHP -= 1;
      roundResult.textContent = "Round Won! Water puts out Fire!";
      document.body.appendChild(roundResult);
      monsterStatus.textContent = "Monster HP: " + monsterHP;
    } else if (computerSelection == "FLORA") {
      playerHP -= 1;
      roundResult.textContent ="Round Lost! Water is absorbed by flora!"
      document.body.appendChild(roundResult);
      playerStatus.textContent = "Player HP: " + playerHP;
    } else {
      console.log("Something went wrong?");
    }

  } else if (playerSelection == "FLORA") {
    if (computerSelection == "FLORA") {
      roundResult.textContent = "Tied round keep fighting! Flora and Flora!"
      document.body.appendChild(roundResult);
    } else if (computerSelection == "WATER") {
      monsterHP -= 1;
      roundResult.textContent = "Round Won! Flora absorbs water!";
      document.body.appendChild(roundResult);
      monsterStatus.textContent = "Monster HP: " + monsterHP;
    } else if (computerSelection == "FIRE") {
      playerHP -= 1;
      roundResult.textContent = "Round Lost! Flora is burnt by Fire!"
      document.body.appendChild(roundResult);
      playerStatus.textContent = "Player HP: " + playerHP;
    } else {
      console.log("Something went wrong?");
    }
  } else {
    console.log("Something went wrong?");
  } 
  
//Displays final results and disables buttons
  if (playerHP == 0 || monsterHP == 0) {
    document.querySelector(".Fire").disabled = true;
    document.querySelector(".Water").disabled = true;
    document.querySelector(".Flora").disabled = true;

    if (playerHP == 0) {
      roundResult.textContent = "You Died Game Over"
    } else if (monsterHP == 0) {
      roundResult.textContent = "You beat the monster, plenty more were that came from!"
  }

}
}
