import axios from 'axios';


export const setUsers = (users) => ({
    type: 'SET_USERS',
    users
})

export const startUsersSet = () => {
    return(dispatch, getState) => {
        const token = getState().user.token

        return axios({
            method: 'get',
            url: '/admin-api/getusers',
            headers: {
                "Authorization": `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        }).then((res)=> {
            dispatch(setUsers(res.data))
        }).catch((error)=> {
            console.log(error)
        })
    }
}

export const clearUsers = () => ({
    type: 'CLEAR_USERS'
})

export const startAddUser = (user) => {
    return(dispatch, getState) => {
        const token = getState().user.token
        const data = JSON.stringify(user)
        return axios({
            method: 'post',
            url: '/admin-api/createuser',
            headers: {
                "Authorization": `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            data
        }).then(()=> {
            dispatch(startUsersSet())
        }).catch((error)=> {
            console.log(error)
        })
    }
}

export const startEditUser = (userID,user) => {
    return (dispatch, getState) => {
        const token = getState().user.token
        const data = JSON.stringify(user)

        return axios({
            method: 'patch',
            url: `/admin-api/updateuser/${userID}`,
            headers: {
                "Authorization": `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            data
        }).then(()=> {
            dispatch(startUsersSet())
        }).catch((error)=> {
            console.log(error)
        })
    }
}

export const startDeleteUser = (userID) => {
    return (dispatch, getState) => {
        const token = getState().user.token

        return axios({
            method: 'delete',
            url: `/admin-api/deletuser/${userID}`,
            headers: {
                "Authorization": `Bearer ${token}`, 
                'Content-Type': 'application/json'
            }
        }).then(()=> {
            dispatch(startUsersSet())
        }).catch((error)=> {
            console.log(error)
        })
    }
}