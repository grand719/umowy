import React from 'react'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {startDeleteInvoice} from '../actions/contracts'
import numeral from 'numeral'
import moment from 'moment';

const InvoiceTableItem = (props) => (
  <tr>
      <td className="first-td">
          {props.invoice.title}
      </td>
      <td>
          {numeral(props.invoice.value/100).format('0,0.00')}zł
      </td>
      <td>
         {moment(props.invoice.invoiceDate).format('YYYY-MM-DD')}
      </td>
      <td>
         {props.invoice.createdBy}
      </td>
      <td>
          {props.invoice.modifiedBy}
      </td>
      <td>
      <Link to={`/editinvoice/${props.contractID}/${props.invoice._id}`}>
            <button>
                Edytuj
            </button>
      </Link>
      </td>
      <td>
      <button onClick={()=>{props.startDeleteInvoice(props.contractID,props.invoice._id)}}>
                Usuń
      </button>
      </td>
  </tr>
)

const mapDispatchToProps = (dispatch) => {
    return {
        startDeleteInvoice: (contractID, invoiceId) => dispatch(startDeleteInvoice(contractID, invoiceId))
    }
}

export default connect(undefined, mapDispatchToProps)(InvoiceTableItem) 