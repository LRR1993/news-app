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
    const data = localStorage.getItem('data');
    // console.log('localstorage', data);
    if (data) {
      const user = JSON.parse(data);
      this.setState({ user, loading: false, isAuth: true });
    } else {
      const user = await fetchUser();
      this.setState({ user, loading: false });
    }
  };
  saveData = () => {
    localStorage.setItem('data', JSON.stringify(this.state.user));
  };

  login = values => {
    const { user } = this.state;
    const isUser = user.filter(item => {
      return item.username === values.username;
    });
    if (isUser.length === 1 && values !== null) {
      navigate('/articles', { replace: true });
      this.setState({ isAuth: true, user: isUser[0] });
      // this.snackbarOpen();
      if (values.rememberMe) this.saveData();
    } else return { username: 'Unknown username' };
  };

  logout = () => {
    this.setState({ isAuth: false });
    localStorage.clear();
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
