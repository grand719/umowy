const filterReducerDefaultState = {text: ''}

export default  (state = filterReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_TEXT_FILTER':
            return {
                ...action.text
            }

        default:
            return state
    }
}