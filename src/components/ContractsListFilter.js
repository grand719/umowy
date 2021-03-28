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

    onYearChange = (e) => {
        const year = e.target.value

        this.setState(()=> ({year}))
    }

    onFilterChange = (e) => {
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
            <div>
             <input type="text" value={this.props.text} onChange={this.onFilterChange}/>
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