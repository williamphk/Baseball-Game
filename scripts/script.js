//HTML elements
var gameContainer = document.getElementById("game-container");
var ball = document.getElementById("ball");
var bat = document.getElementById("bat");
var clickableArea = document.getElementById("clickable-area");
var dialogue = document.getElementById("dialogue");
var title = document.getElementById("game-title");
var sun = document.getElementById("sun");

//Game Logic
var isWin = false;

//Dialogue content
var text1 = "Hello! Welcome to this baseball game. I hope you'll enjoy!";
var text2 = "When the ball enters the red box, click to hit the ball.";
var text3 = "Try hit all the balls before sunset";
var currentText = text1;
var i = 0;

//Dialogue shows after the title animation
title.addEventListener("animationend", function () {
  dialogue.classList.add("show");
});

//Set the speed of the dialogue, the dialogue appears after the title animation (4s)
setTimeout(function typingEffect() {
  if (i < currentText.length) {
    dialogue.innerHTML += currentText[i];
    i++;
    setTimeout(typingEffect, 70);
  } else if (i == currentText.length) {
    i++;
    //time between text
    setTimeout(typingEffect, 1000);
  } else if (currentText === text1) {
    //change text to text2
    bat.classList.add("show");
    currentText = text2;
    i = 0;
    dialogue.innerHTML = "";
    setTimeout(typingEffect, 70);
  } else if (currentText === text2) {
    bat.classList.add("show");
    //change text to text3
    currentText = text3;
    i = 0;
    dialogue.innerHTML = "";
    setTimeout(typingEffect, 70);
  } else if (currentText === text3) {
    //after text3
    clickableArea.classList.add("show");
    //for accessibility
    dialogue.setAttribute("aria-live", "polite");
    dialogue.innerHTML = "Start!";
  }
}, 4000);

// Monitor the ball's position using requestAnimationFrame
function checkBallPosition() {
  console.log("clicked");
  bat.classList.add("bat-click");
  const gameContainerRect = gameContainer.getBoundingClientRect();
  const ballRect = ball.getBoundingClientRect();

  // Calculate the center point of the game container
  const centerX = gameContainerRect.left + gameContainerRect.width / 2;

  // Check if the ball's horizontal center is within a certain range of the game container's center
  const range = 100; // detection range
  const ballCenterX = ballRect.left + ballRect.width / 2;
  if (Math.abs(ballCenterX - centerX) <= range) {
    console.log("The ball is in the middle of the screen");
    ball.classList.add("hit-ball");
    dialogue.innerHTML = "HOMERUN!!!";
    ball.classList.remove("ball");
  } else {
    dialogue.innerHTML = "Missed";
  }
}

//After the ball is hit
ball.addEventListener("animationend", function (e) {
  if (e.animationName === "ballHit") {
    decreaseAnimationDuration(getComputedStyle(ball).animationDuration);
    ball.classList.remove("hit-ball");
    ball.classList.add("ball");
    ball.classList.remove("delay-first-instance");
    console.log("The 'ballHit' animation has ended");
  }
});

//Remove class bat-click after the animation of bat ended
bat.addEventListener("animationend", function (e) {
  bat.classList.remove("bat-click");
});

clickableArea.addEventListener("click", checkBallPosition);

//Change the speed of the ball
function decreaseAnimationDuration(input) {
  let animationDuration = parseFloat(input);

  animationDuration -= 0.04;
  // Ensure the animationDuration doesn't go below 0
  animationDuration = Math.max(animationDuration, 0);
  ball.style.animationDuration = `${animationDuration}s`;
  //If the speed of ball drop to 0, the player won
  if (animationDuration == 0) {
    dialogue.innerHTML = "You Win!";
    clickableArea.classList.remove("show");
    isWin = true;
  }
  // Log the updated animationDuration
  //console.log("Updated animation duration:", ball.style.animationDuration);
}

//If the sun is set, the game will be over
sun.addEventListener("animationend", function () {
  if (!isWin) {
    dialogue.innerHTML = "Game Over";
    clickableArea.classList.remove("show");
  }
});
