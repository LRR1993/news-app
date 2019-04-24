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

class Articles extends Component {
  state = {
    articles: []
  };
  learnMore = () => {};
  fetchArticles = async () => {
    const returned = await axios.get(
      `https://nc-news-letisha.herokuapp.com/api/articles`
    );
    return returned.data.articles;
  };
  componentDidMount = async () => {
    const articles = await this.fetchArticles();
    this.setState({ articles });
  };
  render() {
    const { articles } = this.state;
    const { classes } = this.props;
    return (
      <Grid container className={classes.layout} spacing={16}>
        {articles.map(article => (
          <Card key={article.article_id} article={article} learnMore={this.learnMore}/>
        ))}
      </Grid>
    );
  }
}
Articles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Articles);
