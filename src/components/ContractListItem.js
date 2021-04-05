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
    <div className="contracts-list-item">
        <Link to={`/contract/${_id}`} className="contract-item__link">
        <div>
        <div className="contract-item__title">
        <h3>Tytuł: {title} </h3>
        <h3>Numer umowy: {contract_number} </h3>
        <h4> Rok {year}</h4>
        </div>
        <div className="contract-item__values">
        <h4> Wartość umowy {numeral(budget/100).format('0,0.00')}zł</h4>
        <h4> Pozostała kwota: {numeral((budget - totalInvoiceValue(invoices))/100).format('0,0.00')} zł</h4>
        </div>
        </div>
        </Link>
    </div>
)
}
export default ContractsListItem;