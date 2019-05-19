var reader = new FileReader();
var lengthOfHomework = 0;
var outputAll;
function readText(that){

	if(that.files && that.files[0]){
		var reader = new FileReader();
		
		reader.onload = function (e) {  
			
			var output=e.target.result;

			//process text to show only the line part on the left from the '-':				
			output=output.split("\n");
			outputAll = output;
			
			lengthOfHomework = output.length;					
		};//end onload()
		
		reader.readAsText(that.files[0]);
		
	}//end if html5 filelist support
	
	//document.getElementById('fileToInput').style.visibility = 'hidden';
				
	setTimeout(function() {showTheQuestion();}, 10);
	
} 

var currentWordIndex = 0;


function showTheQuestion()
{
	let aktualSzo;
	
	aktualSzo = outputAll[currentWordIndex].split("-");
	document.getElementById('main').innerHTML = aktualSzo[0];
	
	document.getElementById('con').style.visibility = 'hidden';
	document.getElementById('con').innerHTML = aktualSzo[1];
}

let stepToNext = false;

function showTheAnswer()
{
	if (!stepToNext)
	{
		document.getElementById('con').style.visibility = 'visible';
		document.getElementsByClassName('button')[0].innerHTML = 'Step to the next word!';
		stepToNext = true;
	} 
	else
	{
		currentWordIndex++;
		if (currentWordIndex >= lengthOfHomework)
		{
			currentWordIndex = lengthOfHomework-1;
		}
	
		showTheQuestion();
		
		document.getElementsByClassName('button')[0].innerHTML = 'Show me the answer!';
		
		stepToNext = false;
		
		setPercentageScale();
	}
	
}

function stepToLeft()
{
	currentWordIndex -= 1;
	if (currentWordIndex <= 0)
	{
		currentWordIndex = 0;
	}
	showTheQuestion();
	setPercentageScale();
}

function stepToRight()
{	
	currentWordIndex += 1;
	if (currentWordIndex >= lengthOfHomework)
	{
		currentWordIndex = lengthOfHomework-1;
	}
	showTheQuestion();
	setPercentageScale();
}

function setPercentageScale() {
  var elem = document.getElementById("myBar");   
  var width = Math.round(currentWordIndex/(lengthOfHomework-1)*100);
  
  elem.style.width = width + '%';
}








window.addEventListener("keydown", function (event) {
if (event.defaultPrevented) {
	return; // Do nothing if the event was already processed
}

switch (event.key) {
	case "Left": // IE/Edge specific value
	case "ArrowLeft":
		stepToLeft();
		break;
	case "Right": // IE/Edge specific value
	case "ArrowRight":
		stepToRight();
		break;
	case " ":
	case "Spacebar":
		showTheAnswer();
		break;
	default:
		return; // Quit when this doesn't handle the key event.
	}

	// Cancel the default action to avoid it being handled twice
	event.preventDefault();
}, true);
