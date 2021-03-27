import React from 'react'

export default class UserForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            error: '',
            name: props.user ? props.user.name : '',
            password: '',
            repeatPassword: ''
        }
    }

    onNameChange = (e) => {
        const name = e.target.value

        this.setState(()=>({name}))
    }

    onPasswordChange = (e) => {
        const password = e.target.value

        this.setState(()=>({password}))
    }

    onrepeatPasswordChange = (e) => {
        const repeatPassword = e.target.value

        this.setState(()=>({repeatPassword}))
    }

    onSubmit = (e) => {
        e.preventDefault();


        if(!this.state.name || !this.state.password || !this.state.repeatPassword) {
            this.setState(()=>({error:"Wypełnij wszystkie pola"}))
        }else {
            if(this.state.password != this.state.repeatPassword) {
                this.setState(()=>({error:"Hasła nie są takie same"}))
            }else {
                this.setState(()=>({error: ''}))
                this.props.onSubmit ({
                    name: this.state.name,
                    password: this.state.password
                })
            }
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                <input 
                    type="text"
                    placeholder="Nazwa użytkownika"
                    autoFocus
                    value={this.state.name}
                    onChange={this.onNameChange}
                    />
                <input 
                     type="password"
                     placeholder="hasło"
                     value={this.state.password}
                     onChange={this.onPasswordChange}
                    />
                <input 
                     type="password"
                     placeholder="powtórz hasło"
                     value={this.state.repeatPassword}
                     onChange={this.onrepeatPasswordChange}
                    />
                <button>{this.props.nameOfButton}</button>
                </form>
            </div>
        )
    }
}