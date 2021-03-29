import axios from 'axios';
import moment from 'moment';

import {startUsersSet, clearUsers} from './users'
import {startSetContracts, clearContract} from './contracts'

export const addUser = (user) => ({
    type: 'ADD_USER',
    user
})

export const startUserLogin = (user ) => {
    return (dispatch) => {
        const data = JSON.stringify(user)

        return axios({
            method: "post",
            url: "/user-api/login",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        }).then((res)=> {
            dispatch(addUser(res.data))
            dispatch(startSetContracts(moment().format('YYYY')))
            if(res.data.user.name === 'admin') {
                dispatch(startUsersSet())
            }
        }).catch((error)=> {
            console.log(error)
        })
    }
}

export const userLogout = () => ({
    type: 'USER_LOGOUT'
})

export const startUserLogout = () => {
    return(dispatch,  getState) => {

        const token = getState().user.token

        return axios({
            method: 'post',
            url: '/user-api/logout',
            headers: {
                "Authorization": `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        }).then(() => {
            dispatch(userLogout())
            dispatch(clearUsers())
            dispatch(clearContract())
        })
        .catch((error)=> {
            console.log(error)
        })
    }
}

export const startUserPasswordChange = (password) => {

    return(dispatch, getState) => {
        const token = getState().user.token
        const data = JSON.stringify(password)
        return axios({
            method: 'patch',
            url: '/user-api/password',
            headers: {
                "Authorization": `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            data 
        }).then(()=>{dispatch(userLogout())}).catch((error)=> {console.log(error)})
    }

}

