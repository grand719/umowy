import React from 'react';
import {connect} from 'react-redux';
import {addText} from '../actions/filters'
import {startSetContracts} from '../actions/contracts'


class ContractListFilter extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            error: '',
            year: '',
        }



    }

    noenter = (e) => {
        e = e || window.event;

        let key = e.keyCode || e.charCode;

        return key !== 13;
    }

    onYearChange = (e) => {
        const year = e.target.value

        this.setState(()=> ({year}))
    }

    onFilterChange = (e) => {
        e.preventDefault();
        const text = e.target.value

        this.props.addText({text: text})
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.props.addText({text: ''})
        this.props.startSetContracts(this.state.year)
        this.setState(()=>({year: ''}))
    }

    render() {
        return (
            <div className="contract-filters">
            <div className="filtruj">
             <input type="text" placeholder="Filtruj"  value={this.props.text} onChange={this.onFilterChange} />
             </div>
             <form onSubmit={this.onSubmit}>
             <input type="text" placeholder="Rok" value={this.props.year} onChange={this.onYearChange}/>
             <button>Wyszukaj</button>
             </form>
            </div>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        filters: state.filters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startSetContracts: (year) => dispatch(startSetContracts(year)),
        addText: (text) => dispatch(addText(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContractListFilter)