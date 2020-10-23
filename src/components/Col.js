import React from 'react';
import './Col.css';
import Piece from './Piece';

const Col = ({square, rowNum, colNum, squareClick, start, selRow, selCol}) => {     
    let col = 'col dib w3 h3 ';


    let selectedBorder;
    if(selRow === rowNum && selCol === colNum && start){
        selectedBorder = selRow === rowNum && selCol === colNum && start ? "ba bw2 b--dark-red " : " ";
    }
    
    let darkSquare;
    if((rowNum % 2 === 0 && colNum % 2 === 0) || (rowNum % 2 !==0 && colNum % 2 !==0)) {
        darkSquare = 'dark ';
    }    
    
    return (
        <div className={col + ' ' + selectedBorder + ' ' + darkSquare}  onClick={() => squareClick(rowNum, colNum, square)}>
           { square ? <Piece square={square} /> : null }
        </div>
    );
};

export default Col;