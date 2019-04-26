import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchArticle, fetchComments, addComment } from '../api';
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
    sort: 'Latest Comments'
  };

  postComment = async values => {
    const { id, ...restValues } = values;
    const newComment = await addComment(id, { ...restValues });
    const { article_id, ...remaining } = newComment
    const updated = [{...remaining}, ...this.state.comments];
    this.setState({ comments: updated });
  };

  handleChange = name => async event => {
    this.setState(
      {
        [name]: event.target.value
      },
      async () => {
        const sort = criteria.filter(item => {
          return item.value === this.state.sort;
        });
        const [param] = sort;
        const comments = await fetchComments(
          this.props.article_id,
          param.query
        );
        this.setState({ comments });
      }
    );
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
    console.log('state', this.state.comments);
    const { article, loading, comments, sort } = this.state;
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
