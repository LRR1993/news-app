import React from 'react';
import { fetchUser } from '../api';
import Loading from './Loading';
import { AuthConsumer } from '../context';

class AuthProvider extends React.Component {
  state = { isAuth: true, user: {}, loading: true, snackbar: false };

  snackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbar: false });
  };
  snackbarOpen = () => {
    this.setState({ snackbar: true });
  };

  componentDidMount = async () => {
    const user = await fetchUser();
    this.setState({ user, loading: false });
  };

  logout = () => {
    setTimeout(() => this.setState({ isAuth: true }), 1000);
  };

  logout = () => {
    this.setState({ isAuth: false });
  };

  render() {
    // console.log('auth state:', this.state);
    const { children } = this.props;
    return (
      <AuthConsumer.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          user: this.state.user,
          snackbar: this.state.snackbar,
          snackbarClose: this.snackbarClose,
          snackbarOpen: this.snackbarOpen
        }}
      >
        {this.state.loading ? <Loading /> : children}
      </AuthConsumer.Provider>
    );
  }
}

export default AuthProvider;
