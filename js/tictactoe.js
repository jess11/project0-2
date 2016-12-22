// $(document).ready(function(){

//making the table- THIS MUST COME FIRST- put in prompt

var tableSize = 0;


var player = 0;
var moves = 0;
var inputX =[];
var inputY = [];
var scoreX = 0;
var scoreY = 0;

//Find if there is a win

winnings = function (input){
  //Horizontal wins
  for (var i = 0 ; i <tableSize ; i++ ){
    var count=0;
    for (var j = 0 ; j <input.length ; j++ ){
      if(parseInt(input[j].slice(1,2)) === i ){
        count +=1;
      }
      if (count === tableSize){
        return true
      }
    }
    count=0;
  }

  //Vertical wins
  for (var i = 0 ; i <tableSize ; i++ ){
    var count=0;
    for (var j = 0 ; j <input.length ; j++ ){
      if(parseInt(input[j].slice(2)) === i ){
        count +=1;
      }
      if (count === tableSize){
        return true
      }
    }
    count=0;
  }

  //Diagonal wins
  var diagonal1 = [];
  var diagonal2 =[];
  for (var i = 0; i<tableSize; i++ ){
    var y = "c" + i.toString() + i.toString();
    diagonal1.push(y);
    var x = "c" + (tableSize-1-i).toString() + i.toString();
    diagonal2.push(x);
  }

  var count1 = 0;
  for(var i =0; i < tableSize ; i++){
    if($.inArray(diagonal1[i], input) > -1){
      count1 +=1;
      if(count1 === tableSize){
        return true;
      }
    }
  }

  var count2 = 0;
  for(var i =0; i < tableSize ; i++){
    if($.inArray(diagonal2[i], input) > -1){
      count2 +=1;
      if(count2 === tableSize){
        return true;
      }
    }
  }
}

//blocking any further clicking
var blockClicking = function (){
  for (var i = 0; i<$('td').length; i++){
    $($('td')[i]).addClass('clicked');
  }
}

//reset board (via button)
var reset = function (){
  for (var i = 0; i<$('td').length; i++){
    $($('td')[i]).removeClass();
    $($('td')[i]).html('');
  }
  player = 0;
  moves = 0;
  inputX =[];
  inputY = [];
  $('#winner').html('')

}

//prints score to the screen
var score = function(){
  $('#scoreX').html('Monkey: ' + scoreX );
  $('#scoreY').html('Unicorn: ' + scoreY );
}

//reset scores (via button)
var resetScore = function(){
  scoreX = 0;
  scoreY = 0;
  $('#winner').html('');
  score();
}


//////////START OF TICTACTOE ////////////////////////////

var tictactoe = function(){
  //putting a marker into the gridSize, appointing which player's turn and adding a class to prevent clicking on the box more than once.
  if($(this).hasClass('clicked')){
    return false
  }

  moves +=1

  if(player === 0){
    $(this).html('<img src="images/banana.png" id="banana">');
    player +=1;
    inputX.push($(this).attr('id'));
  } else {
    $(this).html('<img src="images/unicorn.jpeg" id="unicorn">');
    player -=1;
    inputY.push($(this).attr('id'));
  }

  $(this).addClass('clicked');

  if (winnings(inputX) || winnings(inputY)) {
    blockClicking();
    if ((player-1) === 0){
      scoreX += 1;
      $('#winner').html('Monkey wins!');
    } else {
      scoreY += 1;
      $('#winner').html('Unicorn wins!');
    }
      score();
  };

  //if there is a tie
  if(moves === 9  && !winnings(inputX) && !winnings(inputY)){
  $('#winner').html('Noone wins')
  }

}

//////////END OF TICTACTOE ////////////////////////////
// });

var gridSize = function(num){
  if (num < 3 || num > 20){
    return false;
  }
  var html='';

  for( var i = 0; i<num ; i++ ){
      html += "<tr>"
    for (var j = 0; j<num ; j++ ){
      html += "<td id='c" + i.toString() + j.toString() + "'></td>";
    }
    html+="</tr>"
  }
  $('table').html(html);

  reset();
  resetScore();
  $('td').on('click', tictactoe);

}

var whatSize= function (){
  tableSize= parseInt($('input').val());
  gridSize(tableSize);
}

/////////////////////

$('#enterSize').on('click', whatSize);
$('.reset').on('click',reset);
$('.resetScore').on('click',resetScore);
