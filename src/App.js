import React, { Component } from 'react';
import { Router } from '@reach/router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import MainBar from './views/MainBar';
import Drawer from './components/Drawer';
import Articles from './views/Articles';
import { Grid } from '@material-ui/core';
import ArticleAndComments from './views/ArticleAndComments';

const axios = require('axios');

class App extends Component {
  state = {
    loggedIn: false,
    user: {},
    topics: []
  };
  fetchUser = async () => {
    const returned = await axios.get(
      `http://nc-news-letisha.herokuapp.com/api/users`
    );
    return returned.data.users[5]; // remeber to change when logged in page updated
  };

  fetchTopic = async () => {
    const returned = await axios.get(
      `https://nc-news-letisha.herokuapp.com/api/topics`
    );
    return returned.data.topics;
  };

  logout = () => {
    this.setState(state => ({ loggedIn: !state.loggedIn, user: {} }));
  };

  componentDidMount = async () => {
    const user = await this.fetchUser();
    const topics = await this.fetchTopic();
    this.setState({ user, topics });
  };

  render() {
    const { user, loggedIn, topics } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <MainBar
          user={user}
          loggedIn={loggedIn}
          logout={this.logout}
          topics={topics}
        />
        <Drawer />
        <Router>
          <Articles path="/articles" />
          <ArticleAndComments path='/articles/:article_id'/>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

{
  /* <Grid container style={{ backgroundColor: 'green' }}>
  <Grid container>
    <Grid
      item
      xs={12}
      style={{ backgroundColor: 'blue', height: '250px' }}
    />
  </Grid>
  <Grid container>
    <Grid
      item
      xs={12}
      style={{ backgroundColor: 'grey', height: '250px' }}
    />
  </Grid>
  <Grid container>
    <Grid
      item
      xs={12}
      style={{ backgroundColor: 'orange', height: '50px' }}
    />
  </Grid>
</Grid> */
}
