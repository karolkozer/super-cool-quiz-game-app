var AppController = (function(){
    
    var DOM = {
        displayQuestion: ".display-question",
        boxBtn: ".btn-box",
        btnChoice: ".btn-small",
        btnAward: "#award",
        btnStart: "#start",
        sectionHome: ".section-home",
        sectionGame: ".section-game",
        sectionGameResult: ".section-game-result",
        overlay: ".overlay-reward",
        span: "p span"
    }
    
    // Question Constructor
    var Question = function(description, answer, correct) {
        this.description = description;
        this.answer = answer;
        this.correct = correct;
    }
    
    // Quiz Constructor
    var Quiz = function(questions){
        this.questions = questions;
        this.failures = 0;
        this.questionNumber = 0;
    }
    
    Quiz.prototype.getQuestion = function() {
        return this.questions[this.questionNumber];
    }
    
    Question.prototype.checkAnswer = function(choice) {
        return this.correct === choice;
    }
    
    Quiz.prototype.choiceResult = function(choice) {
        if(this.getQuestion().checkAnswer(choice)) {
            console.log("Great!!! Correct!!");
        } else {
            console.log("Wrong!!!");
            this.failures++;
        }
        
        this.questionNumber++;
    }
    
    
    // Display section blueprint
    var display = function(section, show) {
        document.querySelector(section).style.display = show;
    }
    
    // Display text content blueprint
    var displayText = function(el, text) {
        document.querySelector(el).textContent = text;
    }
    
    // Display answers
    var displayAnswers = function(el) {
        var btnChoice = document.querySelectorAll(DOM.btnChoice);
        
        btnChoice.forEach(function(e, i){
            e.textContent = Game.getQuestion().answer[i];
        })
    }
    
    // Show text game result
    var displayTextGameResult = function() {
        var spanText = document.querySelectorAll(DOM.span);
        var resultTextContent = ["You", "Are", "Not", "good enough!"];
        
        spanText.forEach(function(e, i){
            e.textContent = resultTextContent[i];
        })
    }
    
    var displayQuestion = function() {
        // Display Description
        displayText(DOM.displayQuestion, Game.getQuestion().description);
        // Display answer
        displayAnswers();
    }
    
    var gameResult = function() {
        
        // Check failure
        if(Game.failures > 0) {
            display(DOM.btnAward, "none");
            displayTextGameResult();
            
        }
        display(DOM.sectionGameResult, "block");
        display(DOM.sectionGame, "none");
    }
    
    // Display next question
    var nextQuestion = function() {
        
        // Check if question number is greater than array length 
        if(Game.questionNumber === Game.questions.length) {
            console.log("Game OVER");
            gameResult();
        } else {
            displayQuestion();
        }
    }
    
    // Check clicked answer
    var checkChoice = function(e) {
            var click = e.target.id;
            
            if(click) {
                var splited = click.split("-");
                var index = parseInt(splited[1]);
                
                console.log(index);
                Game.choiceResult(index);
                nextQuestion();
            }
    }
    
    // Set up buttons
    var setUpEventListeners = function() {
        document.querySelector(DOM.boxBtn).addEventListener("click", checkChoice);
        
        document.querySelector(DOM.btnStart).addEventListener("click", function() {
            display(DOM.sectionHome, "none");
            display(DOM.sectionGame, "block");
            
        });
        
        document.querySelector(DOM.btnAward).addEventListener("click", function() {
            display(DOM.overlay, "block"); 
        });
    }
    
   
    // Questions
    var q1 = new Question("Which US state is named on the label of a Jack Daniels bottle?", ["Orlando", "Tennessee", "Arizona"], 1);
    
    var q2 = new Question("Who played the role of Anakin Skywalker?", ["Mark Hamil", "Ewan Mcgregor" , "H.Christensen"], 2);
    
    var q3 = new Question("Kodiak Island is in which US state?", ["Alaska", "California", "Texas"], 0);
    
    var q4 = new Question("Who composed the star wars music?", ["Carrie Fisher", "John Williams" , "Mark Hamil"], 1);
    
    var q5 = new Question("What is the name of Luke's uncle?", ["Owen", "Ben" , "Rob"], 0);
    
    var q6 = new Question("Who was Ash's first Pokemon??", ["Bulbasaur", "Pikachu" , "Charizard"], 1);
    
    // Setup questions array
    var questionsList = [q1, q2, q3, q4, q5];
    
    //Set up new Game
    var Game = new Quiz(questionsList);
    
    return {
        init: function(){
            console.log("App is working!");
            setUpEventListeners();
        }
    }
    
})();

AppController.init();
