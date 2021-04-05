import React from 'react';
import { connect } from 'react-redux';
import {startUserLogin} from '../actions/user'

class LoginUserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {  
            name: '',
            password: '',
        }
    }

    onLoginChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({name}));
    }

    onPasswordChange = (e) => {
        const password = e.target.value
        this.setState(()=> ({password}))
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)
        this.props.startUserLogin(this.state)
    }

    render() {
        return (
           <div className="login-wrapper"> 
            <div className="login-bracket">
                <h1>
                    Umowy
                </h1>
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Login" value={this.state.name} onChange={this.onLoginChange} />
                    <input type="password" placeholder="Hasło" value={this.state.password} onChange={this.onPasswordChange} />
                    <button>Zaloguj</button>
                </form>
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startUserLogin: (user) => dispatch(startUserLogin(user))
});


export default connect(undefined, mapDispatchToProps)(LoginUserPage)

