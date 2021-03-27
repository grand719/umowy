import React from "react";
import ContractForm from './ContractForm'
import {connect} from 'react-redux'

import UserForm from './UserForm'
import {startAddUser} from '../actions/users'

export class AddUserPage extends React.Component {
    onSubmit = (user) => {
        this.props.startAddUser(user)
        this.props.history.push('/adminpage')
    }
    render() {
        return(
            <div>
                <h1>Dodaj użytkownika</h1>
                <UserForm
                    onSubmit={this.onSubmit}
                    nameOfButton={"Dodaj"}
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startAddUser: (user) => dispatch(startAddUser(user))
    }
}

export default connect(undefined, mapDispatchToProps)(AddUserPage)