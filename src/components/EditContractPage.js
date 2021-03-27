import React from 'react'
import ContractForm from './ContractForm'
import {connect} from 'react-redux'


import {startEditContract} from '../actions/contracts'

const EditContractPage = (props) => {

return(
    <div>
        <ContractForm 
            contract={props.contract}
            onSubmit = {
                (contract) => {
                    props.startEditContract(props.match.params.id, contract)
                    props.history.push(`/contract/${props.match.params.id}`)
                }
            }
            nameOfButton = {"Zapisz"}
        />
    </div>
)
        }
const mapStateToProps = (state, props) => {
    return {
        contract: state.contracts.find((contract)=> contract._id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditContract: (contractID, updates) => dispatch(startEditContract(contractID, updates))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContractPage)