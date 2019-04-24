import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchArticle, fetchComments } from '../api';
import Comments from '../components/Comments';
import { PushSpinner } from 'react-spinners-kit';

const styles = theme => ({
  layout: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    height: 300,
    // background: 'blue',
    margin: '10px'
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
    const { article, loading, comments } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {loading ? (
          <Grid
          container
            className={classes.loading}
            spacing={24}
            direction="row"
            justify="center"
            alignItems="center"
            alignContent="flex-end"
          >
            <Grid item>
              <Typography variant="h4" color="primary">Loading</Typography>
            </Grid>
            <Grid item>
              <PushSpinner size={100} color="#686769" loading={loading} />
            </Grid>
          </Grid>
        ) : (
          <Grid container className={classes.layout} spacing={16}>
            <Card article={article} disabled="disabled" />
            <Comments comments={comments} />
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
