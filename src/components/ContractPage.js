import numeral from 'numeral';
import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { startDeleteContract } from '../actions/contracts';
import InvoiceListItem from './InvoiceListItem'
import InvoiceTableItem from './InvoiceTableItem'

const ContractPage = (props) => {
    const totalInvoiceValue = (invoices) => {
        let value = 0;
    
        invoices.forEach(invoice => {
            value += (invoice.value);
        })
        return value
    }

    const onClickDelete = () => {

        const acceptCheck = confirm('Napewno chcesz usunąć tą umowę?')
        if(acceptCheck) {
            props.startDeleteContract(props.contract._id, props.contract.year)
            props.history.push('/')
        }
    }
    return (
        <div className="contract-page">
            <div className="contract-page--title">
                <h1>Tytuł: {props.contract.title}</h1>
                <h1>Wartość umowy: {numeral(props.contract.budget/100).format('0,0.00')}zł</h1>
                <h1>Pozostała kwota: {numeral((props.contract.budget - totalInvoiceValue(props.contract.invoices))/100).format('0,0.00')}zł</h1>
            </div>
            <div className="contract-page--wrapper">
            <div className="contract-page--menu">
            <Link to={`/createinvoice/${props.contract._id}`}>
                <button className="contract-page--menu-button">
                    Dodaj Fakture
                </button>
            </Link>
            <Link to={`/editcontract/${props.contract._id}`}>
                <button className="contract-page--menu-button">
                    Edytuj
                </button>
            </Link>
            <button onClick={onClickDelete} className="delte-button">
                Usuń
            </button>
            </div>
            </div>
            <div className="table-wrapper">
            <table>
            <tbody>
            <tr className="table-titles">
                <th>Tytuł/Numer</th>
                <th>Wartość faktury</th>
                <th>Data</th>
                <th>Dodane przez</th>
                <th>Zmodyfikowane przez</th>
                <th colSpan="2">Akcje</th>
                <th></th>
            </tr>
            {
                props.contract.invoices.map((invoice, idx)=> {
                    return <InvoiceTableItem key = {idx} invoice = {invoice} 
                    contractID = {props.contract._id} />
                })
            }
            </tbody>
            </table>
            </div>
        </div>
    )
}

const mapStateToProps = (state, props)=> {
    return {
        contract: state.contracts.find((contract)=> contract._id === props.match.params.id),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startDeleteContract: (contractID, year) => dispatch(startDeleteContract(contractID, year))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractPage)