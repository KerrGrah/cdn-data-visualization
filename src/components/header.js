import React, {Component} from 'react';

export default class Header extends Component {

  render() {
    const users = this.props.users.map(user => <option value={user.identifiant}>{user.identifiant}</option>)

    return (
      <div className="header-container">
        <div className="logo-container">
          <h1>data<span>flow</span></h1>
        </div>
        <div className="select-container">
        <select onChange={this.props.logIn.bind(this)}>
            <option>choose user</option>
            {users}
          </select>
        </div>
      </div>
    )
  }
}
