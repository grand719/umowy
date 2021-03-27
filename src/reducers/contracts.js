const contractReducerDefaultState = [];

export default (state = contractReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_CONTRACT':
            return [
                ...state,
                action.contract
            ];
        case 'ADD_INVOICE':
            return state.map((contract)=> {
                if(contract._id === action.contractId) {
                    contract.invoices = contract.invoices.concat(action.invoice)
                    return {
                        ...contract
                    }
                }else {
                    return contract
                }
            });
        case 'EDIT_CONTRACT':
            return state.map((contract)=> {
                if(contract._id === action.contractId) {
                    return {
                        ...contract,
                        ...action.updates
                    }
                }else {
                    return contract
                }
            });
        case 'EDIT_INVOICE':
            return state.map((contract)=> {
                if(contract._id === action.contractId) {
                  const index = contract.invoices.findIndex(invoice => invoice._id === action.invoiceId)
                    contract.invoices[index] ={
                        ...contract.invoices[index],
                        ...action.updates
                    }
                    return contract
                }else {
                    return contract
                }
            })
        case 'SET_CONTRACTS':
            return action.contracts
        default:
            return state
    }
}