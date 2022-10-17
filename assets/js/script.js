var optionsEl = document.querySelector("#options");
var mainSectionEl = document.querySelector("#main-section");
var subheaderEl = document.querySelector("#subheader-container");
var questionId = 0;
var score = 0;
var timeLimit = 90;
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
    }
];

var countdownTimer = function(){
    if(timeLimit >= 0){
        document.getElementById("timer").innerHTML = timeLimit + " seconds remaining";
        timeLimit -= 1;
    } else{
        clearInterval(countdownTimer);
        document.getElementById("timer").innerHTML = "TIME'S UP!";
        timeLimit = 0;

        gameOver();
        return false;
    }
    setTimeout(countdownTimer, 1000);
};

var questionHandlerEl = function(){
    var currentQuestionEl = document.querySelector("#question-title");
    var questionPromptEl = document.querySelector("#question-prompt");

    if(questionId === questionsArray.length){
        console.log("Game Over!")
        gameOver();
        return false;
    };

    currentQuestionEl.textContent = "Question " + questionsArray[questionId].id;

    questionPromptEl.textContent = questionsArray[questionId].question;

    compareAnswerEl.correctAnswer = questionsArray[questionId].correctAnswer;
    
    answerButtonHandlerEl(questionId);
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
    var resultPrompt = document.querySelector("#result-prompt");

    // removes any text prior to the first instance of space " " only from selectedAnswer text. e.g. "1) Text" => "Text" or "100) (Text)" => "(Text)"
    selectedAnswer = selectedAnswer.slice(selectedAnswer.indexOf(" ") + 1);

    if(selectedAnswer === questionAnswer){
        // if correct answer is selected, prompt correct
        resultPrompt.textContent = "Correct!";
        
        // remove previous answer buttons
        removeButtonEl();
    } else{
        // if wrong answer is selected, prompt incorrect
        resultPrompt.textContent = "Incorrect!";

        // dynamically generate penalty prompt to use fadeOut animation in css
        var penaltyPrompt = document.createElement("h2");
        penaltyPrompt.className = "penalty-prompt";
        penaltyPrompt.id = "penalty-prompt";
        penaltyPrompt.textContent = "-10 seconds";

        subheaderEl.appendChild(penaltyPrompt);

        // penalize time
        timeLimit-=10;

        // remove previous answer buttons
        removeButtonEl();
    };
};

var removeButtonEl = function(){
    while(optionsEl.firstChild){
        optionsEl.removeChild(optionsEl.firstChild);
    };
};

var gameOver = function(){
    // remove quiz content
    while(mainSectionEl.firstChild){
        mainSectionEl.removeChild(mainSectionEl.firstChild);
    };
};

var ButtonHandlerEl = function(event){
    var targetEl = event.target;

    if(targetEl.matches(".start-btn")){
        // change question classname
        var questionLayoutEl = document.querySelector("#description");
        questionLayoutEl.className = "question";

        var answerLayoutEl = document.querySelector("#answer-section");
        answerLayoutEl.className = "answer-section";

        // remove start button
        var startButtonEl = document.querySelector("#start-btn");
        startButtonEl.remove();

        questionHandlerEl();
        countdownTimer();
    } else if(targetEl.matches(".choice")){
        var answerInput = targetEl.innerText;
        compareAnswerEl.chosenAnswer = answerInput;

        if(document.querySelector("#penalty-prompt")){
            var penaltyPrompt = document.querySelector("#penalty-prompt");
            subheaderEl.removeChild(penaltyPrompt);
        }

        answerResult();
        questionHandlerEl();
    }
};

optionsEl.addEventListener("click", ButtonHandlerEl);