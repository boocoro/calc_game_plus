var tid = null;
var sec = 0;
start();

function resetWatch(){
  sec = 0;
  document.getElementById("timer").innerHTML = sec;
}

function start(){
  tid = setInterval(updateTimer, 10);
}

function updateTimer(){
  document.getElementById("timer").innerHTML = sec;
  sec++;
}

function stop(){
  clearInterval(tid);
}