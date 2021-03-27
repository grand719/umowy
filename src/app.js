import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'
import moment from 'moment';

import configureStore from './store/configureStore'
import AppRouter from './routers/AppRouter'

import {startUsersSet} from './actions/users'
import {startSetContracts} from './actions/contracts'

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.subscribe(()=>{
    const state = store.getState()
    console.log(state)

})

const checkAuth = setInterval(()=> {
    if(!!store.getState().user.token) {
        store.dispatch(startSetContracts(2020))
    if(store.getState().user.user.name === "admin") {
        store.dispatch(startUsersSet())
    }
        clearCheckAuth();
    }
}, 1)

const clearCheckAuth = () => {
    clearInterval(checkAuth)
}


console.log(moment().format('YYYY'))






const jsx = (
    <Provider store={store}> 
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
    