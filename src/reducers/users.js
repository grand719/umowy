const usersDefaultState = []

const usersReducer = (state = usersDefaultState, action) => {
    switch(action.type){
        case 'CLEAR_USERS':
            return []
        case 'SET_USERS':
            return action.users
        default:
         return state   
    }
}

export default usersReducer