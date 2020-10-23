import React from 'react';
import Row from './Row';
import './Game.css';

const Game = ({board, squareClick,  start, selRow, selCol, activePlayer}) => {
        const rows = board.map((row, i) => {
            return <Row key={i} row={row} rowNum={i} squareClick={squareClick} start={start}
                     selRow={selRow} selCol={selCol} activePlayer={activePlayer} />
        });
        return (
            <div>                
                <div className="board">{ rows }</div>     
            </div>
        )
    }

export default Game;