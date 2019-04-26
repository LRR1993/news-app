import React from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import { fetchUser } from '../api';
import Loading from './Loading';
import AuthConsumer from '../context';

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
    if (data) {
      const user = JSON.parse(data);
      this.setState({ user, loading: false, isAuth: true });
    } else {
      this.setState({ loading: false });
    }
  };

  saveData = () => {
    const { user } = this.state;
    localStorage.setItem('data', JSON.stringify(user));
  };

  login = async values => {
    const user = await fetchUser(values.username).catch(err =>
      Promise.resolve(err)
    );
    if (user.username === values.username) {
      navigate('/articles', { replace: true });
      this.setState({ isAuth: true, user });
      // this.snackbarOpen();
      if (values.rememberMe) this.saveData();
    } else return { username: 'Unknown username' };
  };

  logout = () => {
    this.setState({ isAuth: false });
    localStorage.clear();
  };

  render() {
    const { children } = this.props;
    const {
      user,
      loading,
      isAuth,
      login,
      logout,
      snackbar,
      snackbarClose,
      snackbarOpen
    } = this.state;
    return (
      <AuthConsumer.Provider
        value={{
          isAuth,
          login,
          logout,
          user,
          snackbar,
          snackbarClose,
          snackbarOpen
        }}
      >
        {loading ? <Loading /> : children}
      </AuthConsumer.Provider>
    );
  }
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
