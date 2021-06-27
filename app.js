var audio= new Audio("sound1 (1).mp3");
audio.loop=true;

// Logic
function rest_time(t) {
    var rest = 0;
    if(t>52) {
        rest = (Math.floor(t/52))*17;
    }
    else if(t>30) {
        rest = 10;
    }
    else if(t>15) {
        rest =  3;
    }
    else {
        return "No Rest Needed!! Keep Working!!";
    }
    return "We Recommend You To Take Rest For " + rest.toString() + "Minutes Before You Continue Working."
}

// Animation
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.ml3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i+1)
  })

  document.getElementById("button").addEventListener('click',function(){
    document.getElementById("beforeTimer").style.display = "none";
    document.getElementById("afterTimer").style.display = "block";
  })

  // TIMER
  const timer = document.getElementById('stopwatch');

  var hr = 0;
  var min = 0;
  var sec = 0;
  var stoptime = true;
  
  function startTimer() {
    if (stoptime == true) {
          stoptime = false;
          timerCycle();
      }
    document.getElementById("result").innerHTML ="";
    document.getElementById("worked").innerHTML = "";
    audio.play();
  }
  
  function stopTimer() {
    if (stoptime == false) {
      stoptime = true;
    }
    audio.pause();
    document.getElementById("result").innerHTML = "You Worked For " + (parseInt(hr *60) + parseInt(min)) + " Minutes";
    document.getElementById("worked").innerHTML = rest_time(parseInt(hr *60) + parseInt(min));
    document.getElementById("beforeTimer").style.display = "block";
    document.getElementById("afterTimer").style.display = "none";
  }
  
  function timerCycle() {
      if (stoptime == false) {
      sec = parseInt(sec);
      min = parseInt(min);
      hr = parseInt(hr);
  
      sec = sec + 1;
  
      if (sec == 60) {
        min = min + 1;
        sec = 0;
      }
      if (min == 60) {
        hr = hr + 1;
        min = 0;
        sec = 0;
      }
  
      if (sec < 10 || sec == 0) {
        sec = '0' + sec;
      }
      if (min < 10 || min == 0) {
        min = '0' + min;
      }
      if (hr < 10 || hr == 0) {
        hr = '0' + hr;
      }
  
      timer.innerHTML = hr + ':' + min + ':' + sec;
  
      setTimeout("timerCycle()", 1000);
    }
  }
  
  function resetTimer() {
      timer.innerHTML = '00:00:00';
  }
