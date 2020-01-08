// import all component from types as an object: actionTypes
import * as actionTypes from './types'; 

//action 1
export const setUser = user => {
    return{
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}