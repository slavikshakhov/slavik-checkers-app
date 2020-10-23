

export const canAnyPieceJump = (state) => {
  let {board: {board}, activePlayer} = state;

  for(let row = 0; row < board.length; row++){
    for(let col = 0; col < 8; col++){
      if(board[row][col]){
        if(board[row][col].player === activePlayer && !board[row][col].isKing){
          if(!!canThisPieceJump(row, col, state)){
            console.log('at least one of the pieces can jump');
            return true;
          }
        }
      }
    }
  }
}



export const canThisPieceJump = (r, c, state) => {
    let pieceJumps = [];
    
    let {activePlayer, board:{board}} = state;

    let oppositeFieldSingle = activePlayer === 2 ? -1 : 1;
    let oppositeFieldDouble = activePlayer === 2 ? -2 : 2;  

    let okRows = false;   
    if((activePlayer === 1 && r <= 5 ) || (activePlayer === 2 && r >= 2)){
      okRows = true;
    }     

    const iteration = (colFactor) => {
      const square = board[r][c];
      if(square){
        if(!square.isKing && okRows){            
          if(!board[r + oppositeFieldDouble][c + colFactor * 2]){          
            if(board[r+oppositeFieldSingle][c + colFactor]){
                if(board[r+oppositeFieldSingle][c + colFactor].player !== activePlayer){     
                    console.log(`${activePlayer}- player can jump from ${r} - ${c} to ${r + oppositeFieldDouble} - ${c + colFactor * 2}`);               
                    return {rowTarget: r + oppositeFieldDouble, colTarget: c + colFactor * 2 };
                }                  
             }
          }           
        }
      }
    }
    if(c <= 5){
      const jumpLeft = iteration(1);
      if(jumpLeft){
        pieceJumps.push(jumpLeft);
      }      
    }
    if(c >= 2){
      const jumpRight = iteration(-1);
      if(jumpRight){
        pieceJumps.push(jumpRight);
      }      
    }  
  return pieceJumps.length > 0 ? pieceJumps : undefined;
}

export const canThisPieceMove = (r, c, state) => {   
  const allPieceMoves = [];
  
  let {board: {board}, activePlayer} = state;
  const square = board[r][c];  
  
  let oppositeField = activePlayer === 2 ? -1 : 1;
  const nextRow = r + oppositeField;  
  
  let maxRowMove = ((activePlayer === 1 && r <= 6) || (activePlayer === 2 && r >= 1)) ? true : false;  

  const moveLeftOrRight = (colFactor) => {
    if(!board[nextRow][c + colFactor]){
      console.log(`can move to ${nextRow} - ${c + colFactor}`);
      return {rowTarget: nextRow, colTarget: c + colFactor}
    }
  }
  console.log(maxRowMove);
  if(square){
    if(square.player === activePlayer && maxRowMove){
      if(c <= 6){
        let leftMove = moveLeftOrRight(1);
        if(leftMove){
          allPieceMoves.push(leftMove);
        }
      }
      if(c >= 1){
        let rightMove = moveLeftOrRight(-1);
        if(rightMove){
          allPieceMoves.push(rightMove);
        }
      }
     }  
  }
  
   return allPieceMoves.length > 0 ? allPieceMoves : undefined
  }
  
  export const canAnyKingJump = (state) => {
    let {board: {board}, activePlayer} = state;

    for(let row = 0; row < board.length; row++){
      for(let col = 0; col < 8; col++){
        if(board[row][col]){
          if(board[row][col].player === activePlayer && board[row][col].isKing){
            if(!!canThisKingJump(row, col, state)){
              console.log('at least one of the pieces can jump');
              return true;
            }
          }
        }
      }
    }
  }

  export const canThisKingJump = (r, c, state) => {     
    const allKingJumps = [];
    let {board: {board}, activePlayer} = state;   

      const iteration = (rowFactor, colFactor) => { 
        
        let rowLimit = rowFactor > 0 ? 7 : 0;
        let colLimit = colFactor > 0 ? 7 : 0;
        
        for(let row = r, col = c; row !== rowLimit && col !== colLimit; row += rowFactor, col += colFactor){          
          if(board[row][col]){
            if(board[row][col].player !== activePlayer){              
              if(board[row + rowFactor][col + colFactor]){ 
                return;                  
              } 
              else if(!board[row + rowFactor][col + colFactor]){
                allKingJumps.push({rowTarget: row + rowFactor, colTarget: col + colFactor });  
              }
            }
          }      
         }          
      }
      
      iteration(1, 1);
      iteration(1, -1);
      iteration(-1, 1);
      iteration(-1, -1);     
    
      return allKingJumps.length > 0 ? allKingJumps : undefined;
    }

    export const canThisKingMove = (r, c, state) => {      
      const {board: {board}} = state;    
  
      let colRight = c === 0 ? -1 : 1;
      let colLeft = c === 7 ? -1 : 1;
  
      let rowBottom = r === 0 ? -1 : 1;
      let rowTop = r === 7 ? -1 : 1;
      
  
      if(c <= 7 && c >= 0 && r <= 7 && r >= 0){
        if(!board[r-rowBottom][c-colRight] || !board[r-rowBottom][c+colLeft] || !board[r+rowTop][c-colRight] || !board[r+rowTop][c+colLeft]){
          return true;
         }    
        }   
      return false;    
    }
     
    