import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import MainBar from './views/MainBar';
import Drawer from './components/Drawer';

const axios = require('axios');

class App extends Component {
  state = {
    loggedIn: true,
    user: {}
  };
  fetchuser = async () => {
    const returned = await axios.get(
      `http://nc-news-letisha.herokuapp.com/api/users`
    );
    return returned.data.users[5];
  };
  logout = () => {
    this.setState(state => ({ loggedIn: !state.loggedIn }));
    this.setState(state => ({ user: {} }));
  };

  componentDidMount = async () => {
    const user = await this.fetchuser();
    this.setState({ user });
  };

  render() {
    const { user, loggedIn } = this.state;
    console.log('state:', this.state);
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MainBar user={user} loggedIn={loggedIn} logout={this.logout} />
        <Drawer />
      </MuiThemeProvider>
    );
  }
}

export default App;
