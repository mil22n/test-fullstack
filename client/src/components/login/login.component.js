import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth.actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '', redirectTo: '/' };

        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const queryString = new URLSearchParams(this.props.location.search);
        const redirectTo = queryString.get('redirectTo');

        if(redirectTo) {
            this.setState({redirectTo: `/${redirectTo}`});
        }
    }

    handleLogin(event) {
        event.preventDefault();

        this.props.login(this.state.username, this.state.password);
        this.props.history.push(this.state.redirectTo);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className="login">
                <div>
                    <form onSubmit={this.handleLogin}>
                        <table>
                            <caption><h3>Login</h3></caption>
                            <tbody>
                            <tr>
                                <td>Username:</td>
                                <td><input name="username" type="text" value={this.state.username} onChange={this.onChange} /></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input name="password" type="password" value={this.state.password} onChange={this.onChange}/></td>
                            </tr>
                            <tr>
                                <td><button>Login</button></td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps, { login })(Login);
