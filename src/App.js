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
import { fetchTopic } from './api';
import AuthProvider from './components/Auth';

class App extends Component {
  state = {
    topics: []
  };

  componentDidMount = async () => {
    const topics = await fetchTopic();
    this.setState({ topics });
  };

  render() {
    const { topics } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
          <CssBaseline />
        <AuthProvider>
          <MainBar
            topics={topics}
          />
          <Drawer />
          <Router>
            <Articles path="/articles" />
            <ArticleAndComments path="/articles/:article_id" />
            <Articles path="/articles/topic/:topic" />
            <SignIn path="/signin" />
            <SignUp path="/signup" />
          </Router>
        </AuthProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
