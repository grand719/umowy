import {v4 as uuid} from 'uuid';
import axios from 'axios';

export const startAddContract = (contractData = {}) => {
    return (dispatch, getState) => {
        const token = getState().user.token;
        
        const data = JSON.stringify(contractData)

        return axios({
            method: 'post',
            url:`/contract-api/create`,
            headers: {
                "Authorization": `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            data
        }).then((res)=> {
            dispatch(startSetContracts(res.data.year))
        }).catch((error)=> {
            console.log(error)
        })
    }
} 


 export const addContract = (contract)=>({
        type: 'ADD_CONTRACT',
        contract
    });

export const startAddInvoice = (contractId ,invoiceData = {}) => {
    return (dispatch, getState) => {

        const token = getState().user.token

        return axios({
            method: 'post',
            url: `/contract-api/addInvoice/${contractId}`,
            headers: {
                "Authorization": `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(invoiceData)
        }).then((res)=> {
            dispatch(addInvoice(contractId, res.data))
        }).catch((error)=> {
            console.log(error)
        })
    }
}
 
export const addInvoice = (contractId, invoice) => ({
        type: 'ADD_INVOICE',
        contractId,
        invoice

    })

export const startSetContracts = (year) => {
    return (dispatch, getState) => {
      const token = getState().user.token;

      return axios({
        method: 'get',
        url: `/contract-api/findContracts/${year}`,
        headers: {
            "Authorization": `Bearer ${token}`,
            'Content-Type': 'application/json'
       }
    }).then((res) => {

        dispatch(setContracts(res.data))
    }).catch((error)=> {
        console.log(error)
    })
    }
}

export const setContracts = (contracts) => ({
    type: 'SET_CONTRACTS',
    contracts
})

export const editContract = (contractId, updates) => ({
    type: 'EDIT_CONTRACT',
    contractId,
    updates
})

export const clearContract = () => ({
    type: 'CLEAR_CONTRACT'
})

export const startEditContract = (contractID, updates) => {
    return (dispatch, getState) => {
        const token = getState().user.token
        const data = JSON.stringify(updates)
        return axios({
            method: 'patch',
            url: `/contract-api/${contractID}`,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
           },
           data
        }).then(()=> {
            dispatch(editContract(contractID, updates))
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const editInvoice = (contractId, invoiceId, updates) => ({
    type: 'EDIT_INVOICE',
    contractId,
    invoiceId,
    updates
})

export const startEditInvoice = (contractId, invoiceId, updates) => {
    return (dispatch, getState) => {
        const token = getState().user.token
        const data = JSON.stringify(updates)

        return axios({
            method: 'patch',
            url: `/contract-api/invoiceUpdate/${contractId}/${invoiceId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
           },
           data
        }).then((res)=> {
            dispatch(editContract(contractId, res.data))
        }).catch((error)=> {
            console.log(error)
        })
    }
}

export const startDeleteContract = (contractID, year) => {
    return (dispatch, getState) => {
        const token = getState().user.token

        return axios({
            method: 'delete',
            url: `/contract-api/${contractID}`,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(()=>{
            dispatch(startSetContracts(year))
        }).catch((e)=> console.log(e))
    }
}

export const startDeleteInvoice = (contractID, invoiceId) => {
    return (dispatch, getState) => {
        const token = getState().user.token

        return axios({
            method: 'delete',
            url: `/contract-api/invoice/${contractID}/${invoiceId}`,
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((res)=> {
            dispatch(editContract(contractID, res.data))
        }).catch((error)=>console.log(error))
    }
}