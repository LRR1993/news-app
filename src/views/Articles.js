import React, { Component } from 'react';
import Card from '../components/Card';
import { Grid } from '@material-ui/core';

const axios = require('axios');

class Articles extends Component {
  state = {
    articles: []
  };
  fetchArticles = async () => {
    const returned = await axios.get(
      `https://nc-news-letisha.herokuapp.com/api/articles`
    );
    return returned.data.articles;
  };
  componentDidMount = async () => {
    const articles = await this.fetchArticles();
    this.setState({ articles });
  };
  render() {
    const { articles } = this.state;
    return (
      <Grid container spacing={8}>
        {articles.map(article => (
          <Card />
        ))}
      </Grid>
    );
  }
}

export default Articles;
