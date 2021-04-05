import React from 'react'
import {connect} from 'react-redux';
import {startUserPasswordChange} from '../actions/user';


 class UserPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
            password: '',
            repeatPassword: ''
        }
    }

 
onPasswordChange = (e) => {
    const password = e.target.value

    this.setState(()=> ({password}))
}

onRepeatPassword = (e) => {
    const repeatPassword = e.target.value

    this.setState(()=>({repeatPassword}))
}

onSubmit = (e) => {
    e.preventDefault()
        if(this.state.password === this.state.repeatPassword) {
            this.props.startUserPasswordChange({password: this.state.password})
            console.log(this.state.password)
        }else {
            this.setState(()=> ({error: 'Hasła nie są takie same'}))
        }
    
}

 render() {
    return (
        <div className="user-page">
            <h1>
                {this.props.user.name}
            </h1>
            <h3>
                Zmiana hasła
            </h3>
                {this.state.error && <p>{this.state.error}</p> }
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Nowe hasło" value={this.state.password} onChange={this.onPasswordChange}/>
                    <input type="text" placeholder="Potwierdź nowe hasło" value={this.state.repeatPassword} onChange={this.onRepeatPassword}/>
                    <button>Zmień</button>
                </form>
        </div>
    )
 }

}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startUserPasswordChange: (password) => dispatch(startUserPasswordChange(password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)