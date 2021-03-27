import React from "react";
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom'

import Header from '../components/Header'
import NotFound from '../components/NotFound'
import ContractsDashboardPage from '../components/ContractsDashboardPage'
import ContractPage from '../components/ContractPage'
import AddContractPage from '../components/AddContractsPage'
import AddInvoicePage from '../components/AddInvoicePage'
import UserPage from '../components/UserPage'
import EditContractPage from '../components/EditContractPage'
import EditInvoicePage from '../components/EditInvoicePage'
import LoginUserPage from "../components/LoginUserPage";
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivetRoute'
import AdminPage from '../components/AdminPage'
import AddUserPage from '../components/AddUserPage'
import EditUserPage from '../components/EditUserPage'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <PrivateRoute path="/" component={ContractsDashboardPage} exact={true}/>
                <PrivateRoute path="/contract/:id" component={ContractPage} />
                <PrivateRoute path="/create" component={AddContractPage} />
                <PrivateRoute path="/me" component={UserPage} />
                <PrivateRoute path="/createinvoice/:id" component={AddInvoicePage} />
                <PublicRoute path="/login" component={LoginUserPage} />
                <PrivateRoute path="/editcontract/:id" component={EditContractPage} />
                <PrivateRoute path="/editinvoice/:id/:invoiceid" component={EditInvoicePage} />
                <PrivateRoute path="/adminpage" component={AdminPage}/>
                <PrivateRoute path="/adduser" component={AddUserPage}/>
                <PrivateRoute path="/editUser/:id" component={EditUserPage} />
                <Route component={NotFound}/> 
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
