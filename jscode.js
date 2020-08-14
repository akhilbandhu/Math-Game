//Logic of the Game!
//when we click on start/reset button
  //if playing
    //reset button is displayed
  //if not playing
    //setscore to 0
    //start game button is displayed
    //show countdown timer
    //reduce time by 1 second
    //check if any time is left
      //if left, continue
      //else game over message displayed
    //also change button to reset button
    //generate new questions and multiple answers

//when we click answer box
    //if playing
      //is answer correct?
        //yes?
          //increase score by 1
          //generate new question with multiple answers
          //show correct box for a second
        //no?
          //show incorrect box
          //generate new question with multiple answers

var playing = false;
var score;
var action;
var timeRemaining;
var correctAnswer;

document.getElementById('startreset').onclick=function(){
  if(playing==true){
    location.reload();    //reloads the page
  }
  else{
    playing = true;
    score=0;
    document.getElementById('score-value').innerHTML=score;
    show('time');
    timeRemaining=60;
    document.getElementById('time_remaining_value').innerHTML=timeRemaining;
    hide('gameover');
    document.getElementById('startreset').innerHTML="Reset Game";

    startCountdown();
    generateQA();

  }
}

for(j=1; j<5; j++){
  document.getElementById("box"+j).onclick = function(){
        if(playing==true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById('score-value').innerHTML=score;
                show('correct');
                hide('tryagain');
                setTimeout(function(){hide('correct');}, 1000);
                generateQA();
            }
            else{
                show('tryagain');
                hide('correct');
                setTimeout(function(){hide(tryagain);}, 1000);
            }
        }
    }
}


//functions
function startCountdown(){
    action = setInterval(function(){
      timeRemaining-=1;
      document.getElementById('time_remaining_value').innerHTML=timeRemaining;
      if(timeRemaining==0){
        stopCountdown();
        document.getElementById('gameover').innerHTML="<p>Game Over!!</p><p>Your Score: "+ score +"</p>";
        show('gameover');
        hide('time');
        hide('correct');
        hide('tryagain');
        playing=false;
      }
    }, 1000);
}
function stopCountdown(){
  clearInterval(action);
}
function hide(Id){
  document.getElementById(Id).style.display="none";
}
function show(Id){
  document.getElementById(Id).style.display="block";
}
function generateQA(){      //generates questions and answers
      var x = Math.round(9*Math.random())+1;
      var y = Math.round(9*Math.random())+1;
      correctAnswer = x*y;
      var correctPosition = Math.round(3*Math.random())+1;
      document.getElementById('questionbox').innerHTML=x+"x"+y;
      document.getElementById("box"+correctPosition).innerHTML= correctAnswer;
      var answers = [correctAnswer];  //has all the answers added to it
      for(i=1; i<5; i++){             //for incorrect value placements.
        if(i != correctPosition){
          var wrongAnswer;
            do{
            wrongAnswer = (Math.round(9*Math.random())+1)*(Math.round(9*Math.random())+1);
          }while(answers.indexOf(wrongAnswer)>-1);

          document.getElementById("box"+i).innerHTML=wrongAnswer;
          answers.push(wrongAnswer);
        }
    }
}
