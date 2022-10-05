
//Let's decalre our variables! These are our DOM Elements.
var questionsElement = document.querySelector("#questions");
var timerElement = document.querySelector("#time");
var choicesElement = document.querySelector("#choices");
var submitButton = document.querySelector("#submit");
var startButton = document.querySelector("#start");
var initialsElement = document.querySelector("#initials");
var ScoringElement = document.querySelector("#scoring");


var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // Using our local var inside the startQuiz function, startscreenElement, we can use the method setAttribute to hide the start screen.
  var startScreenElement = document.getElementById("start-screen");
  startScreenElement.setAttribute("class", "hide");

  // conversely, the method removeAttribute will reveal the start screen.
  questionsElement.removeAttribute("class");

  // now we can call on our timerID to create a function that sets the timer. 
  timerId = setInterval(clockTick, 1000);

  // through the use of textContext, we can show starting time on the page.
  timerElement.textContent = time;

  getQuestion();
}

function getQuestion() {
  ?
  var currentQuestion = questions[currentQuestionIndex];

  // displays new questions on page
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clears the string of old questions
  choicesElement.innerHTML = "";

  // loops our choices
  currentQuestion.choices.forEach(function(choice, i) {
    // gives each choice a button
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // click event listener
    choiceNode.onclick = questionClick;

    // allows the choice to be seen on the page
    choicesElement.appendChild(choiceNode);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // subtracts time for wrong answer
    time -= 10;

    if (time < 0) {
      time = 0;
    }
    // if there is a penalty, this will display the new score
    timerElement.textContent = time;
    scoringElement.textContent = "Wrong!";
    scoringElement.style.color = "red";
   scoringElement.style.fontSize = "400%";
  } else {
    scoringElement.textContent = "Correct!";
    scoringElement.style.color = "green";
    scoringElement.style.fontSize = "400%";
  }

  // this will flash right/wrong 
  scoringElement.setAttribute("class", "scoring");
  setTimeout(function() {
    scoringElement.setAttribute("class", "scoring hide");
  }, 1000);

  // this will move us to the next question
  currentQuestionIndex++;

  // this will check our time length at the end of the quiz
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // this will clear the timer
  clearInterval(timerId);

  // this will bring us to the end screen
  var endScreenElement = document.getElementById("end-screen");
  endScreenElement.removeAttribute("class");

  // this displays time
  var finalScoreElement = document.getElementById("final-score");
  finalScoreElement.textContent = time;

  // this method will remove the questions element
  questionsElement.setAttribute("class", "hide");
}
//this clears our timer
function clockTimer() {
  time--;
  timerElement.textContent = time;

  // this will automatically end the quiz at a time of 0
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // grabs the user's initials
  var initials = initialsElement.value.trim();

  if (initials !== "") {
    // parses high scores from local storage
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // this sets the score time and initials of the current round
    var newScore = {
      score: time,
      initials: initials
    };

    // now that our new score is set, let's make it a string and push it to storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // and then we can view our scores on the next page. 
    window.location.href = "score.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// gives a response of saveHighscore when the submit initials button is clicked
submitButton.onclick = saveHighscore;

// gives a response of startQuiz when the startButton is clicked
startButton.onclick = startQuiz;

initialsElement.onkeyup = checkForEnter;