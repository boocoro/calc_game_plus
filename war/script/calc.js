var answer= null

var arg1 = 50;
var arg2 = 50;




function putString(arg_sring){
	var current = document.getElementById("span_answer").innerHTML;

	if(current.length>4)return;

	document.getElementById("span_answer").innerHTML = current + arg_sring;
	answer = document.getElementById("span_answer").innerHTML;
}

function clearString(){
	document.getElementById("span_answer").innerHTML = "";
	answer = "";
}

function backSpace(){
	var current = document.getElementById("span_answer").innerHTML;
	current = current.substr(0,current.length-1);
	document.getElementById("span_answer").innerHTML = current;
	answer = current;
}



function generateQuestion(){
	arg1 = (Math.floor(Math.random () * 100) + 1);
	arg2 = (Math.floor(Math.random () * 100) + 1);

	document.getElementById("question").innerHTML = arg1 + " + " + arg2;

}

function check(){
	if((arg1+arg2) == answer){
		clearString();
		generateQuestion();
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
		var string = document.getElementById("span_answer").innerHTML;
		document.getElementById("span_answer").innerHTML = string.substring(0,string.length-1);
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