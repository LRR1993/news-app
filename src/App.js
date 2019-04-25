import React, { Component } from 'react';
import { Router } from '@reach/router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';
import MainBar from './views/MainBar';
import Drawer from './components/Drawer';
import Articles from './views/Articles';
import ArticleAndComments from './views/ArticleAndComments';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import { fetchUser, fetchTopic} from './api'

class App extends Component {
  state = {
    loggedIn: false,
    user: {},
    topics: [],
  };

  logout = () => {
    this.setState(state => ({ loggedIn: !state.loggedIn, user: {} }));
  };

  componentDidMount = async () => {
    const user = await fetchUser();
    const topics = await fetchTopic();
    this.setState({ user, topics });
  };

  render() {
    const {
      user,
      loggedIn,
      topics,
      anchorEl,
    } = this.state;

    const ArticlesRoutes = () => (
      <div>
        <Router>
          <Articles path="/" />
          <ArticleAndComments path="/:article_id" />
          <Articles path="/topic/:topic" />
        </Router>
      </div>
    );

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
          <ArticlesRoutes path="/articles/*" />
          <SignIn path="/signin" />
          <SignUp path="/signup" />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;

