const highScoreDisplay = document.getElementById("high-scores-list")
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

highScoreDisplay.innerHTML = highScores.map(score => `<li class="high-score">${score.name} - ${score.score}</li>`).join("")