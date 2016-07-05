import React, { PropTypes } from 'react';

class Login extends React.Component {
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

export default Login;
