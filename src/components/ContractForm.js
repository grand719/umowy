import React from 'react';

export default class ContractForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
            title: props.contract ? props.contract.title : '',
            budget: props.contract ? (props.contract.budget/100).toString(): '',
            contract_number: props.contract ? props.contract.contract_number : '',
            year:props.contract ? props.contract.year : '',
        } 
    }

    onTitleChange = (e) => {
        const title = e.target.value
        this.setState(()=>({title}))
    }
    onBudgetChange = (e)=> {
        const budget = e.target.value;

        if (!budget || budget.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(()=>({budget}))
        }
    }

    onYearChange = (e)=> {
        const year = e.target.value;

        if(!year || year.match(/^\d{1,}/) && year.length <= 4){
            this.setState(()=> ({year}))
        }
    }
    onContractNumberChange = (e)=> {
        const contract_number = e.target.value;
        this.setState(()=>({
            contract_number
        }))
    }

    onSubmit = (e)=> {
        e.preventDefault();

        if(!this.state.title || !this.state.year || !this.state.budget || !this.state.contract_number) {
            this.setState(()=> ({
                error: "Wypełnij wszystkie pola"
            }))
        }else {
            this.setState(()=>({error: ''}))
            this.props.onSubmit({
                title: this.state.title,
                budget: parseFloat(this.state.budget, 10)*100,
                year: this.state.year,
                contract_number: this.state.contract_number
            })
        }


    }

    render() {
        return (
            <div className="contract-form">
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input 
                        type="text"
                        placeholder="Tytuł"
                        autoFocus
                        value={this.state.title}
                        onChange={this.onTitleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Budżet"
                        autoFocus
                        value={this.state.budget}
                        onChange={this.onBudgetChange}
                    />
                    <input 
                        type="text"
                        placeholder="Numer Kontraktu"
                        autoFocus
                        value={this.state.contract_number}
                        onChange={this.onContractNumberChange}
                    />
                    <input 
                        type="text"
                        placeholder="Rok"
                        autoFocus
                        value={this.state.year}
                        onChange={this.onYearChange}
                    />
                    <button>
                        {this.props.nameOfButton}
                    </button>
                </form>
            </div>
        )
    }
}