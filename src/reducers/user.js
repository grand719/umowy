const userReducerDefaultState = {_id: '', name: '', token: ''}

export default (state = userReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_USER':
            return {
                ...action.user
            }
        case 'USER_LOGOUT':
            return {}
        default: 
        return state
    }
}