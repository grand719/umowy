import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {startDeleteInvoice} from '../actions/contracts'
import numeral from 'numeral'

const InvoiceListItem = (props) => (
    <div>
        <h3>{props.invoice.title}</h3>
        <p>Kwota faktury: {numeral(props.invoice.value/100).format('0,0.00')}zł</p>
        <p>Utworzone przez: {props.invoice.createdBy}, Zmodyfikowane przez: {props.invoice.modifiedBy}</p>
        <Link to={`/editinvoice/${props.contractID}/${props.invoice._id}`}>
            <button>
                Edytuj
            </button>
        </Link>
            <button onClick={()=>{props.startDeleteInvoice(props.contractID,props.invoice._id)}}>
                Usuń
            </button>
    </div>
)

const mapDispatchToProps = (dispatch) => {
    return {
        startDeleteInvoice: (contractID, invoiceId) => dispatch(startDeleteInvoice(contractID, invoiceId))
    }
}

export default connect(undefined, mapDispatchToProps)(InvoiceListItem) 