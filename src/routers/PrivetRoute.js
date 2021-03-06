import React from 'react';
import {connect} from 'react-redux'
import {Route, Redirect} from 'react-router-dom'
import Header from '../components/Header'


export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    <Route {...rest} component={(props)=>(
        isAuthenticated ? (
            <div >
                <Header />
            <div className="main-wrapper">
                <Component {...props} />
            </div>
            </div>
        ) : (
            <Redirect to="/login" />
        )
    )}/>
);

const mapStateToProps = (state)=> ({
    isAuthenticated: !!state.user.token
})

export default connect(mapStateToProps)(PrivateRoute)