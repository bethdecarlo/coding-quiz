var clearEl = document.getElementById("clr-scores");
var highScoresList = document.getElementById("highscores-list");

//Print Scores
function printHighscores() {
    var highscore = JSON.parse(localStorage.getItem("userScores")) || [];     
    var sortedHighscore = highscore.sort((user1, user2) => {
        return user2.userScores - user1.userScores;
    });
    if (sortedHighscore !== null) {
        for(var i = 0; i < sortedHighscore.length; i ++){
            console.log(sortedHighscore[i].userInitials);
            console.log(sortedHighscore[i].userScores);
            var li = document.createElement("li");
            li.textContent = sortedHighscore[i].userInitials + " - " + sortedHighscore[i].userScores
            console.log(li);
            console.log(li.textContent);
            highScoresList.appendChild(li);        
        }
    }   
}

//Clear Scores
function clearScores(event) {
    event.preventDefault();
    localStorage.clear();
    console.log("test");
    window.location.reload();
}
 
printHighscores();
clearEl.addEventListener("click", clearScores);