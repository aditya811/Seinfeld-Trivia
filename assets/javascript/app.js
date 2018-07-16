$(document).ready(function() {

//object that holds all questions and answer information
var questions = {
    zero: {
        question: "In The Mango, which market / store is Kramer banned from ?",
        answers: ["John's Fruit Stand", "Mike's Fruit Stand", "Joe's Fruit Stand", "Tim's Fruite Stand"],
        correct: "Joe's Fruit Stand"
    },
    one: {
     	question: "In The Glasses, it turns out what was kissing the girl George mistook for Jerry's girlfriend Amy ?",
        answers: ["A Horse", "A Dog", "A Pole", "A Hobo"],
        correct: "A Horse"
    },
      three: {
     	question: "On which show does Jerry appear on in The Puffy Shirt ?",
        answers: ["The Early Show", "The Today Show", "The Morning Show", "Good Morning America"],
        correct: "The Today Show"
    },

      four: {
     	question: "In The Sniffing Accountant, Elaine is annoyed when her boyfriend, Jake, forgets to put what on a note he left for her ?",
        answers: ["A Name", "An Exclamation Point", "A Time and Date", "A Question Mark"],
        correct: "An Exclamation Point"
    },

      five: {
     	question: "In The Bris, after Stan and Myra relieve Elaine and Jerry of there godparent duties, who do they choose to replace them ?",
        answers: ["George", "Newman", "Uncle Leo", "Kramer"],
        correct: "Kramer"
    },

      six: {
     	question: "In The Lip Reader, which famous female tennis player is competing during Kramer's first time being a ball boy ?",
        answers: ["Steffi Graf", "Mary Pierce", "Monica Seles", "Jennifer Capriati"],
        correct: "Monica Seles"
    },

      seven: {
     	question: "In The Non-Fat Yogurt, what did George say he banged his elbow on, to make it have the spasms ?",
        answers: ["A desk", "A door", "A table", "A kitchen counter"],
        correct: "A desk"
    },

      eight: {
     	question: "In The Barber, when Pensky asked why he took the smaller office, what was George's reason ?",
        answers: ["He didn't want to Impose on anyone", "He was afraid of big spaces", "He was afraid of people watching him through the windows", "He could get more work done, less to distract him"],
        correct: "He could get more work done, less to distract him"
    },

      nine: {
     	question: "In The Masseuse, Elaine's boyfriend, Joel Rifkin, decides to change his name. What is NOT a name Elaine suggested to Joel ?",
        answers: ["Remy Rifkin", "Alex Rifkin", "Stewart Rifkin", "Deon Rifkin"],
        correct: "Alex Rifkin"
    },

      ten: {
     	question: "In The Conversion, which religion does George plan to convert to ?",
        answers: ["Moravarian Orthodox", "Lusitanian Orthodox", "Latvian Orthodox", "Greek Orthodox"],
        correct: "Latvian Orthodox"
    },
};

//setting up divs to contain info
var rightDiv = $("<div class='rightAns'></div>");
var timerDiv = $("<div class='countdown'><h3></h3></div>");
var questionDiv = $("<div class='question'><h3></h3></div>");
var answerDiv = $("<div class='answers'></div>");

//object keys to return questions in order
var keys = Object.keys(questions);
var key = keys[n];
var time = 30;
var n = 0;

//function with reset and game setup
function setup() {
    $(".start").css("display", "none");

	var correct = 0;
	var incorrect = 0;
    var timeout = 0;
    n = 0;
    key = keys[n];

    var reset = function() {
        time = 30;
        $(".rightAns").empty();
        $(".rightAns").remove();
        $(".main").append(timerDiv);
        $(".countdown h3").html("TIME REMAINING: " + time);
        $(".main").append(questionDiv);
        $(".main").append(answerDiv);
    }

reset();

//function to begin showing questions and following messages
function showQA() {
    $(".question h3").html(questions[key].question);
        
    for (var i = 0; i < questions[key].answers.length; i++) {
       	$(".answers").append("<p class='answer'>" + questions[key].answers[i] + "<p>");
    }
            
    $(".answers p").on("click", function() {
        var selected = $(this).text();

 //if then: if question right show this, if wrong show that
            if (selected === questions[key].correct) {
                clearInterval(counter);
                $(timerDiv).remove();
                $(questionDiv).remove();
                $(".answers p").remove();
                $(answerDiv).remove();
               	$(".main").append(rightDiv);
                $(".rightAns").text("YOU'RE RIGHT");
                correct++;
            } else {
                clearInterval(counter);
                $(timerDiv).remove();
                $(questionDiv).remove();
                $(".answers p").remove();
                $(answerDiv).remove();
                $(".main").append(rightDiv);
                $(".rightAns").text("OPPS! THE CORRECT ANSWER WAS: " + questions[key].correct);
                incorrect++;
            }
            n++;
            key = keys[n];

//checking if last question - if yes show score
                if (checkIfLast()) {
                	displayFinalScore();

                } else {
                    setTimeout(countReset, 3000);
                    setTimeout(reset, 3000);
                    setTimeout(showQA, 3000);
                }
    });
}

showQA();

var counter = setInterval(count, 500);

//shows time remaining at the top of each question
function count() {
    time--
    $(".countdown h3").html("TIME REMAINING: " + time);
     
    if (time < 1) {
    clearInterval(counter);
    $(timerDiv).remove();
    $(questionDiv).remove();
    $(".answers p").remove();
    $(answerDiv).remove();
    $(".main").append(rightDiv);
    $(".rightAns").html("OUT OF TIME! THE CORRECT ANSWER WAS: " + questions[key].correct);
    timeout++;
    n++;
    key = keys[n];
    
    	if (checkIfLast()) {
    	displayFinalScore();
    	} else {
    	setTimeout(countReset, 3000);
    	setTimeout(reset, 3000);
    	setTimeout(showQA, 3000);
    	}
    }
}

function checkIfLast() {
    if (key === undefined) {
    return true;
    }
    return false;
    }

//timer for message after choosing answer
 function countReset() {
    counter = setInterval(count, 500);
}




//displays final score after 'check if last' returns yes
function displayFinalScore() {
    $(".rightAns").remove();
    $(".start").css("margin-top", "30px");
    $(".start").css("display", "inline");
    $(".main").prepend("<h2>UNANSWERED: " + timeout + "</h2>");
    $(".main").prepend("<h2>INCORRECT: " + incorrect + "</h2>");
    $(".main").prepend("<h2>CORRECT: " + correct + "</h2>");
	}
};

$(document).on("click", ".start", setup);

});
