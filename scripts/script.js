var gameContainer = document.getElementById("game-container");
var ball = document.getElementById("ball");
var bat = document.getElementById("bat");
var clickableArea = document.getElementById("clickable-area");
var dialogue = document.getElementById("dialogue");
var title = document.getElementById("game-title");
var sun = document.getElementById("sun");

var text1 = "Hello! Welcome to this baseball game. I hope you'll enjoy!";
var text2 = "When the ball enters the red box, click to hit the ball.";
var text3 = "Try hit all the balls before sunset";

var isWin = false;

var currentText = text1;
var i = 0;

title.addEventListener("animationend", function () {
  dialogue.classList.add("show");
});
setTimeout(function typingEffect() {
  if (i < currentText.length) {
    dialogue.innerHTML += currentText[i];
    i++;
    setTimeout(typingEffect, 100);
  } else if (i == currentText.length) {
    i++;
    setTimeout(typingEffect, 1500);
  } else if (currentText === text1) {
    bat.classList.add("show");
    currentText = text2;
    i = 0;
    dialogue.innerHTML = "";
    setTimeout(typingEffect, 100);
  } else if (currentText === text2) {
    bat.classList.add("show");
    currentText = text3;
    i = 0;
    dialogue.innerHTML = "";
    setTimeout(typingEffect, 100);
  } else if (currentText === text3) {
    clickableArea.classList.add("show");
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

//
ball.addEventListener("animationend", function (e) {
  if (e.animationName === "ballHit") {
    decreaseAnimationDuration(getComputedStyle(ball).animationDuration);
    ball.classList.remove("hit-ball");
    ball.classList.add("ball");
    ball.classList.remove("delay-first-instance");
    console.log("The 'ballHit' animation has ended");
  }
});

//
bat.addEventListener("animationend", function (e) {
  bat.classList.remove("bat-click");
});

//
ball.addEventListener("animationstart", function (e) {
  if (e.animationName === "ballFly") {
    console.log("The 'ballFly' animation has started");
    let animationDuration = parseFloat(
      getComputedStyle(ball).animationDuration
    );
  }
});

clickableArea.addEventListener("click", checkBallPosition);

//
function decreaseAnimationDuration(input) {
  let animationDuration = parseFloat(input);

  animationDuration -= 0.04;
  // Ensure the animationDuration doesn't go below 0
  animationDuration = Math.max(animationDuration, 0);
  ball.style.animationDuration = `${animationDuration}s`;
  if (animationDuration == 0) {
    dialogue.innerHTML = "You Win!";
    clickableArea.classList.remove("show");
    isWin = true;
  }
  // Log the updated animationDuration
  console.log("Updated animation duration:", ball.style.animationDuration);
}

sun.addEventListener("animationend", function () {
  if (!isWin) {
    dialogue.innerHTML = "Game Over";
    clickableArea.classList.remove("show");
  }
});

//TODO
//add cloud and bird
//https://codepen.io/Mark_Bowley/pen/LYZEBq
//https://codepen.io/matchboxhero/pen/RLebOY?editors=1100
