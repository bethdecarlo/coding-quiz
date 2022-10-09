// Universal Variables
var currentQuestionIndex = 0;
var currentQuestion;
var timerCount;
var timer;

var questions = [
    {
        question: "Question?",
        choices: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ],
        answer: "Answer A"
    },

    {
        question: "Question?",
        choices: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ],
        answer: "Answer A"
    },

    {
        question: "Question?",
        choices: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ],
        answer: "Answer A"
    },
    
    {
        question: "Question?",
        choices: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ],
        answer: "Answer A"
    },
    
    {
        question: "Question?",
        choices: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ],
        answer: "Answer A"
    },
    {
        question: "Question?",
        choices: [
            "Answer A",
            "Answer B",
            "Answer C",
            "Answer D"
        ],
        answer: "Answer A"
    },
]    
    

// DOM elements
var startEl = document.getElementById("start");
var endEl = document.getElementById("end-screen");
var questionEl = document.getElementById("questions");
var questionTitle = document.getElementById("question-titles");
var choices = document.getElementById("choices");
var startContainer = document.getElementById("start-screen");
var timerEl = document.getElementById("timer");
var finalScoreEl = document.getElementById("final-score");
var submitEl = document.getElementById("submit");




// Quiz Functionality
function startQuiz(){
    hideStart();
    questionEl.classList.add("show");
    startTimer();
    getQuestion();
}

function getQuestion() {
    currentQuestion = questions[currentQuestionIndex];
    questionTitle.textContent = currentQuestion.question;
    choices.innerHTML = "";
    for(var i = 0; i < currentQuestion.choices.length; i ++) {
        var button = document.createElement("button");
        button.textContent = currentQuestion.choices[i];
        button.setAttribute("data", currentQuestion.choices[i]);
        choices.appendChild(button);
    }        
}

function userAnswer(event) {
    var element = event.target;
    if (element.matches("button") === true) {
        var userInput = element.getAttribute("data");
    }

    var feedback = document.createElement("p");
    if (userInput !== currentQuestion.answer) {
    timerCount = timerCount - 10;
    timerEl.textContent = timerCount;
    feedback.textContent = "Wrong Answer!";
    feedback.classList.add("wrong");
    questionEl.append(feedback);
    } 

    else {
      feedback.textContent = "Correct Answer!";
      feedback.classList.add("correct");
      questionEl.append(feedback);
    }
  
    setTimeout(function(){
        feedback.innerHTML = "";
        feedback.classList.remove("correct");
        feedback.classList.remove("wrong");
    }, "1000");
  
 
    currentQuestionIndex++;
    console.log("current question index: " + currentQuestionIndex);
    console.log("Total number of questions: " + questions.length);
    
    if(currentQuestionIndex === questions.length){
        quizEnd();
    }
      
    else{
        getQuestion();
    }
}

function quizEnd() {
    clearInterval(timer);
    endEl.classList.add("show");
    questionEl.classList.remove("show");
    questionEl.classList.add("hide");
    finalScoreEl.textContent = timerCount;
    
}


// Timer Functionality
function startTimer() {
    timerCount = 100;
    timer = setInterval(function() {
        timerCount--;
        if(timerCount == 0){
            quizEnd();
        }
        timerEl.textContent = timerCount;
    }, 1000);
}

function saveHighscore() {

    var initials = document.getElementById("initials").value;
    
    var localScores = JSON.parse(localStorage.getItem("userScores")) || [];
    
    var userScores = {
        userInitials: initials,
        userScores: timerCount
    }
 
    localScores.push(userScores);

    localStorage.setItem("userScores", JSON.stringify(localScores));
    
    location.href = "./highscores.html";
}

function hideStart() {
    startContainer.classList.remove("show");
    startContainer.classList.add("hide");
}

// Click Events
startEl.addEventListener("click", startQuiz);
choices.addEventListener("click", userAnswer);
submitEl.addEventListener("click", saveHighscore);