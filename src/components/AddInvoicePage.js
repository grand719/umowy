import React from "react";

import {connect} from 'react-redux'
import { startAddInvoice } from "../actions/contracts";
import InvoiceForm from './InvoiceForm'

export class AddInvoicePage extends React.Component {
    onSubmit = (invoice) => {
        this.props.startAddInvoice(this.props.match.params.id, invoice);
        this.props.history.push(`/contract/${this.props.match.params.id}`)
    };

    render() {
        return (
            <div>
                <h1>Dodaj Fakture</h1>
                <InvoiceForm
                   onSubmit={this.onSubmit} 
                   buttonText={"Dodaj"}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddInvoice: (contractID, invoice)  => dispatch(startAddInvoice(contractID, invoice))
})

export default connect(undefined, mapDispatchToProps)(AddInvoicePage);
