import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { navigate } from '@reach/router';
import { fetchArticles, addArticle } from '../api';
import Card from '../components/Card';
import PostArticle from '../components/PostArticle';
import AuthConsumer from '../context';
import PostTopic from '../components/PostTopic';

const styles = () => ({
  layout: {
    justifyContent: 'center',
    alignItems: 'flex-start'
    // marginBottom: theme.spacing.unit * 8
  },
  sort: {
    height: '125px',
    paddingRight: '75px',
    paddingLeft: '75px'
  }
});

const criteria = [
  { value: 'Latest Articles', query: { sort_by: 'created_at' } },
  { value: 'Older Articles', query: { sort_by: 'created_at', order: 'asc' } },
  { value: 'Most Popular', query: { sort_by: 'votes' } },
  { value: 'Least Popular', query: { sort_by: 'votes', order: 'asc' } },
  { value: 'Most Comments', query: { sort_by: 'comment_count' } },
  { value: 'Least Comments', query: { sort_by: 'comment_count', order: 'asc' } }
];

class Articles extends Component {
  static contextType = AuthConsumer;

  state = {
    articles: [],
    sort: 'Latest Articles',
    ArticleDialog: false
  };

  componentDidMount = async () => {
    const articles = await fetchArticles().catch(err => {
      navigate('/error', {
        replace: true,
        state: {
          code: err.code,
          message: err.message,
          from: '/articles'
        }
      });
    });
    this.setState({ articles });
  };

  handleArticleOpen = () => {
    this.setState({ ArticleDialog: true });
    // console.log('clicked')
  };

  handleArticleClose = () => {
    this.setState({ ArticleDialog: false });
  };

  postArticle = async values => {
    const newArticle = await addArticle(values);
    const updated = [newArticle, ...this.state.articles];
    this.setState({ articles: updated });
    this.handleArticleClose();
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
        const articles = await fetchArticles(param.query);
        this.setState({ articles });
      }
    );
  };

  render() {
    const { articles, ArticleDialog } = this.state;
    const {
      classes,
      topic,
      topics,
      location: { pathname },
      topicDialog,
      handleTopicOpen,
      handleTopicClose,
      postTopic
    } = this.props;
    const { isAuth } = this.context;
    // console.log(this.state.articles);
    return (
      <React.Fragment>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.sort}
        >
          <TextField
            id="sort"
            select
            label="Select"
            className={classes.textField}
            value={this.state.sort}
            onChange={this.handleChange('sort')}
            SelectProps={{
              native: false,
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="sort articles by"
            margin="normal"
            variant="outlined"
          >
            {criteria.map(option => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </TextField>
          {isAuth && (
            <Grid item>
              <PostTopic
                topicDialog={topicDialog}
                handleTopicOpen={handleTopicOpen}
                handleTopicClose={handleTopicClose}
                postTopic={postTopic}
              />
              <PostArticle
                postArticle={this.postArticle}
                handleArticleOpen={this.handleArticleOpen}
                handleArticleClose={this.handleArticleClose}
                ArticleDialog={ArticleDialog}
                topics={topics}
              />
            </Grid>
          )}
        </Grid>
        <Grid container className={classes.layout} spacing={16}>
          {articles.map(article =>
            topic === article.topic || pathname === '/articles' ? (
              <Card
                key={article.article_id}
                article={article}
                learnMore={this.learnMore}
              />
            ) : null
          )}
        </Grid>
      </React.Fragment>
    );
  }
}
Articles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Articles);
