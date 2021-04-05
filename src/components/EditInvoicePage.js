import React from 'react'
import InvoiceForm from './InvoiceForm'
import {connect} from 'react-redux'

import {startEditInvoice} from '../actions/contracts'

const EditInvoicePage = (props) => {

return(
    <div className="edit-invoice-page">
        <h1>Edytuj</h1>
        <InvoiceForm
            invoice={props.contract.invoices.find((invoice)=> invoice._id === props.match.params.invoiceid)}
            buttonText={"Edytuj"}
            onSubmit = {
                (invoice) => {
                    props.startEditInvoice(props.match.params.id, props.match.params.invoiceid, invoice)
                    props.history.push(`/contract/${props.match.params.id}`)
                }
            }
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
        startEditInvoice: (contractId, invoiceId, updates) => dispatch(startEditInvoice(contractId, invoiceId, updates))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditInvoicePage)