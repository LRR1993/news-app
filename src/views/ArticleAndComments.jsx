/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import { fetchArticle, fetchComments, addComment } from '../api';
import Comments from '../components/Comments';
import Card from '../components/Card';
import Loading from '../components/Loading';

const styles = () => ({
  layout: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    height: 300,
    margin: '10px'
  }
});

const criteria = [
  { value: 'Latest Comments', query: { sort_by: 'created_at' } },
  { value: 'Older Comments', query: { sort_by: 'created_at', order: 'asc' } },
  { value: 'Most Popular', query: { sort_by: 'votes' } },
  { value: 'Least Popular', query: { sort_by: 'votes', order: 'asc' } }
];

class ArticleAndComments extends Component {
  state = {
    article: {},
    loading: true,
    comments: [],
    sort: 'Latest Comments',
    commentDialog: false
  };

  handleCommentOpen = () => {
    this.setState({ commentDialog: true });
  };

  handleCommentClose = () => {
    this.setState({ commentDialog: false });
  };

  postComment = async values => {
    const { comments } = this.state;
    const { id, ...restValues } = values;
    const newComment = await addComment(id, { ...restValues });
    const { article_id, ...remaining } = newComment;
    const updated = [{ ...remaining }, ...comments];
    this.setState({ comments: updated }, async () => {
      const article = await fetchArticle(this.props.article_id);
      this.setState({
        article
      });
    });
    this.handleCommentClose();
  };

  handleChange = name => async event => {
    const { article_id } = this.props;
    this.setState(
      {
        [name]: event.target.value
      },
      async () => {
        const sort = criteria.filter(item => {
          return item.value === this.state.sort;
        });
        const [param] = sort;
        const comments = await fetchComments(article_id, param.query);
        this.setState({ comments });
      }
    );
  };

  handleDelete = id => {
    const { comments } = this.state;
    const updatedComments = comments.filter(
      comment => comment.comment_id !== id
    );
    this.setState({ comments: updatedComments });
  };

  handleArticleDelete = () => {
    setTimeout(() => navigate('/articles', { replace: true }), 2000);
  };

  componentDidMount = async () => {
    const { article_id } = this.props;
    const article = await fetchArticle(article_id).catch(err => {
      navigate('/error', {
        replace: true,
        state: {
          code: err.code,
          message: err.message,
          from: `/articles/${article_id}`
        }
      });
    });
    const comments = await fetchComments(article_id).catch(err => {
      navigate('/error', {
        replace: true,
        state: {
          code: err.code,
          message: err.message,
          from: `/articles/${article_id}`
        }
      });
    });
    this.setState({ article, comments, loading: false });
  };

  render() {
    const { article, loading, comments, sort, commentDialog } = this.state;
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
              handleChange={this.handleChange}
              sort={sort}
              criteria={criteria}
              postComment={this.postComment}
              articleId={article.article_id}
              commentDialog={commentDialog}
              handleCommentOpen={this.handleCommentOpen}
              handleCommentClose={this.handleCommentClose}
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
