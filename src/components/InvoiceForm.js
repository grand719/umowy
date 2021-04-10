import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css'

class InvoiceForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
            title: props.invoice ? props.invoice.title : '',
            value: props.invoice ? (props.invoice.value/100).toString() : '',
            invoiceDate: props.invoice ? moment(props.invoice.invoiceDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
            createdBy: props.invoice ? props.invoice.createdBy : this.props.user,
            modifiedBy: this.props.user,
        } 
    }

    onTitleChange = (e) => {
       const title = e.target.value;

       this.setState(()=> ({title}))
    }

    onValueChange = (e)=> {
        const value = e.target.value;

        if (!value || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(()=>({value}))
        }
    }

    onDateChange = (e) => {
           const invoiceDate = e.target.value;

            this.setState(()=> ({
                invoiceDate
            }))
    }

    onSubmit = (e)=> {
        e.preventDefault();

        if(!this.state.title || !this.state.value ) {
            this.setState(()=> ({
                error: "Wypełnij wszystkie pola"
            }))
        }else {
            this.setState(()=>({error: ''}))
            this.props.onSubmit({
               title: this.state.title,
               value: parseFloat(this.state.value, 10)*100,
               invoiceDate: this.state.invoiceDate.valueOf(),
               createdBy: this.state.createdBy,
               modifiedBy: this.state.modifiedBy
            })
        }
    }

    render() {
        return (
            <div className="invoice-form">
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
                        placeholder="Kwota"
                        value={this.state.value}
                        onChange={this.onValueChange}
                    />
                    <input 
                        type="date"
                        value={this.state.invoiceDate}
                        onChange={this.onDateChange}
                    />
                    <button>
                        {this.props.buttonText}
                    </button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.name
    }
}

export default connect(mapStateToProps)(InvoiceForm)