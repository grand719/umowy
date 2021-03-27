import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const setContracts = (contracts) => ({
    type:'SET_CONTRACTS',
    contracts
})

const startSetContracts = () => {
    return (dispatch, getState) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDFlYmMyNmQ1NmEzMjQ5NjgzZDM5NGUiLCJpYXQiOjE2MTMyMDU1NDB9.OVwqWJajG3TBE-a3s7MlCwysSUcR5INaGNxJhK_-1C0';

         return axios({
             method: 'get',
             url: 'http://192.168.1.100:3000/contract-api/findContracts/2021',
             headers: {
                 "Authorization": `Bearer ${getState().user.token}`,
                 'Content-Type': 'application/json'
            }
         }).then((response) => {
            // const contracts = JSON.stringify(response.data)

             dispatch(setContracts(response.data))
         }).catch((error)=> {
             console.log(error)
         })
    }
}

const addContract = (
    {   
        _id= '',
        title= '',
        contract_number= '',
        year= '',
        budget= 0,
        invoices= []
    }={})=>({
        type: 'ADD_CONTRACT',
        contract: {
            _id,
            title,
            contract_number,
            year,
            budget,
            invoices
        }
    });


// const startAddContract = () => {
//     return dispatch => {
//         const token
//     }
// }

const startUserLogin = () => {
    return dispatch => {
        return axios({
            method: 'post',
            url: 'http://192.168.1.100:3000/user-api/login',
            headers: {
                'Content-Type': 'application/json', 
            },
            data: {
                "name": "Kopys",
                "password": "fdfsafafasd"
            }
        }).then((res)=> {
            dispatch(userAdd(res.data))
        }).catch((e)=> {
            console.log(e)
        })

    }
}

const userAdd = (user) => ({
    type: "USER_ADD",
    user
})

const userReducerDefaultState = {}

const userReducer = (state = userReducerDefaultState, action)=> {
    switch(action.type) {
        case 'USER_ADD':
            return action.user
        default:
            return state
    }
}

const contractsReducerDefaultState = [];

const contractsReducer = (state = contractsReducerDefaultState, action) => {
    switch(action.type) {
        case 'SET_CONTRACTS':
            return action.contracts
        default:
            return state
    }
}

const store = createStore(combineReducers({
    contracts: contractsReducer,
    auth: userReducer
}), applyMiddleware(thunk))

store.subscribe(()=>{
    const state = store.getState()
    console.log(state)
})
store.dispatch(startUserLogin())

setTimeout(()=> {
    store.dispatch(startSetContracts())
}, 3000)



