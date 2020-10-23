
import Board from './board';
import { SET_MUST_JUMP, PIECE_COULD_RELOCATE, SET_START, SET_BOARD, CHANGE_PLAYER, READ, SET_PLAYERS } from './constants';
const numRowsCols = 8;
const board = new Board(numRowsCols);
const initialState = {  board,
                        start: false,
                        mustJump: false,
                        selSquare: null,   
                        players: null,               
                        activePlayer: 1, 
                        count: [12, 12],                     
                        read: [],
                        stopAnimation: false        
                    }    

export const  boardReducer = (state = initialState, action = {}) => {
    switch(action.type){
        case SET_MUST_JUMP: 
            return Object.assign({}, state, {mustJump: action.payload});
        case PIECE_COULD_RELOCATE:
            return Object.assign({}, state, {selSquare: {relocationType: action.payload.relocationType, targets: action.payload.targets, selRow: action.payload.fromRow,
                            selCol: action.payload.fromCol, player: action.payload.player} });
        case SET_START:
                return Object.assign({}, state, {start: action.payload});
        case SET_BOARD:
                return Object.assign({}, state, {board: action.payload});
        case CHANGE_PLAYER:
                return Object.assign({}, state, {activePlayer: action.payload});
        case SET_PLAYERS:
            console.log(action.payload);
                return {...state, players: action.payload.players, stopAnimation: action.payload.stopAnimation};
        case READ: 
                let opponentPlayer = action.payload.player === 1 ? 2 : 1;                    
                
                let count = state.count;
                if(action.payload.relocType === 'jump'){
                    if(opponentPlayer === 1){
                        count[0] -= 1;
                    } else {
                        count[1] -= 1;  
                    }  
                }                               
                return {...state, count, read: [...state.read, {
                    relocType: action.payload.relocType,
                    player: action.payload.player,
                    relocatedFrom: action.payload.relocatedFrom,
                    relocatedTo: action.payload.relocatedTo,
                    capturedAt: action.payload.capturedAt
                    },
                ],                
            }
                    
        default: return state;
    }
}
