import {ROOM_CHANGE_REQUEST,ROOM_CHANGE_SUCCESS} from '../constants/roomConstants'

export const roomDetailsReducers = (state={roomName:'globalanon' },action) =>{
    switch(action.type){
        case ROOM_CHANGE_REQUEST:
            return {...state,loading:true}
        case ROOM_CHANGE_SUCCESS:
            return {loading:false, roomName:action.payload}
        default:
            return state
        }
    }