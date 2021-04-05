import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import {startUserLogout} from '../actions/user'
import {clearUsers} from '../actions/users'

const Header =(props) => (
        <header className="header">
            <h1>
                Umowy
            </h1>
            <nav>
            <NavLink to='/' activeClassName='is-active' className="header-nav__link" exact={true}>Umowy </NavLink>
            <NavLink to='/create' activeClassName='is-active' className="header-nav__link">Dodaj umowe </NavLink>
            <NavLink to='/me' activeClassName='is-active' className="header-nav__link">{props.user.name}</NavLink>
            {props.user.name === 'admin' && <NavLink to='/adminpage' activeClassName='is-active' className="header-nav__link">Użytkownicy</NavLink>}
            {props.user.name === 'admin' && <NavLink to='/adduser' activeClassName='is-active' className="header-nav__link">Dodaj użytkownika</NavLink>}
            <button onClick={()=>{
                props.startUserLogout()
            }}>Wyloguj</button>
            </nav>
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