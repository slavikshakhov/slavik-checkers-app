import React from 'react';

import {Component} from 'react';
import {connect} from 'react-redux';

import {canAnyPieceJump, canThisPieceJump, canThisPieceMove, canAnyKingJump, canThisKingJump, canThisKingMove} from './helpers';
import {SET_MUST_JUMP, PIECE_COULD_RELOCATE, SET_START, SET_BOARD, CHANGE_PLAYER, READ} from './constants';
import Game from './components/Game';
import Results from './components/Results';
import AskUserInfo from './components/AskUserInfo';
import UserInfo from './components/UserInfo';
import './App.css';



const mapStateToProps = (state) => ({state: state});
const mapDispatchToProps = (dispatch) => {
  return {    
    setMustJump: (bool) => dispatch({type: SET_MUST_JUMP, payload: bool}),
    pieceOrKingCouldRelocate: (relocationType, targets, fromRow, fromCol, player) => dispatch({type: PIECE_COULD_RELOCATE, payload: {relocationType, targets, fromRow, fromCol, player}}),
    setStart: (bool) => dispatch({type: SET_START, payload: bool}),
    setBoard: (board) => dispatch({type: SET_BOARD, payload: board}),
    changePlayer: (player) => dispatch({type: CHANGE_PLAYER, payload: player}),
    read: (relocType, player, relocatedFrom, relocatedTo, capturedAt) => {      
      dispatch({type: READ, payload: {relocType, player, relocatedFrom, relocatedTo, capturedAt}})
    }
  }
} 

class App extends Component {   
  
  squareClick = (clickedRow, clickedCol, clickedSquare) => {
    console.log(clickedRow, clickedCol, clickedSquare);
    
    let {board: {board}, start, activePlayer, mustJump, selSquare} = this.props.state; 

    const {setMustJump} = this.props;
    
    
      if(canAnyPieceJump(this.props.state) || canAnyKingJump(this.props.state)){
        setMustJump(true);
        mustJump = true;
      }
      else {
        setMustJump(false);
        mustJump = false;
      }
    
    console.log(`after load, after setting to true,  before click mustJump is ${mustJump}`);   
    console.log(!!canAnyPieceJump(this.props.state));
    console.log(canAnyKingJump(this.props.state));
    console.log(`after click mustJump is ${mustJump}`)
    console.log(`start after click is ${start}`);


    if(!start){
      if(clickedSquare){
        if(clickedSquare.player === activePlayer && !clickedSquare.isKing){          
            console.log('is piece');              
            if(mustJump){              
              if(!!canThisPieceJump(clickedRow, clickedCol, this.props.state)){
                console.log(`this piece must jump`);
                const thisPieceJump = canThisPieceJump(clickedRow, clickedCol, this.props.state);
                this.props.pieceOrKingCouldRelocate('jump', thisPieceJump, clickedRow, clickedCol, activePlayer);
                this.props.setStart(true);
              }
            } 
            else if(!mustJump){
              if(!!canThisPieceMove(clickedRow, clickedCol, this.props.state) && !mustJump){
                const thisPieceMove = canThisPieceMove(clickedRow, clickedCol, this.props.state)
                this.props.pieceOrKingCouldRelocate('move', thisPieceMove, clickedRow, clickedCol, activePlayer);
                this.props.setStart(true);
                console.log(`this piece cannot jump but can move`);
              }
            } 
          }
        else if(clickedSquare.player === activePlayer && clickedSquare.isKing){
            if(mustJump){
              console.log('is king');
              const thisKingJump = canThisKingJump(clickedRow, clickedCol, this.props.state);
              if(!!thisKingJump){
                console.log('this king must jump');
                this.props.pieceOrKingCouldRelocate('jump', thisKingJump, clickedRow, clickedCol, activePlayer);
                this.props.setStart(true); 
                }                           
              }            
            else if(!mustJump) {              
              if(canThisKingMove(clickedRow, clickedCol, this.props.state)){
                console.log(`this king cannot jump but can move`);
                console.log(`king selected at ${clickedRow} ${clickedCol}`);
                this.props.pieceOrKingCouldRelocate('move', null, clickedRow, clickedCol, activePlayer);
                this.props.setStart(true); 
              }
            }
          }
        }
      }   
    
    else if(start) {
      const {selRow, selCol, relocationType} = selSquare;
      if(!clickedSquare){                         
              if(selSquare.player === activePlayer){                                                   
                  const {targets} = selSquare;      
                  if(targets){ 
                    
                  for(let oneJump of targets){ 
                    console.log(oneJump);                
                    console.log(clickedRow === oneJump.rowTarget)
                    if(clickedRow === oneJump.rowTarget && clickedCol === oneJump.colTarget){       
                      console.log(relocationType);             
                      if(relocationType === 'jump'){                          
                        this.pieceOrKingJump(selSquare, clickedRow, clickedCol, board);
                      }
                      else if(relocationType === 'move'){
                        console.log('piece can move now');                      
                          this.pieceMove(selSquare, clickedRow, clickedCol, board);                     
                      }                      
                    }                  
                   } 
                  }
                  else if(!targets){
                    if(board[selRow][selCol].isKing){
                      if(relocationType === 'move'){
                        console.log(`king will move from ${selSquare.selRow} - ${selSquare.selCol} to ${clickedRow} - ${clickedCol}`);
                        this.kingMove(selSquare, clickedRow, clickedCol, board);  
                      }
                    }      
                  }
     
                
              }
            }         
        }   
  }
  pieceOrKingJump = (selSquare, clickedRow, clickedCol, board) => {
    let {selRow, selCol, player} = selSquare;
    let {activePlayer} = this.props.state;
    if(activePlayer !== player){
      return;
    }
    const opponentRowLocation = clickedRow - selRow > 0 ? 1 : -1;
    const opponentColLocation = clickedCol - selCol > 0 ? 1 : -1;
   

    board[clickedRow][clickedCol] = board[selRow][selCol];
    if(!board[clickedRow][clickedCol].isKing){
      if(activePlayer === 1 && clickedRow === 7) {
        board[clickedRow][clickedCol].isKing = true;
         console.log(`player: ${activePlayer}, clickedRow: ${clickedRow}, clickedCol: ${clickedCol}, wasKing: ${board[clickedRow][clickedCol].isKing}`)
      }
      if(activePlayer === 2 && clickedRow === 0) {
        board[clickedRow][clickedCol].isKing = true;
        console.log(`player: ${activePlayer}, clickedRow: ${clickedRow}, clickedCol: ${clickedCol}, wasKing: ${board[clickedRow][clickedCol].isKing}`)
      }     
    }    
    board[selRow][selCol] = null;
    board[clickedRow - opponentRowLocation][clickedCol - opponentColLocation] = null;

    console.log(board);   
    
    
   
    console.log(activePlayer);
    const jumpedFigure = board[clickedRow][clickedCol];

    activePlayer = activePlayer === 1 ? 2 : 1;

    let bool = false;  
    if(!jumpedFigure.isKing){
      const thisPieceJump = canThisPieceJump(clickedRow, clickedCol, this.props.state);
      if(!!thisPieceJump){
        activePlayer = activePlayer === 1 ? 2 : 1;
        this.props.pieceOrKingCouldRelocate('jump', thisPieceJump, clickedRow, clickedCol, activePlayer);
        bool = true;        
        console.log(activePlayer);
      }
    }
    else if(jumpedFigure.isKing){
      const thisKingJump = canThisKingJump(clickedRow, clickedCol, this.props.state);
      if(!!thisKingJump){
        activePlayer = activePlayer === 1 ? 2 : 1;
        this.props.pieceOrKingCouldRelocate('jump', thisKingJump, clickedRow, clickedCol, activePlayer);
        bool = true;        
      }
     
    } 
    console.log(activePlayer);
    console.log(player);
    

    this.props.setBoard({board});
    this.props.setStart(bool);
    this.props.setMustJump(bool);    
    this.props.changePlayer(activePlayer);

    const relocatedFrom = {r: selRow, c: selCol};
    const relocatedTo = {r: clickedRow, c: clickedCol};
    const capturedAt = {r: clickedRow - opponentRowLocation, c: clickedCol - opponentColLocation};

    this.props.read('jump', player, relocatedFrom, relocatedTo, capturedAt);

  }


  pieceMove = (selSquare, clickedRow, clickedCol, board) => {
    let {selRow, selCol, player} = selSquare;
    let {activePlayer} = this.props.state;
    if(activePlayer !== player){
      return;
    }
    
    board[clickedRow][clickedCol] = board[selRow][selCol];
    if(!board[clickedRow][clickedCol].isKing){
      let isKing = activePlayer === 1 && clickedRow === 7 ? true : false;
      board[clickedRow][clickedCol].isKing = isKing;
    }    
    board[selRow][selCol] = null;
   
    console.log(board);
    
    activePlayer = activePlayer === 1 ? 2 : 1;
    

    this.props.setBoard({board});
    this.props.setStart(false);
    this.props.changePlayer(activePlayer);   

    const relocatedFrom = {r: selRow, c: selCol};
    const relocatedTo = {r: clickedRow, c: clickedCol};
    

    this.props.read('move', player, relocatedFrom, relocatedTo, null);
  }

  kingMove = (selSquare, clickedRow, clickedCol, board) => {
    let {selRow, selCol, player} = selSquare;
    let {activePlayer} = this.props.state;
    if(activePlayer !== player){
      return;
    }
    console.log('king moving');
    let rowFactor = clickedRow - selRow > 0 ? 1 : -1;
    let colFactor = clickedCol - selCol > 0 ? 1 : -1;
    let noKingMoveObstruction = false;
    for(let r = selRow + rowFactor, c = selCol + colFactor; r !== clickedRow && c !== clickedCol; r += rowFactor, c += colFactor){
      if(board[r][c]){
        return;
      } 
      else if(!board[r][c]){
        console.log(`empty squares: ${r}-${c}`);     
        console.log(`selRow: ${selRow}, selCol: ${selCol}, clickedRow: ${clickedRow}, clickedCol: ${clickedCol}`);  
        console.log(`iterRow ${r} clickedRow ${clickedRow}`);    
        noKingMoveObstruction = true; 
       }
      }      
      if(noKingMoveObstruction){
            
            board[clickedRow][clickedCol] = board[selRow][selCol];
            board[selRow][selCol] = null; 
            
            console.log(`player moving: ${player} activePlayer: ${activePlayer}`)
            activePlayer = activePlayer === 1 ? 2 : 1;
            console.log(`player moving: ${player} activePlayer: ${activePlayer}`)
        

            this.props.setBoard({board});
            this.props.setStart(false);
            this.props.changePlayer(activePlayer);   
        
            const relocatedFrom = {r: selRow, c: selCol};
            const relocatedTo = {r: clickedRow, c: clickedCol};            
            
            this.props.read('move', player, relocatedFrom, relocatedTo, null);
      }  
  }
  
  render(){    
    const {board: {board}, start, activePlayer, selSquare, stopAnimation} = this.props.state;    
    const gameContainer = !stopAnimation ? ' gameContainer' : '';

    if(selSquare){
      var {selRow, selCol, targets} = selSquare;
    }  
 
    console.log(`in render after first load after click on piece that can jump, pieceJumpTargets is ${JSON.stringify(targets)}`);
    console.log(`in render after selecting piece, start is ${start}`);
    return(
      <div className='container'>
        <div className={`${gameContainer} pa5 flex justify-around `}>           
            <Game board={board} squareClick={this.squareClick} start={start}
                  selRow={selRow} selCol={selCol} activePlayer={activePlayer} /> 
            <div className="w-40">                
                <Results />
            </div>           
        </div>
        
        { !stopAnimation && (
                              <UserInfo >
                                <AskUserInfo />
                              </UserInfo>
                        )
                  }      
      </div>
      
    )
  }

  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);