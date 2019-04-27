/* eslint-disable react/jsx-filename-extension */
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
import { fetchTopic, addTopic } from './api';
import AuthProvider from './components/Auth';

class App extends Component {
  state = {
    topics: [],
    topicDialog: false
  };

  handleTopicClose = () => {
    this.setState({ topicDialog: false });
  };

  handleTopicOpen = () => {
    // console.log('clicked');
    this.setState({ topicDialog: true });
  };

  postTopic = async values => {
    console.log(values);
    const newTopic = await addTopic(values);
    const updated = [newTopic, ...this.state.topics];
    this.setState({ topics: updated });
    this.handleTopicClose();
  };

  componentDidMount = async () => {
    const topics = await fetchTopic();
    this.setState({ topics });
  };

  render() {
    const { topics, topicDialog } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <MainBar topics={topics} />
          <Router>
            <Articles
              path="/articles"
              topics={topics}
              topicDialog={topicDialog}
              handleTopicClose={this.handleTopicClose}
              handleTopicOpen={this.handleTopicOpen}
              postTopic={this.postTopic}
            />
            <ArticleAndComments path="/articles/:article_id" />
            <Articles
              topics={topics}
              topicDialog={topicDialog}
              handleTopicClose={this.handleTopicClose}
              handleTopicOpen={this.handleTopicOpen}
              postTopic={this.postTopic}
              path="/articles/topic/:topic"
            />
            <SignIn path="/sign-in" />
            <SignUp path="/sign-up" />
          </Router>
        </AuthProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
