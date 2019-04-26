import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchArticles } from '../api';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  layout: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  sort: {
    backgroundColor: '#f5f5f5',
    height: '125px',
    paddingRight: '75px',
    justifyContent: 'flex-end'
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
  state = {
    articles: [],
    sort: 'Latest Articles'
  };

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

  handleChange = name => async event => {
    this.setState({
      [name]: event.target.value
    }, async() => {
        const sort = criteria.filter(item => {
          return item.value === this.state.sort;
        });
        const [param] = sort;
        const articles = await fetchArticles(param.query);
        this.setState({ articles }); 
    });

  };

  render() {
    const { articles } = this.state;
    const {
      classes,
      topic,
      location: { pathname }
    } = this.props;
    console.log(this.state);
    return (
      <React.Fragment>
        <Grid container className={classes.sort}>
          <TextField
            id="sort"
            select
            label="Select"
            className={classes.textField}
            value={this.state.sort}
            onChange={ this.handleChange('sort')}
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
