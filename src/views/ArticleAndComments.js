import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const axios = require('axios');

const styles = theme => ({
  layout: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ArticleAndComments extends Component {
  state = {
    article: {
      title: 'Running a Node App',
      topic: 'coding',
      author: 'jessjelly',
      body:
        'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
      created_at: '2016-08-18T12:07:52.389Z',
      votes: 0,
      article_id: 1,
      comment_count: '8'
    },
    articleId: +this.props.article_id
  };

  fetchArticle = async () => {
    const returned = await axios.get(
      `https://nc-news-letisha.herokuapp.com/api/articles/${
        this.state.articleId
      }`
    );
    return returned.data.article;
  };
  componentDidMount = async () => {
    const article = await this.fetchArticle();
    this.setState({ article });
  };
  render() {
    console.log(this.state);
    const { article } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.layout} spacing={16}>
          <Card article={article} disabled='disabled'/>
        </Grid>
      </div>
    );
  }
}

ArticleAndComments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ArticleAndComments);
