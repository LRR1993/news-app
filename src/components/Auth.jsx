import React from 'react';
import { fetchUser } from '../api';
import Loading from './Loading';
import { AuthConsumer } from '../context';
import { navigate } from '@reach/router';

class AuthProvider extends React.Component {
  state = { isAuth: false, user: {}, loading: true, snackbar: false };

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

  login = async values => {
    console.log(this.state.user);
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(300);
    const isUser = this.state.user.filter(
      user => user.username === values.username
    );
    if (isUser.length === 1) {
      navigate('/articles', { replace: true })
      this.setState({ isAuth: true })
      this.snackbarOpen()
    } else return { username: "Unknown username" }
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
