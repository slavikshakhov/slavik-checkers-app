import React, { Component } from 'react';
import {connect} from 'react-redux';
import './Results.css';

const mapStateToProps = (state) => {
    console.log(state);
    return {
        state: state
    }
}

class Results extends Component {    
    render() {   
        const whoPlays = ' f4 fw9 tracked-mega ttu whoPlays';        
        const columnHead = 'header flex c ba b--black justify-center items-center pv3';
        const columnCell = 'flex c ba b--black justify-center items-center pv3 f5 fw5 avenir';   
        const relocation = 'b f5'
        let playerStyle = 'ttc f4 fw7 '     

        const boardColumns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

        let cols;
        const {read, players, count} = this.props.state;   
        console.log(read);
        console.log(players);
        if(read.length > 0){
            cols = read.map((col, i) => {                
                const from = col.relocatedFrom;                
                const to = col.relocatedTo;
                const captured = col.capturedAt ? col.capturedAt : '';   
                let player = col.player === 1 ? players[0] : players[1];  

                if(col.player === 1){
                    playerStyle += ' player1';
                }
                else {
                    playerStyle += ' player2';
                }
                
                return  (
                   
                    <div key={i} className='flex flex-row flex-wrap w-100'>
                        <div className={`${columnCell} ${playerStyle}`}>{player}</div>
                        <div className={columnCell}>{col.relocType}d &nbsp; &nbsp;                               
                                <span className={relocation}>{from.r}{boardColumns[from.c]}</span> &nbsp; to &nbsp;<span className={relocation}>{to.r}{boardColumns[to.c]}</span></div>
                        <div className={columnCell}>
                                <span className={relocation}>{captured.r}{boardColumns[captured.c]} </span></div>                                    
                    </div>
                    
                    
                )
            
            })                        
        }     
        return (
            
            <div className='table w-80 tc'>

                {players && <p className={whoPlays}>{players[0]} playing with {players[1]}</p>}                
                
                {players && <p className='ttu green f4 b'>
                                <span className=''>figures left:</span>  
                                {'  '}
                                <span className='player1'>{players[0]}</span>{'  '} {count[0]}
                                {'   '}
                                <span className='player2'>{players[1]}</span>{'  '} {count[1]}
                            </p>} 

                    <div className='flex flex-row w-100 bg-blue fw6 ttu'>
                        <div className={columnHead}>player</div>
                        <div className={columnHead}>moves</div>
                        <div className={columnHead}>captured at</div>                       
                    </div>
                     <div className="cols-wrapper">
                        {cols}  
                     </div>
                                                
                </div>
            
            
              );
    }
}
 
export default connect(mapStateToProps)(Results);