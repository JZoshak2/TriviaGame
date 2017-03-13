// Functions and Variables 

var correct = 0;
var wrong = 0;
var qC = 0;
var timer;
var number;
$(".winState").children().hide();
$(".QA").children().hide();

//questions needed to be both inside and outside the function to work properly. Ugh. Not sure why has something to do with reset, might refactor if time. 
var questions = [
{
	question: "Who was the Greek Leader at the Battle of Salamis?",
	wrongAnswers: ["Xerxes of Persia", "Phillip of Macedon", "Leonidas of Sparta"],
	correctAnswer: "Themistokles of Athens",
	picture: "'assets/images/themistokles.png'"
},

{
	question: "Who was the Greek leader at the Battle of Thermopylae?",
	wrongAnswers: ["Themistokles of Athens", "Herodotus of Helicarnassus", "Thucydides of Athens"],
	correctAnswer: "Leonidas of Sparta",
	picture: "'assets/images/leonidas.jpg'"
},

{
	question: "Which Greek city-state was famed for its Navy?",
	correctAnswer: "Athens",
	wrongAnswers: ["Thebes", "Sparta", "Corinth"],
	picture: "'assets/images/athens.jpg'"
},

{
	question: "Which Greek Victory is considered to be the end of the 2nd Persian Invasion of Greece?",
	wrongAnswers: ["Salamis", "Thermopylae", "Artemisia"],
	correctAnswer: "Plataea",
	picture: "'assets/images/plataea.jpg'"
},

{
	question: "Which Greek city-state played almost no role in the Greco-Persian Wars?",
	correctAnswer: "Argos",
	wrongAnswers: ["Corinth", "Naxos", "Sparta"],
	picture: "'assets/images/argos.jpg'"
}

]
var shuffle = function(arr) { //shuffles up my answers so they aren't in the same order. 
	var originalLength = arr.length;
	var newArray = [];
	for (i = 0; i < originalLength; i++) {
		var lucky = Math.floor(Math.random() * arr.length);
		newArray.push(arr[lucky]);
		arr.splice(lucky, 1);
	}
	return newArray;
}


var questionShower = function() {
	var questions = [
		{
			question: "Who was the Greek Leader at the Battle of Salamis?",
			wrongAnswers: ["Xerxes of Persia", "Phillip of Macedon", "Leonidas of Sparta"],
			correctAnswer: "Themistokles of Athens",
			picture: "'assets/images/themistokles.png'"
		},

		{
			question: "Who was the Greek leader at the Battle of Thermopylae?",
			wrongAnswers: ["Themistokles of Athens", "Herodotus of Helicarnassus", "Thucydides of Athens"],
			correctAnswer: "Leonidas of Sparta",
			picture: "'assets/images/leonidas.jpg'"
		},

		{
			question: "Which Greek city-state was famed for its Navy?",
			correctAnswer: "Athens",
			wrongAnswers: ["Thebes", "Sparta", "Corinth"],
			picture: "'assets/images/athens.jpg'"
		},

		{
			question: "Which Greek Victory is considered to be the end of the 2nd Persian Invasion of Greece?",
			wrongAnswers: ["Salamis", "Thermopylae", "Artemisia"],
			correctAnswer: "Plataea",
			picture: "'assets/images/plataea.jpg'"
		},

		{
			question: "Which Greek city-state played almost no role in the Greco-Persian Wars?",
			correctAnswer: "Argos",
			wrongAnswers: ["Corinth", "Naxos", "Sparta"],
			picture: "'assets/images/argos.jpg'"
		}

	]; //end of variable settings. Needed to be in the function because shuffle destroys the array. Merp.

	$(".QA").children().show(); //handles reset function
	$(".winState").children().hide(); // handles reset function
	$(".start").children().hide();

	clearInterval(timer);
	number = 30;
	questions[qC].wrongAnswers.push(questions[qC].correctAnswer);
	var questionList = shuffle(questions[qC].wrongAnswers);
	
	$("#questionShower").empty();
	$("#question").empty();
	$("#answerList").empty();
	$("#question").html("<h2>" + questions[qC].question) + "</h2>";
	$("#timer").html("<p> Time Left! " + number +"</p>");
	
	for (j = 0; j < questionList.length; j++) {
		$("#answerList").append("<button class='choice'>" + questionList[j] + "</button>");
	}
	
	timer = setInterval(myTimer, 1000);
	function myTimer() {
		number--;
		$("#timer").html("<p> Time Left! " + number +"</p>");

			if(number === 0) {
			stop();
			wrong += 1
			qC += 1

			if (qC < 5) { 
				questionShower();
			}

			else { //handles if the timer goes out on the last question. 
				clearInterval(timer); //stops timer at win page
				$(".QA").children().hide();
				$(".winState").children().show();
				$("#correct").html("<p> Correct Answers: " + correct + "</p>");
				$("#incorrect").html("<p> Wrong Answers: " + wrong + "</p>");
			}
		}
	}

	function stop() {
		clearInterval(timer);
	}
}

var choiceChecker = function() {
	var clicked = $(this).text();
	if(clicked === questions[qC].correctAnswer) {
		correct += 1;
		qC += 1;
		// correctPicture();
	}

	else {
		wrong += 1;
		qC += 1;
	}

	if(qC >= 5) {
		clearInterval(timer); //stops timer at win page
		$(".QA").children().hide();
		$(".winState").children().show();
		$("#correct").html("<p> Correct Answers: " + correct + "</p>");
		$("#incorrect").html("<p> Wrong Answers: " + wrong + "</p>");

	}

	else {
		questionShower();
		// setTimeout(questionShower, 2000);
	}
}

var reset = function() {
	qC = 0;
	correct = 0;
	wrong = 0;
	questionShower();
}

// var correctPicture = function() {
// 	$(".QA").hide().children();
// 	$("#answerPicture").html("<img src=" + questions[qC].picture + "/>");
// 	console.log(questions[qC].picture);
// }

var incorrectPicture = function() {

}

$(document).on("click", ".choice", choiceChecker);
$(document).on("click", "#reset", reset);
$(document).on("click", ".start", questionShower);


// left to do - hook up the picture function so it displays in between questions on a timer. 






