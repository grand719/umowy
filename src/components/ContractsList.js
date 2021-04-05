import React from 'react';
import {connect} from 'react-redux'
import ContractsListItem from './ContractListItem'
import selectContracts from '../selectors/contracts'

const ContractsList = (props) => (
    <div className="contract-list">
        {props.contracts.lenght === 0 && <p>Brak kontraktów</p>}
        {props.contracts.map((contract)=> {
            return <ContractsListItem key={contract._id} {...contract} />
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        contracts: selectContracts(state.contracts, state.filters)
    };
    
}


export default connect(mapStateToProps)(ContractsList);
