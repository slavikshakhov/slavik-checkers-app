import React, {Component} from 'react';
import {connect} from 'react-redux';
import { SET_PLAYERS } from '../constants';
import './AskUserInfo.css';

const mapDispatchToProps = (dispatch) => {
    return {
        setPlayers: (players, stopAnimation) => dispatch({type: SET_PLAYERS, payload: {players, stopAnimation } })
    }
}

class AskUserInfo extends Component {
    state = {player1: '', player2: '', warning: false}
    onInputChange = (e) => {
        const player = e.target.name;   
        const value = e.target.value;
        // console.log(player, value);
        this.setState({
            [player]: value, warning: false
        });        
    }
    onPlayersInfoSumbit = (e) => {
        e.preventDefault(); 
        const {player1, player2} = this.state;
             
        if(player1.length > 0 && player2.length > 0){
          this.props.setPlayers([this.state.player1, this.state.player2], true);
        }
        else if(player1.length === 0 || player2.length === 0){
            this.setState({warning: true});
        }
    }

    
    render() { 
        let input = ' pv2 ph3 ma2 mb4 w-100 green b ttu tracked';    
        let label = ' ttu tracked light-gray';        
        let warningTachyons = ' ttu bg-pink red f6 shadow-4 w-100 br1 pv2';  
        let visibility = this.state.warning ? ' o-100' : ' o-0';
       
        return (
            <div className='tc'>
                <form onSubmit={this.onPlayersInfoSumbit}>
                    <div className={label}>who plays with light figures?</div>
                    <input className={input} type='text' name='player1' value={this.state.value} onChange={this.onInputChange}  />
                    <div className={label}>who plays with dark figures?</div> 
                    <input className={input} type='text' name='player2' value={this.state.value} onChange={this.onInputChange} />
                    <p className={`warning ${warningTachyons} ${visibility}`}>Please fill in bouth fields</p>
                    <button className="p3 pv2 ph5 grow pointer bg-blue mt5 ttu">submit</button>
                </form>
                
            </div>
          );
    }
}
 
export default connect(null, mapDispatchToProps)(AskUserInfo);
