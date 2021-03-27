import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom';

import UserForm from './UserForm'
import {startEditUser, startDeleteUser} from '../actions/users'


const EditUserPage = (props) => {

    return (
        <div>
            <UserForm
                user = {props.user}
                onSubmit = {
                    (user) => {
                        props.startEditUser(props.match.params.id, user)
                        props.history.push('/adminpage')
                    }
                }
                nameOfButton = {"Zapisz"}
            />
        <Link to={'/adminpage'}>
            <button 
                onClick={()=>{
                    props.startDeleteUser(props.match.params.id)
                }}
            >Usuń</button>
        </Link>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        user: state.users.find((user) => user._id === props.match.params.id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startEditUser: (userID, user) => dispatch(startEditUser(userID, user)), 
        startDeleteUser: (userID) => dispatch(startDeleteUser(userID))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditUserPage)