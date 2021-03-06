let body = document.querySelector('body')
let article = document.querySelector('article')
let getPlayerNames = document.getElementById('getPlayerNames')
let getBoardSize = document.getElementById('getBoardSize')
let gameBoard = document.getElementById('gameBoard')
let activePlayer = document.getElementById('activePlayer')
let playerA = { name: 'Spelare A', starts: true, marker: 'x'}
let playerB = { name: 'Spelare B', starts: false , marker: 'o'}
let size
let board = []
let counter = 0
getPlayerInfo()
getGameSize()
function createBoard() {
  for(let i = 0; i < size; i++){
    board[i] = [] 
    for(let j = 0; j < size; j++){
      board[i][j] = document.createElement('button') 
      board[i][j].id = 'id'+i+'-'+j
      board[i][j].textContent = 'z'
      gameBoard.appendChild(board[i][j])
      if( (j+1) % size === 0 ){
        gameBoard.appendChild(document.createElement('br'))
      }
      if(playerA.starts === true){ document.getElementById('whosPlaying').textContent = 
      `${playerA.marker} - ${playerA.name} börjar att spela`}
      else{document.getElementById('whosPlaying').textContent = 
        `${playerB.marker} - ${playerB.name} börjar att spela`}
      document.getElementById('turn').textContent = 'Totalt antal drag: ' + counter
      board[i][j].addEventListener('click',function(){
        if(counter%2 === 0){
          if(playerA.starts === true){
            document.getElementById('whosPlaying').textContent = 
            `${playerB.marker} - Det är ${playerB.name}s tur att spela`
            document.getElementById('id'+i+'-'+j).innerHTML = `${playerA.marker}`
            document.getElementById('id'+i+'-'+j).classList.add('markerA')
          }
          else{
            document.getElementById('whosPlaying').textContent = 
            `${playerA.marker} - Det är ${playerA.name}s tur att spela`
            document.getElementById('id'+i+'-'+j).innerHTML = `${playerB.marker}`
            document.getElementById('id'+i+'-'+j).classList.add('markerB')
          }
        }
        else{
          if(playerA.starts === true){
            document.getElementById('whosPlaying').textContent = 
            `${playerA.marker} - Det är ${playerA.name}s tur att spela`
            document.getElementById('id'+i+'-'+j).innerHTML = `${playerB.marker}`
            document.getElementById('id'+i+'-'+j).classList.add('markerB')
          }
          else{
            document.getElementById('whosPlaying').textContent = 
            `${playerB.marker} - Det är ${playerB.name}s tur att spela`
            document.getElementById('id'+i+'-'+j).innerHTML = `${playerA.marker}`
            document.getElementById('id'+i+'-'+j).classList.add('markerA')
          }
          
        }
        document.getElementById('id'+i+'-'+j).disabled = true
        counter++
        document.getElementById('turn').textContent = 'Totalt antal drag: ' + counter
        checkRow(size,counter)
        checkCol(size,counter)
        checkDiagonal1(size,counter)
        checkDiagonal2(size,counter)
      })
    }
  }
}

function getGameSize() {
  let boardSize = []
  for(let i = 10; i <= 30; i = i + 5){
    boardSize[i] = document.createElement('button') 
    boardSize[i].id = 'size'+i
    boardSize[i].innerHTML = i
    boardSize[i].classList.add('grid-size')
    getBoardSize.appendChild(boardSize[i])
    boardSize[i].addEventListener('click',function(){
      size = event.currentTarget.innerHTML
      switch(size){
        case '15': document.querySelector('article').classList.add('board15')
        break;
        case '20': document.querySelector('article').classList.add('board20')
        break;
        case '25': document.querySelector('article').classList.add('board25')
        break;
        case '30': document.querySelector('article').classList.add('board30')
        break;        
      }
      createBoard()
      document.getElementById('gameBoard').classList.remove('hide')
      document.getElementById('activePlayer').classList.remove('hide')
      document.getElementById('getBoardSize').classList.add('hide')
    })
  }  
}
function getPlayerInfo() {
  if(random1or0() === 0){ 
    playerA.starts = false
    playerB.starts = true
  }
  if(random1or0() === 0){ 
    playerA.marker = 'o'
    playerB.marker = 'x' 
  }
  document.getElementById('submitButton').addEventListener('click',function(){
    playerA.name = document.getElementsByName('playerA')[0].value
    playerB.name = document.getElementsByName('playerB')[0].value
    document.getElementById('getPlayerNames').classList.add('hide')
    document.getElementById('getBoardSize').classList.remove('hide')
  })
}
function random1or0() {
  let randomNumber
  let condition = true
    while(condition){
      randomNumber = Math.floor(Math.random()*10)
      if(randomNumber === 0 || randomNumber === 1){
        return randomNumber
      }
    } 
}
function checkCond(cond1,cond2,cond3,cond4,cond5) {
  if(document.getElementById(cond1).innerHTML === 'o' &&
  document.getElementById(cond2).innerHTML === 'o' &&
  document.getElementById(cond3).innerHTML === 'o' &&   
  document.getElementById(cond4).innerHTML === 'o' &&
  document.getElementById(cond5).innerHTML === 'o'){
    counter--
    if(playerA.marker === 'o'){
      document.getElementById('congrats').textContent = 
      `Grattis ${playerA.name}, du vann!`
      document.getElementById('congrats').classList.remove('hide')
    }
    else{
      document.getElementById('congrats').textContent = 
      `Grattis ${playerB.name}, du vann!`
      document.getElementById('congrats').classList.remove('hide')
    }
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        document.getElementById('id'+i+'-'+j).disabled = true
      }
    }
    document.getElementById('whosPlaying').classList.add('hide')
    document.getElementById('winner').classList.add('winner')
    document.getElementById('winner').classList.remove('hide')
    addWinStyle(cond1,cond2,cond3,cond4,cond5)
  }
  else if(document.getElementById(cond1).innerHTML === 'x' &&
  document.getElementById(cond2).innerHTML === 'x' &&
  document.getElementById(cond3).innerHTML === 'x' &&   
  document.getElementById(cond4).innerHTML === 'x' &&
  document.getElementById(cond5).innerHTML === 'x'){
    counter--
    if(playerA.marker === 'x'){
      document.getElementById('congrats').textContent = 
      `Grattis ${playerA.name}, du vann!`
      document.getElementById('congrats').classList.remove('hide')
    }
    else{
      document.getElementById('congrats').textContent = 
      `Grattis ${playerB.name}, du vann!`
      document.getElementById('congrats').classList.remove('hide')
    }
    for(let i = 0; i < size; i++){
      for(let j = 0; j < size; j++){
        document.getElementById('id'+i+'-'+j).disabled = true
      }
    }
    document.getElementById('whosPlaying').classList.add('hide')
    document.getElementById('winner').classList.add('winner')
    document.getElementById('winner').classList.remove('hide')
    addWinStyle(cond1,cond2,cond3,cond4,cond5)
  }
}

"x:0y:0"

function checkRow(size) {
  for(let i = 0; i < size; i++){
    for(let j = 0; j < size-4; j++){
      let cond1 = 'id'+i+'-'+j
      let cond2 = 'id'+(i)+'-'+(j+1)
      let cond3 = 'id'+(i)+'-'+(j+2)
      let cond4 = 'id'+(i)+'-'+(j+3)
      let cond5 = 'id'+(i)+'-'+(j+4)
      checkCond(cond1,cond2,cond3,cond4,cond5)
    }
  } 
}
function checkCol(size) {
  for(let i = 0; i < size-4; i++){
    for(let j = 0; j < size; j++){
      let cond1 = 'id'+i+'-'+j
      let cond2 = 'id'+(i+1)+'-'+(j)
      let cond3 = 'id'+(i+2)+'-'+(j)
      let cond4 = 'id'+(i+3)+'-'+(j)
      let cond5 = 'id'+(i+4)+'-'+(j)
      checkCond(cond1,cond2,cond3,cond4,cond5)
    }
  } 
}
function checkDiagonal1(size) {
  for(let i = 0; i < size-4; i++){
      for(let j = 0; j < size-4; j++){
      let cond1 = 'id'+i+'-'+j
      let cond2 = 'id'+(i+1)+'-'+(j+1)
      let cond3 = 'id'+(i+2)+'-'+(j+2)
      let cond4 = 'id'+(i+3)+'-'+(j+3)
      let cond5 = 'id'+(i+4)+'-'+(j+4)
      checkCond(cond1,cond2,cond3,cond4,cond5)
    }
  }
}
function checkDiagonal2(size) {
  for(let i = 4; i < size; i++){
    for(let j = 0; j < size-4; j++){
      let cond1 = 'id'+i+'-'+j
      let cond2 = 'id'+(i-1)+'-'+(j+1)
      let cond3 = 'id'+(i-2)+'-'+(j+2)
      let cond4 = 'id'+(i-3)+'-'+(j+3)
      let cond5 = 'id'+(i-4)+'-'+(j+4)
      checkCond(cond1,cond2,cond3,cond4,cond5)
    }
  }
}
function addWinStyle(cond1,cond2,cond3,cond4,cond5) {
  document.getElementById(cond1).classList.add('win')
  document.getElementById(cond2).classList.add('win')
  document.getElementById(cond3).classList.add('win')
  document.getElementById(cond4).classList.add('win')
  document.getElementById(cond5).classList.add('win')
}