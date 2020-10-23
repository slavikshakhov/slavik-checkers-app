import React from 'react';
import Col from './Col'

const Row = ({row, rowNum, squareClick, start, selRow, selCol}) => {
    return (
        <div>
            {
                row.map((col, i) => {
                    return <Col key={i} square={col} colNum={i} rowNum={rowNum} squareClick={squareClick} start={start}
                                selRow={selRow} selCol={selCol} />
                })
            }          
        </div>
    );
};

export default Row;