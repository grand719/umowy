import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {startUserLogout} from '../actions/user'
import {clearUsers} from '../actions/users'

const Header =(props) => (
        <header>
            <h1>
                Umowy
            </h1>
            <NavLink to='/' activeClassName='is-active' exact={true}>Umowy </NavLink>
            <NavLink to='/create' activeClassName='is-active' >Dodaj umowe </NavLink>
            <NavLink to='/me' activeClassName='is-active'>Ja, {props.user.name}</NavLink>
            {props.user.name === 'admin' && <NavLink to='/adminpage' activeClassName='is-active'>Użytkownicy</NavLink>}
            <button onClick={()=>{
                props.startUserLogout()
            }}>Wyloguj</button>
        </header>
)

const mapStateToProps = (state) => {
    return {
        user: state.user.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startUserLogout: ()=> dispatch(startUserLogout()),
        clearUsers: () => dispatch(clearUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)