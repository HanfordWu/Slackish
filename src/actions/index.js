// import all component from types as an object: actionTypes
import * as actionTypes from './types'; 

//user action 1
export const setUser = user => {
    return{
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

//user action 2
export const clearUser = () => {
    return{
        type: actionTypes.CLEAR_USER,
        payload: {
            currentUser: actionTypes.CLEAR_USER
        }
    }
}

// channel action 1
export const setCurrentChannel = channel => {
    return {
        type: actionTypes.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    }
}

export const setPrivateChannel = isPrivateChannel => {
    return {
        type: actionTypes.SET_PRIVATE_CHANNEL,
        payload: {
            isPrivateChannel
        }
    }
}