import {createStore, combineReducers} from 'redux';
import {v4 as uuid} from 'uuid';



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

const addInvoice = (
    contractId, 
    {title= '', value= 0, createdBy= '', modifiedBy= ''}={}) => ({
        type: 'ADD_INVOICE',
        contractId,
        invoice: {
            _id: uuid(),
            title,
            value,
            createdBy,
            modifiedBy
        }

    })

const editContract = (contractId, updates) => ({
    type: 'EDIT_CONTRACT',
    contractId,
    updates
})

const editInvoice = (contractId, invoiceId, updates) => ({
    type: 'EDIT_INVOICE',
    contractId,
    invoiceId,
    updates
})



const addUser = (user) => ({
    type: 'ADD_USER',
    user
})

const userReducerDefaultState = {_id: '', name: '', token: ''}

const userReducer = (state = userReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_USER':
            return {
                ...action.user
            }

        default: 
        return state
    }
}

const addText = (text) => ({
    type: 'ADD_TEXT_FILTER',
    text
})

const filterReducerDefaultState = {text: ''}

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_TEXT_FILTER':
            return {
                ...action.text
            }

        default:
            return state
    }
}

const getVisibleContracts = (contracts, text) => {
    return contracts.filter((contract)=> {
        const textMatch = contract.title.toLowerCase().includes(text.toLowerCase());

        return textMatch;
    })
}

const store = createStore(
    combineReducers({
    user: userReducer,
    contract: contractReducer,
    filter: filterReducer
    })
)
store.subscribe(()=>{
    const state = store.getState()
    const visibleContracts = getVisibleContracts(state.contract, state.filter.text)
    console.log(visibleContracts)
})


store.dispatch(addContract({
    _id: '1',
    title: 'test',
    contract_number: '1243124',
    year: '2021',
    budget: 200,
    invoices: [{_id: '1', title: 'test', value: 15, createdBy: 'ja', modifiedBy: 'ja'}]
}))

store.dispatch(addContract({
    _id: '2',
    title: 'test',
    contract_number: '1243124',
    year: '2021',
    budget: 200,
    invoices: [{_id: '1', title: 'test', value: 15, createdBy: 'ja', modifiedBy: 'ja'}]
}))

store.dispatch(addContract({
    _id: '3',
    title: 'test',
    contract_number: '1243124',
    year: '2021',
    budget: 200,
    invoices: [{_id: '1', title: 'test', value: 15, createdBy: 'ja', modifiedBy: 'ja'}]
}))



store.dispatch(addInvoice('2',{ title: 'test2', value: 12, createdBy: 'ja', modifiedBy: 'ja'}))
store.dispatch(editContract('1',{title: 'zmienione', budget: 5}))
store.dispatch(editInvoice('1', '1', {title: 'zmienione', value: 5}))

store.dispatch(addUser({_id: '1', name: 'test', token:'abcd'}))
store.dispatch(addText({text:'test'}))