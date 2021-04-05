import React from "react";
import ContractForm from './ContractForm'
import {connect} from 'react-redux'
import { startAddContract } from "../actions/contracts";

export class AddContractPage extends React.Component {
    onSubmit = (contract) => {
        this.props.startAddContract(contract);
        this.props.history.push('/');
    }
    render() {
        return (
            <div className="add-contract-page">
            <h1>Dodaj umowe</h1>
            <ContractForm
                onSubmit={this.onSubmit}
                nameOfButton={"Dodaj"}
            />
        </div>  
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddContract: (contract) => dispatch(startAddContract(contract))
})

export default connect(undefined, mapDispatchToProps)(AddContractPage);
