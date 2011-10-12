var answerText= null

var leftNum = 0;
var rightNum = 0;

var inputAnswer = null;

var questionNum = 10;
var progress = 0;


var AnimationParam = function() {
  this.opacity = 1.0;
  this.timerArray = new Array();
  this.color = null;
}


function setQuestionNum(num){
	questionNum = num;
}

function fillProgress(){
	var canvas = document.getElementById('progress');
	if (canvas.getContext){
		var context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "rgb(200, 200, 200)";
		context.drawRect(0, 0, canvas.width*progress/questionNum-1, canvas.height-1);
		context.fillStyle = "rgb(0, 255, 0)";
		context.fillRect(1,1,canvas.width*progress/questionNum-2, canvas.height-2);
		
		context.font = "15pt Verdana";
		context.fillStyle = "rgb(0, 0, 0)"

		var text = progress + "/" + questionNum;
		var metrics = context.measureText(text);
		context.fillText(text,200-metrics.width,25);
	}
}

function putString(arg_sring){
	var current = answerText;
	if(answerText!=null&&answerText.length>4)return;

	if(answerText!=null){
		answerText = answerText + arg_sring;
	}else{
		answerText = arg_sring;
	}

	drawAnswer();
}

function clearAnswer(){
	answerText = "";
	drawAnswer();
}

function backSpace(){
	if(answerText!=null&&answerText.length>0){
		answerText = answerText.substr(0,answerText.length-1);
	}
	drawAnswer();
}

function generateQuestion(){
	leftNum = (Math.floor(Math.random () * 100) + 1);
	rightNum = (Math.floor(Math.random () * 100) + 1);
	drawQuetion();
}

function check(){
	if((leftNum+rightNum) == answerText){
		fadeCorrectAnswer();
		generateQuestion();
		progress++;
		fillProgress();
	}else{
		fadeIncorrectAnswer();
	}
}

function onKeyDown(e) {
	var code = keyCode(e);
	if(code>='48'&&code<='57'){
		putString(code-48);
	}else
	if(code=='13'){
		check();
	}else
	if(code='8'){
		if(answerText!=null&&answerText.length>0){
			answerText = answerText.substring(0,answerText.length-1);
			drawAnswer();
		}
		return false;
	}
}

function keyCode(e){
    if(document.all)
        return  e.keyCode;
    else if(document.getElementById)
        return (e.keyCode)? e.keyCode: e.charCode;
    else if(document.layers)
        return  e.which;
}


function numOnly() {
  m = String.fromCharCode(event.keyCode);
  if("0123456789\b\r".indexOf(m, 0) < 0) return false;
  return true;
}

function drawAnswer(){
	var canvas = document.getElementById('answer');
	if (canvas.getContext){
		var context = canvas.getContext('2d');
		context.fillStyle = "rgb(255, 255, 255)"
		context.clearRect(0,0,canvas.width,canvas.height);

		context.shadowColor = "rgb(100,100,100)";
		context.shadowOffsetX = 3;
		context.shadowOffsetY = 3;
		context.shadowBlur = 5;
		context.font = "30pt Verdana";
		context.fillStyle = "rgb(0, 0, 0)"

		var metrics = context.measureText(answerText);
		context.fillText(answerText,200-metrics.width,40);
	}
}

function drawQuetion(){
	var canvas = document.getElementById('question');
	if (canvas.getContext){
		var context = canvas.getContext('2d');
		context.fillStyle = "rgb(255, 255, 255)"
		context.clearRect(0,0,canvas.width,canvas.height);

		context.shadowColor = "rgb(100,100,100)";
		context.shadowOffsetX = 3;
		context.shadowOffsetY = 3;
		context.shadowBlur = 5;
		context.font = "30pt Verdana";
		context.fillStyle = "rgb(0, 0, 0)"

		var q = leftNum + " + " + rightNum;
		var metrics = context.measureText(q);
		context.fillText(q,200-metrics.width,40);
	}
}

function fadeIncorrectAnswer(){
	var param = new AnimationParam();
	param.color = "rgb(255,0,0)";
	param.timerArray.push(setInterval(function(){
		drawAnswerAnim(param);
	},30));
}



function fadeCorrectAnswer(){
	var param = new AnimationParam();
	param.color = "rgb(0,0,255)";
	param.timerArray.push(setInterval(function(){
		drawAnswerAnim(param);
	},30));
}

function drawAnswerAnim(param){
	var animText = answerText;
	var canvas = document.getElementById('answer');

	console.log(param.opacity);
	console.log(param.color);

	if (canvas.getContext){
		var context = canvas.getContext('2d');
		context.clearRect(0,0,canvas.width,canvas.height);

		context.globalAlpha = param.opacity;
		context.shadowColor = "rgb(100,100,100)";
		context.shadowOffsetX = 3;
		context.shadowOffsetY = 3;
		context.shadowBlur = 5;
		context.font = "30pt Verdana";
		context.fillStyle = param.color;

		var metrics = context.measureText(answerText);
		context.fillText(answerText,200-metrics.width,40);
	}
	param.opacity = param.opacity - 0.1;
	if(param.opacity<0){
		param.opacity = 1.0;
		if (param.timerArray.length > 0) {
			clearInterval(param.timerArray.shift());
		}
		clearAnswer();
		if (canvas.getContext){
			var context = canvas.getContext('2d');
			context.globalAlpha=1.0;
		}
	}
}

