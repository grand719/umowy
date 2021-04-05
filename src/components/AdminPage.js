import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import UsersList from './UsersList'

const AdminPage = () => (
    <div>
        <UsersList />
    </div>
)

export default AdminPage;
