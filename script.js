const questions = [
    {
        question : "Which keyword is used for function in python language?",
        answer : [
            {text: "function()" , correct: false },
            {text: "Function()" , correct: false },
            {text: "define()" , correct: false },
            {text: "def()" , correct: true },
        ]
    },
    {
        question : "Who is the father of JavaScript?",
        answer : [
            {text: "Rutherford" , correct: false },
            {text: "Larry Page" , correct: false },
            {text: "Brendan Eich" , correct: true },
            {text: "Sergio Brain" , correct: false },
        ] 
    },
    {
        question : "Which of the following is the correct extension of python file?",
        answer : [
            {text: "pl" , correct: false },
            {text: "pi" , correct: false },
            {text: "py" , correct: true },
            {text: "pk" , correct: false },
        ]  
    },
    {
        question : "Who developed Python Programming Language?",
        answer : [
            {text: "Wick van Rossum" , correct: false },
            {text: "Rasmus Lerdorf" , correct: false },
            {text: "Guido van Rossum" , correct: true },
            {text: "Niene Stom" , correct: false },
        ]   
    },
    {
        question : "Which type of Programming does Python support?",
        answer : [
            {text: "object-oriented programming" , correct: false },
            {text: "structured programming" , correct: false },
            {text: "functional programming" , correct: true },
            {text: "All of the above" , correct: true },
        ]   
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();