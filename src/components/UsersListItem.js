import React from 'react';
import {Link} from 'react-router-dom'

const UsersListItem = ({_id, name}) => {
    
return (
    <div>
        <Link to={`/editUser/${_id}`}>
            <h1>{name}</h1>
        </Link>
    </div>
)
}

export default UsersListItem;