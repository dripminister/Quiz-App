const saveHighScoreBtn = document.getElementById("save-score-btn")
const usernameInput = document.getElementById("username")
const finalScore = document.getElementById("final-score")

const recentScore = localStorage.getItem("recentScore")
finalScore.innerText = recentScore

const highScores = JSON.parse(localStorage.getItem("highScores")) || []


usernameInput.addEventListener("keyup", () => {
    if(usernameInput.value.length > 0){
        saveHighScoreBtn.disabled = false
    }else{
        saveHighScoreBtn.disabled = true
    }
})

saveHighScoreBtn.addEventListener("click", (e) => saveHighScore(e))

function saveHighScore(e){
    e.preventDefault()
    const score = {
        score: recentScore,
        name: usernameInput.value
    }
    highScores.push(score)

    highScores.sort((a,b) => b.score - a.score)
    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign("/")
}