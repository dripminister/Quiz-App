const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"))
const questionCounterElement = document.getElementById("progress-text")
const scoreElement = document.getElementById("score")
const progressBarFull = document.getElementById("progress-bar-full")
const gameDisplay = document.getElementById("game")
const loader = document.getElementById("loader")

let currentQuestion = {}
let acceptingAnswers = false 
let score = 0
let questionCount = 0
let availableQuestions = []
let questions = []

fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then(res => res.json())
    .then(data => {
        questions = data.results.map(quest => {
            const formattedQuestion = {
                question: quest.question
            }

            const answerChoices = [...quest.incorrect_answers]
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1
            answerChoices.splice(formattedQuestion.answer - 1, 0, quest.correct_answer)

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index+1)] = choice
            })

            return formattedQuestion
        })
        loader.classList.add("hidden")
        gameDisplay.classList.remove("hidden")
        startGame()
    })
    .catch(err => console.log(err))

const correctBonus = 5
const maxQuestions = 10

function startGame(){ 
    questionCount = 0
    score = 0 
    availableQuestions = [...questions]
    getNewQuestion()
}

function getNewQuestion(){
    if(availableQuestions.length === 0 || questionCount >= maxQuestions){
        localStorage.setItem("recentScore", score)
        return window.location.assign("/end.html")
    }
    questionCount++

    questionCounterElement.innerText = "Question " + questionCount + "/" + maxQuestions

    progressBarFull.style.width = (questionCount / maxQuestions) * 100 + "%"

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = "incorrect"
    	if(selectedAnswer == currentQuestion.answer) {
            classToApply = "correct"
            incrementScore(correctBonus)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)        
    })
})

function incrementScore(num){
    score += num
    scoreElement.innerText = score
}
