var optionsEl = document.querySelector("#options");
var mainContainer = document.querySelector("#main-container");
var questionId = 0;
var compareAnswerEl = [];
var questionsArray = [
    { question: "Which of these is not like the other?",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples",
        id: 1
    },
    { question: "Which of the following is not round?",
        choice: ["Football", "Basket ball", "Baseball", "Tennis Ball"],
        correctAnswer: "Football",
        id: 2
    },
    { question: "How many stars are on the American flag?",
        choice: ["47", "48", "49", "50"],
        correctAnswer: "50",
        id: 3
    },
    { question: "The answer is the first one?",
        choice: ["47", "48", "49", "50"],
        correctAnswer: "47",
        id: 4
    },
    { question: "The answer is the second one?",
        choice: ["47", "48", "49", "50"],
        correctAnswer: "48",
        id: 5
    },
    { question: "The answer is the last one?",
        choice: ["47", "48", "49", "50"],
        correctAnswer: "50",
        id: 6
    },
    { question: "The answer is the last one?",
        choice: ["47", "48", "49", "50"],
        correctAnswer: "50",
        id: 7
    },
    { question: "The answer is the first one?",
        choice: ["47", "48", "49", "50"],
        correctAnswer: "47",
        id: 8
    },
    { question: "The answer is the second one?",
        choice: ["47", "48", "49", "50"],
        correctAnswer: "48",
        id: 9
    },
    { question: "The answer is the second one?",
        choice: ["47", "48", "49", "50"],
        correctAnswer: "48",
        id: 10
    },
];

var quizTimeHandlerEl = function(quizDataObj){
    document.getElementById("timer").innerHTML = "Good luck!";
    var countdownTimer = setInterval(function(){
        if(quizDataObj.time <= 0){
            clearInterval(countdownTimer);
            document.getElementById("timer").innerHTML = "TIME'S UP!";

            endGame();
            return false;
        } else{
            document.getElementById("timer").innerHTML = quizDataObj.time + " seconds remaining";
        }
        quizDataObj.time -= 1;
    }, 1000);

    
};

var questionHandlerEl = function(){
    var currentQuestionEl = document.querySelector("#question-title");
    var questionPromptEl = document.querySelector("#question-prompt");

    if(questionId === questionsArray.length){
        console.log("END GAME!")
        endGame();
        return false;
    };

    currentQuestionEl.textContent = "Question " + questionsArray[questionId].id;

    questionPromptEl.textContent = questionsArray[questionId].question;

    compareAnswerEl.correctAnswer = questionsArray[questionId].correctAnswer;
    
    answerButtonHandlerEl(questionId);
    console.log(questionId);
    questionId++;
};

var answerButtonHandlerEl = function(questionId){
    var buttonCounter = 1;
    var currentArray = questionsArray[questionId].choice;
    
    for(var i = 0; i < currentArray.length; i++){
        var answerButtonEl = document.createElement("button");
        answerButtonEl.className = "choice";

        answerButtonEl.innerHTML = buttonCounter + ") " + currentArray[i];
        optionsEl.appendChild(answerButtonEl);
        buttonCounter++;
    };
};

var answerResult = function(){
    var selectedAnswer = compareAnswerEl.chosenAnswer;
    var questionAnswer = compareAnswerEl.correctAnswer;
    selectedAnswer = selectedAnswer.slice(3);

    if(selectedAnswer === questionAnswer){
        console.log("CORRECT ANSWER!");

        // remove all buttons
        removeButtonEl();
    } else{
        console.log("WRONG!");
        console.log(quizDataObj.time);
        removeButtonEl();
    };
};

var removeButtonEl = function(){
    while(optionsEl.firstChild){
        optionsEl.removeChild(optionsEl.firstChild);
    };
};

var endGame = function(){

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
        console.log(mainContainer);
    } else if(targetEl.matches(".choice")){
        var answerInput = targetEl.innerText;
        compareAnswerEl.chosenAnswer = answerInput;
        answerResult();
        questionHandlerEl();
    }
};

optionsEl.addEventListener("click", ButtonHandlerEl);