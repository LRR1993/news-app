import React, { Component } from 'react';
import { Router } from '@reach/router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import MainBar from './views/MainBar';
import Drawer from './components/Drawer';
import Card from './components/Card';

const axios = require('axios');

class App extends Component {
  state = {
    loggedIn: false,
    user: {},
    topics: [
      {
        "slug": "coding",
        "description": "Code is love, code is life"
      },
      {
        "slug": "football",
        "description": "FOOTIE!"
      },
      {
        "slug": "cooking",
        "description": "Hey good looking, what you got cooking?"
      }
    ]
  };
  fetchuser = async () => {
    const returned = await axios.get(
      `http://nc-news-letisha.herokuapp.com/api/users`
    );
    return returned.data.users[5]; // remeber to change when logged in page updated
  };
  
  logout = () => {
    this.setState(state => ({ loggedIn: !state.loggedIn, user: {} }));
  };

  componentDidMount = async () => {
    const user = await this.fetchuser();
    this.setState({ user });
  };

  render() {
    const { user, loggedIn, topics } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MainBar user={user} loggedIn={loggedIn} logout={this.logout} topics={topics} />
        <Drawer />
        <Router>
          <Card path="/articles"/>
        </Router>
        
      </MuiThemeProvider>
    );
  }
}

export default App;
