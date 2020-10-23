import React from 'react';
import './Piece.css'; 


export default function Piece({square}) {
    let classes = 'piece ';
    square.player === 1 ? classes += 'white ' : classes += 'black ';
    square.isKing ? classes += 'king ' : classes += '';
    return (
        <div className={classes}>            
        </div>
    )
}