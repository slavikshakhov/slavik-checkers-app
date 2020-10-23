class Board {
    constructor(numRowsCols){
        this.board = this.fillPieces(this.makeBoard(numRowsCols))
    }
    makeBoard(numRowsCols){
        let board = [];
        for(let r=0; r < numRowsCols; r++){
            board.push(Array(numRowsCols).fill(null));
            }
        console.log(`in makeBoard empty board is ${JSON.stringify(board)}`);
        return board;
    }
        
    
    fillPieces(emptyBoard){
        let count = 0;       
        let square = {isKing: false, continueToJump: false};
        
        for(let r=0; r < emptyBoard.length; r++){
            for(let c=0; c < 8; c+=2){
               
                if(r <= 2){
                    if(r%2 === 0){
                        emptyBoard[r][c] = Object.assign({}, square, {player: 1, count });
                        
                    } else {
                        emptyBoard[r][c+1] = Object.assign({}, square, {player: 1, count});
                    }
                    count++;
                } else if(r >= 5){
                    if(r%2 === 0){
                        emptyBoard[r][c] = Object.assign({}, square, {player: 2, count});
                    } else {
                        emptyBoard[r][c+1] = Object.assign({}, square, {player: 2, count});
                    }
                    count++;
                } 
            }
        }
       
        
        return emptyBoard;
    }
}

export default Board;