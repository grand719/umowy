import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import UsersList from './UsersList'

const AdminPage = () => (
    <div>
        <Link to='/adduser'>Dodaj użytkownika</Link>
        <UsersList />
    </div>
)

export default AdminPage;
