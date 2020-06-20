
import {AUTHENTICATE, LOGOUT} from '../actions/admin'

initialState = {
    token : null,
    userId : null
}

const adminReducer = (state = initialState, action) => {
    switch(action.type){
        case AUTHENTICATE :
            return{
                token : action.token,
                userId : action.userId
            }
        case LOGOUT : 
            return initialState
    }
    return state
}

export default adminReducer