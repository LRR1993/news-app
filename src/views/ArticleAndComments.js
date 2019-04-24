import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { fetchArticle } from '../api'

const styles = theme => ({
  layout: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class ArticleAndComments extends Component {
  state = {
    article: {
    }, loading: true
  };

  componentDidMount = async () => {
    const article = await fetchArticle(this.props.article_id);
    this.setState({ article, loading: false });
  };
  render() {
    const { article, loading } = this.state;
    const { classes } = this.props;
    return (
      <div>
        {loading? <p>Loading ...</p>:<Grid container className={classes.layout} spacing={16}>
          <Card article={article} disabled='disabled'/>
        </Grid>}
      </div>
    );
  }
}

ArticleAndComments.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ArticleAndComments);
