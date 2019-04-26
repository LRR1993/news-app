import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchArticle, fetchComments } from '../api';
import Comments from '../components/Comments';
import { PushSpinner } from 'react-spinners-kit';
import { navigate } from '@reach/router';
import Loading from '../components/Loading';
import { AuthConsumer } from '../context';

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

  handleDelete = id => {
    const updatedComments = this.state.comments.filter(
      comment => comment.comment_id !== id
    );
    this.setState({ comments: updatedComments });
  };

  handleArticleDelete = () => {
    setTimeout(() => navigate('/articles', { replace: true }), 2000);
  };

  componentDidMount = async () => {
    const article = await fetchArticle(this.props.article_id);
    const comments = await fetchComments(this.props.article_id);
    this.setState({ article, comments, loading: false });
  };

  render() {
    // console.log('state', this.state)
    const { article, loading, comments } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <Grid container className={classes.layout} spacing={16}>
            <Card
              article={article}
              handleArticleDelete={this.handleArticleDelete}
              disabled="disabled"
            />
            <Comments
              comments={comments}
              handleDelete={this.handleDelete}
            />
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
