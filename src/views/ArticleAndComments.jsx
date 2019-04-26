import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import { fetchArticle, fetchComments, addComment } from '../api';
import Comments from '../components/Comments';
import Card from '../components/Card';
import Loading from '../components/Loading';

const styles = () => ({
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
    const { comments } = this.state;
    const { id, ...restValues } = values;
    const newComment = await addComment(id, { ...restValues });
    const { article_id, ...remaining } = newComment;
    const updated = [{ ...remaining }, ...comments];
    this.setState({ comments: updated });
  };

  handleChange = name => async event => {
    const { sort } = this.state;
    const { article_id } = this.props;
    this.setState(
      {
        [name]: event.target.value
      },
      async () => {
        const sorted = criteria.filter(item => {
          return item.value === sort;
        });
        const [param] = sorted;
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
    const article = await fetchArticle(article_id);
    const comments = await fetchComments(article_id);
    this.setState({ article, comments, loading: false });
  };

  render() {
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
  classes: PropTypes.shape('object').isRequired,
  article_id: PropTypes.number.isRequired
};

export default withStyles(styles)(ArticleAndComments);
