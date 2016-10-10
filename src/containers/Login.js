import React, { PropTypes, Component } from 'react';

export class Login extends Component {
  render() {
    return (
      <div className="login">
        <input
          name="username"
          type="text"
          placeholder="username"
        />
        <input
          name="password"
          type="text"
          placeholder="username"
        />
      </div>
    );
  }
}
