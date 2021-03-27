import numeral from 'numeral';
import React from 'react';
import {Link} from 'react-router-dom'

const ContractsListItem = ({_id, title, contract_number, year, budget, invoices}) => {

const totalInvoiceValue = (invoices) => {
    let value = 0;

    invoices.forEach(invoice => {
        value += (invoice.value);
    })
    return value
}

return (
    <div>
        <Link to={`/contract/${_id}`}>
        <h3>{title} | Numer umowy: {contract_number} | Wartość umowy {numeral(budget/100).format('0,0.00')}zł</h3>
        </Link>
        <h4> Pozostała kwota: {numeral((budget - totalInvoiceValue(invoices))/100).format('0,0.00')} zł</h4>
        <h4> Rok {year}</h4>
    </div>
)
}
export default ContractsListItem;