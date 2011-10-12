var tid = null;
var sec = 0;
var button = document.getElementById("stop");
var reset = document.getElementById("reset");
reset.addEventListener("click", resetWatch);
resetWatch();
start();

function resetWatch(){
  sec = 0;
  document.getElementById("disp").innerHTML = sec;
}

function start(){
  tid = setInterval(updateTimer, 10);
  button.value = "STOP";
  button.removeEventListener("click", start);
  button.addEventListener("click", stop);
}

function updateTimer(){
  document.getElementById("disp").innerHTML = sec;
  sec++;
}

function stop(){
  clearInterval(tid);
  button.value = "START";
  button.removeEventListener("click", stop);
  button.addEventListener("click", start);
}