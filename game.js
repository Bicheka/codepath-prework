var buttonColours = ["red", "blue", "green", "yellow", "cyan", "fuchsia", "blueviolet", "chartreuse", "orangered"];

var gamePattern = [];
var userClickedPattern = [];
var maxLevel = 8;
var started = false;
var level = 0;

//start-stop button
$("#start").click(function () {
  //start button
  if (!started) {
    $("#start").text("STOP");
    document.querySelector("#start").style.backgroundColor = "#D82148";
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();

    //stop button
  } else {
    $("#start").text("START");
    playSound("wrong");
    $("body").addClass("game-over");
    document.querySelector("#start").style.backgroundColor = "#6EBF8B";
    $("#level-title").text("Game Over, Press Start to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
});

// detects if a button is pressed
$(".btn").click(function () {

  //if button START was pressed continue with the game
  if(started)
  {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  }
  // if a button is pressed and the game has not started only show the animation
  else
  {
    var userChosenColour = $(this).attr("id");
    playSound(userChosenColour);
    animatePress(userChosenColour);
    startOver();
  }
});

//checks if the user entered the correct pattern
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
    // if the user enter correctly the entire pattern then the user wins
    if (userClickedPattern.length === maxLevel) {

      playSound("win");
      $("#start").text("START");
      document.querySelector("#start").style.backgroundColor = "#6EBF8B";
      $("#level-title").text("You won!!!, Press Start to Restart");
      $("body").addClass("win");

      setTimeout(function () {
        $("body").removeClass("win");
      }, 500);

      startOver();


     
    }
     //if the user has not completed the pattern yet start another sequence
    else if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

  // if the user enters the wrong pattern, the user looses
  } 
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#start").text("START");
    document.querySelector("#start").style.backgroundColor = "#6EBF8B";
    $("#level-title").text("Game Over, Press Start to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

//makes the pattern and each time is called add a new clue
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 9);

  //if the button has been repeated 2 times already random again to have more variety
  if((randomNumber===userClickedPattern[level-1]) && (randomNumber===userClickedPattern[level-2]))
  {
    randomNumber = Math.floor(Math.random() * 9);
  }

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  for (let i = 0; i < gamePattern.length; i++) {
    setTimeout(function () {
      animatePress(gamePattern[i]);
      playSound(gamePattern[i]);
    }, (1000 - (level * 75)) * i); //speed of the sequence
  }
}

//give teh effect to the button when pressed
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed" + currentColor);

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed" + currentColor);
  }, 100);
}
//play the specified song
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//clean the pattern up and start again
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

