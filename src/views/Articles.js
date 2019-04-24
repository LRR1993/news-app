import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchArticles } from '../api';

const styles = theme => ({
  layout: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});

class Articles extends Component {
  state = {
    articles: []
  };
  learnMore = () => {};

  componentDidMount = async () => {
    const articles = await fetchArticles();
    this.setState({ articles });
  };

  filterTaskList = taskToFilter => {
    this.setState(state => {
      return {
        selectedCategory: taskToFilter
      };
    });
  };

  render() {
    const { articles } = this.state;
    const { classes, topic } = this.props;
    return (
      <Grid container className={classes.layout} spacing={16}>
        {articles.map(article => (
          <Card
            key={article.article_id}
            article={article}
            learnMore={this.learnMore}
          />
        ))}
      </Grid>
    );
  }
}
Articles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Articles);
