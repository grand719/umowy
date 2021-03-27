import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import contractsReducer from '../reducers/contracts'
import filtersReducer from '../reducers/filter'
import userReducer from '../reducers/user'
import usersReducer from '../reducers/users';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            contracts: contractsReducer,
            filters: filtersReducer,
            user: userReducer,
            users: usersReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
}