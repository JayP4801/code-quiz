var optionsEl = document.querySelector("#options");
var mainContainer = document.querySelector("#main-container");
var questionsArray = [
    { question: "Which of these is not like the other?",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples"
    },
    { question: "Which of the following is not round?",
        choice: ["Football", "Basket ball", "Baseball", "Tennis Ball"],
        correctAnswer: "Football"
    },
    { question: "How many stars are on the American flag?",
        choice: ["47", "48", "49", "50"],
        correctAnswer: "50"
    }
];
var answerMatchEl = [];

var quizTimeHandlerEl = function(quizDataObj){
    document.getElementById("timer").innerHTML = "Good luck!";
    var countdownTimer = setInterval(function(){
        if(quizDataObj.time <= 0){
            clearInterval(countdownTimer);
            document.getElementById("timer").innerHTML = "TIME'S UP!";
        } else{
            document.getElementById("timer").innerHTML = quizDataObj.time + " seconds remaining";
        }
        quizDataObj.time -= 1;
    }, 1000);
};

var questionHandlerEl = function(){
    var buttonCounter = 1;
    var questionId = 1;
    var questionTitleEl = document.querySelector("#question-title");
    var questionPromptEl = document.querySelector("#question-prompt");

    for(var i = 0; i < questionsArray.length; i++){
        // question number
        questionTitleEl.innerHTML = "Question " + questionId;
        questionPromptEl.innerHTML = questionsArray[i].question;

        for(var j = 0; j < questionsArray[i].choice.length; j++){
            var answerButtonEl = document.createElement("button");
            answerButtonEl.className = "choice";
            answerButtonEl.innerHTML = buttonCounter + ") " + questionsArray[i].choice[j];

            optionsEl.appendChild(answerButtonEl);

            buttonCounter++;
        };

        answerMatchEl.answer = questionsArray[i].correctAnswer;
        questionId++;
        questionsArray++;
        return false;
    };
};

var answerResult = function(){
    var selectedAnswer = answerMatchEl.selectedAnswer;
    var questionAnswer = answerMatchEl.answer;
    selectedAnswer = selectedAnswer.slice(3);

    if(selectedAnswer === questionAnswer){
        console.log("CORRECT ANSWER!");
        questionHandlerEl();
    }
}

var ButtonHandlerEl = function(event){
    var targetEl = event.target;
    var score = 0;
    var timeLimit = 90;

    if(targetEl.matches(".start-btn")){
        // change question classname
        var questionLayoutEl = document.querySelector("#description");
        questionLayoutEl.className = "question";

        var answerLayoutEl = document.querySelector("#answer-section");
        answerLayoutEl.className = "answer-section";

        // remove start button
        var startButtonEl = document.querySelector("#start-btn");
        startButtonEl.remove();

        var quizDataObj = {
            score: score,
            time: timeLimit
        };

        questionHandlerEl();
        quizTimeHandlerEl(quizDataObj);
    } else if(targetEl.matches(".choice")){
        var answerInput = targetEl.innerText;
        answerMatchEl.selectedAnswer = answerInput;
        answerResult();
    }
};

optionsEl.addEventListener("click", ButtonHandlerEl);