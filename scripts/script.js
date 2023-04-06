const gameContainer = document.getElementById("game-container");
const ball = document.getElementById("ball");
const clickableArea = document.getElementById("clickable-area");

// Monitor the ball's position using requestAnimationFrame
function checkBallPosition() {
  console.log("clicked");
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
    ball.classList.remove("ball");
  }
}

ball.addEventListener("animationend", function (e) {
  if (e.animationName === "ballHit") {
    decreaseAnimationDuration(getComputedStyle(ball).animationDuration);
    ball.classList.remove("hit-ball");
    ball.classList.add("ball");
    console.log("The 'ballHit' animation has ended");
  }
});

ball.addEventListener("animationstart", function (e) {
  if (e.animationName === "ballFly") {
    console.log("The 'ballFly' animation has started");
    let animationDuration = parseFloat(
      getComputedStyle(ball).animationDuration
    );

    if (animationDuration <= 1 && animationDuration > 0.9) {
      ball.innerHTML = "🏀";
    } else if (animationDuration <= 0.9 && animationDuration > 0.8) {
      ball.innerHTML = "⚽";
    } else if (animationDuration <= 0.8 && animationDuration > 0.7) {
      ball.innerHTML = "🎾";
    } else if (animationDuration <= 0.7 && animationDuration > 0.6) {
      ball.innerHTML = "🎱";
    } else if (animationDuration <= 0.6 && animationDuration > 0.5) {
      ball.innerHTML = "💿";
    } else if (animationDuration <= 0.5 && animationDuration > 0.4) {
      ball.innerHTML = "🥚";
    } else if (animationDuration <= 0.4 && animationDuration > 0.3) {
      ball.innerHTML = "💣";
    } else if (animationDuration <= 0.3 && animationDuration > 0.2) {
      ball.innerHTML = "🚫";
    } else if (animationDuration <= 0.2) {
      ball.innerHTML = "💭";
    }
  }
});

clickableArea.addEventListener("click", checkBallPosition);

function decreaseAnimationDuration(input) {
  let animationDuration = parseFloat(input);

  animationDuration -= 0.04;
  // Ensure the animationDuration doesn't go below 0
  animationDuration = Math.max(animationDuration, 0);
  ball.style.animationDuration = `${animationDuration}s`;

  // Log the updated animationDuration
  console.log("Updated animation duration:", ball.style.animationDuration);
}
