import React from 'react';
import {connect} from 'react-redux'
import UsersListItem from './UsersListItem'

const UsersList = (props) => (
    <div>
        {props.users.lenght === 0 && <p>Brak Użytkowników</p>}
        {props.users.map((user) => {
            return <UsersListItem key={user._id} {...user}/>
        })}
    </div>
);

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export  default connect(mapStateToProps)(UsersList)