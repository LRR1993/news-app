import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchArticle, fetchComments } from '../api';
import Comments from '../components/Comments';

const styles = theme => ({
  layout: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ArticleAndComments extends Component {
  state = {
    article: {},
    loading: true,
    comments: []
  };

  componentDidMount = async () => {
    const article = await fetchArticle(this.props.article_id);
    const comments = await fetchComments(this.props.article_id);
    this.setState({ article, comments, loading: false });
  };
  render() {
    const { article, loading, comments} = this.state;
    const { classes } = this.props;
    return (
      <div>
        {loading ? (
          <p>Loading ...</p>
        ) : (
          <Grid container className={classes.layout} spacing={16}>
            <Card article={article} disabled="disabled" />
              <Comments comments={comments}/>
          </Grid>
        )}
      </div>
    );
  }
}

ArticleAndComments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ArticleAndComments);
