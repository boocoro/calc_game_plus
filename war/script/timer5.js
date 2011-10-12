var tid = null;
var sec = 0;
start();

function resetWatch(){
  sec = 0;
}

function start(){
  tid = setInterval(updateTimer, 10);
}

function updateTimer(){
	var canvas = document.getElementById('timer');
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

		var text = fillZero(sec/100,2);
		var metrics = context.measureText(text);
		context.fillText(text,200-metrics.width,40);
	}
	sec++;
}

function stop(){
  clearInterval(tid);
}

/* 小数点以下の指定した桁数までゼロ埋め
 * inNum ゼロ埋め対象の数
 * digit 小数点以下何桁までゼロ埋めするか
 * return ゼロ埋めした結果の文字列
 */
function fillZero(inNum,digit){
  if (isNaN(inNum) || isNaN(digit) || digit<0){
    return false;
  }
  digit = Math.floor(digit);
  var workstr = String(inNum);  // ワーク文字列
  var dpPlc = workstr.indexOf(".");  // 小数点の位置
  var zeroCnt = 0;  // 付加するゼロの個数
  if(dpPlc < 0){
    workstr += ".";
    zeroCnt = digit;
  }else{
    var digCnt = (workstr.length - 1) - dpPlc;  // 小数点以下の桁数
    if(digCnt < digit){
      zeroCnt = digit - digCnt;
    }
  }
  var zeroStr = new Array(zeroCnt+1).join("0");  // 埋める分の数だけゼロを連結した文字列
  workstr += zeroStr;
  return workstr;
}