import React from 'react';
import { fetchUser } from '../api';
import Loading from './Loading';
import { AuthConsumer } from '../context'

class AuthProvider extends React.Component {
  state = { isAuth: true, user: {}, loading: true };

  componentDidMount = async () => {
    const user = await fetchUser();
    this.setState({ user, loading: false });
  };

  login() {
    setTimeout(() => this.setState({ isAuth: true }), 1000);
  }

  logout() {
    this.setState({ isAuth: false, user: {} });
  }

  render() {
    // console.log(this.state)
    const { children } = this.props;
    return (
      <AuthConsumer.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          user: this.state.user
        }}
      >
        {this.state.loading ? <Loading /> : children}
      </AuthConsumer.Provider>
    );
  }
}

export default AuthProvider;
