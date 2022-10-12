var optionsEl = document.querySelector("#options");
var mainContainer = document.querySelector("#main-container");
var questionsArray = [
    { question: "Which number is greater than 5?",
        choice: ["2", "3", "4", "6 (This is the correct answer)"],
        correctAnswer: "6"
    }
];


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
    var questionCounter = 1;
    var buttonCounter = 1;
    var questionTitleEl = document.querySelector("#question-title");
    var questionPromptEl = document.querySelector("#question-prompt")
    
    for(var i = 0; i < questionsArray.length; i++){
        // question number
        questionTitleEl.innerHTML = "Question " + questionCounter;
        questionPromptEl.innerHTML = questionsArray[i].question;

        for(var j = 0; j < questionsArray[i].choice.length; j++){
            var answerButtonEl = document.createElement("button");
            answerButtonEl.className = "choice";
            answerButtonEl.innerHTML = buttonCounter + ") " + questionsArray[i].choice[j];
            optionsEl.appendChild(answerButtonEl);
            buttonCounter++;
        }
    }
};

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

    }
};

optionsEl.addEventListener("click", ButtonHandlerEl);