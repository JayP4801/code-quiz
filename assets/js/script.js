var optionsEl = document.querySelector("#options");
var submitFormEl = document.querySelector("#submit-form");
var mainSectionEl = document.querySelector("#main-section");
var subheaderEl = document.querySelector("#subheader-container");
var questionId = 0;
var score = 0;
var timeLimit = 90;
var compareAnswerEl = [];
var highScore = [];
var questionsArray = [
    { question: "",
        choice: ["Red", "Blue", "Green", "Purple"],
        correctAnswer: "Purple",
        id: 1
    },
    { question: "",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples",
        id: 2
    },
    { question: "",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples",
        id: 3
    },
    { question: "",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples",
        id: 4
    },
    { question: "",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples",
        id: 5
    },
    { question: "",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples",
        id: 6
    },
    { question: "",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples",
        id: 7
    },
    { question: "",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples",
        id: 8
    },
    { question: "",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples",
        id: 9
    },
    { question: "",
        choice: ["Peanuts", "Cashews", "Apples", "Pastachios"],
        correctAnswer: "Apples",
        id: 10
    },

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

var displayHighScore = function(){
    var scoreContainer = document.getElementById("score-container");

    if(scoreContainer.style.display === "block"){
        scoreContainer.style.display = "none";
    } else {
        scoreContainer.style.display = "block";
    }
};

var generateHighScore = function(scoreObj){
    var scoreList = document.querySelector("#score-list");

    var scoreEl = document.createElement("li");
    scoreEl.className = "player-score";

    scoreEl.innerHTML = "Name: " + scoreObj.name + "&nbsp;&nbsp;&nbsp;&nbsp; Score: " + scoreObj.score

    scoreList.appendChild(scoreEl);
}

var questionHandlerEl = function(){
    var currentQuestionEl = document.querySelector("#question-title");
    var questionPromptEl = document.querySelector("#question-prompt");

    if(questionId === questionsArray.length){
        gameOver();
        timeLimit = 0;
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

        score++;
        
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

    // dynamically generate high score menu
    var endMenu = document.createElement("section");
    endMenu.className = "end-menu";
    endMenu.id = "end-menu";
    endMenu.innerHTML = "<h1 id='end-menu-title'>All done!</h1><h2 id='end-menu-description'>Your final score is " + score + "!</h2>";

    mainSectionEl.appendChild(endMenu);

    var submitForm = document.createElement("div");
    submitForm.className = "submit-form";
    submitForm.id = "submit-form";
    submitForm.innerHTML = "<h2 id='submit-form-title'>Enter your name</h2><input type='text' name='username' id='submit-form-input'>";

    endMenu.appendChild(submitForm);

    var submitButton = document.createElement("button");
    submitButton.className = "submit-btn";
    submitButton.id = "submit-btn";
    submitButton.textContent = "Submit";

    submitForm.appendChild(submitButton);
};

var thankYouPage = function(){
    document.getElementById("submit-form").remove();
    document.getElementById("end-menu-title").textContent = "Thanks for playing!";
    document.getElementById("end-menu-description").textContent = "Refresh the page to try again!";

};

var submitScore = function(){
    var playerNameInput = document.querySelector("input[name='username']").value;
    var playerScore = score;
    
    var savedScores = {
        name: playerNameInput,
        score: playerScore
    }

    highScore.push(savedScores);
    generateHighScore(savedScores);

    localStorage.setItem("highscore", JSON.stringify(highScore));
};

var loadScore = function(){
    // get scores from local storage
    var downloadScores = localStorage.getItem("highscore");

    // if there are no scores saved, return false
    if (!downloadScores){
        
        return false;
    }

    // parse the scores
    downloadScores = JSON.parse(downloadScores);

    // for each object, push the scores with correlating names into highScore=[] and add to 'Show scores' menu
    for(var i = 0; i < downloadScores.length; i++){
        var playerName = downloadScores[i].name;
        var playerScore = downloadScores[i].score;

        var savedScores = {
            name: playerName,
            score: playerScore
        }

        highScore.push(savedScores);
        generateHighScore(savedScores);
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
    } else if(targetEl.matches(".submit-btn")){
        submitScore();
        thankYouPage();
    }
};

mainSectionEl.addEventListener("click", ButtonHandlerEl);

// load in scored on page load
loadScore();