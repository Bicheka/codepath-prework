
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$("#start").click(function() {
  if (!started) {
    $("#start").text("STOP");
    document.querySelector("#start").style.backgroundColor = "#D82148";
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
  else{
    $("#start").text("START");
    playSound("wrong");
    $("body").addClass("game-over");
    document.querySelector("#start").style.backgroundColor = "#6EBF8B";
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});



//checks if the user entered the correct pattern
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
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


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  for(let i = 0;i < gamePattern.length;i++){
    setTimeout(function () {
      $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(gamePattern[i]);
    }, (1000-(level*100)) * i);
  }
}
   

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed"+currentColor);

    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed"+currentColor);
      }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
