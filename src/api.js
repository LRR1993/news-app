/* eslint-disable no-console */
import axios from 'axios';

const BASE_URL = `http://nc-news-letisha.herokuapp.com/api/`;

export const updateVote = async (inc_votes, id, comments) => {
  if (!comments) {
    const {
      data: { article }
    } = await axios.patch(`${BASE_URL}articles/${id}`, { inc_votes });
    return article.votes;
  }
  const {
    data: { comment }
  } = await axios
    .patch(`${BASE_URL}${comments}/${id}`, { inc_votes })
    .catch(err => console.log(err));
  return comment.votes;
};

export const fetchUser = async username => {
  const {
    data: { user }
  } = await axios.get(`${BASE_URL}users/${username}`);
  return user;
};

export const addUser = async newUser => {
  const {
    data: { user }
  } = await axios.post(`${BASE_URL}users/`, newUser);
  return user;
};

export const fetchTopic = async () => {
  const {
    data: { topics }
  } = await axios.get(`${BASE_URL}topics`).catch(err => console.log(err));
  return topics;
};

export const fetchArticle = async articleId => {
  const {
    data: { article }
  } = await axios
    .get(`${BASE_URL}articles/${articleId}`)
    .catch(err => console.log(err));
  return article;
};

export const fetchComments = async (articleId, query) => {
  const {
    data: { comments }
  } = await axios
    .get(`${BASE_URL}articles/${articleId}/comments`, {
      params: query
    })
    .catch(err => console.log(err));
  return comments;
};

export const fetchArticles = async query => {
  const {
    data: { articles }
  } = await axios
    .get(`${BASE_URL}articles`, {
      params: query
    })
    .catch(err => console.log(err));
  // console.log(articles);
  return articles;
};

export const addTopic = async body => {
  console.log('body', body);
  const {
    data: { topic },
    data
  } = await axios
    .post(`${BASE_URL}topics`, body)
    .catch(err => console.log(err));
  console.log(data);
  return topic;
};

export const addComment = async (id, body) => {
  const {
    data: { comment }
  } = await axios
    .post(`${BASE_URL}articles/${id}/comments`, body)
    .catch(err => console.log(err));
  // console.log(data)
  return comment;
};

export const addArticle = async body => {
  const {
    data: { article },
    data
  } = await axios
    .post(`${BASE_URL}articles/`, body)
    .catch(err => console.log(err));
  console.log(data);
  return article;
};

export const deleteComment = async id => {
  await axios
    .delete(`${BASE_URL}/comments/${id}`)
    .catch(err => console.log(err));
};

export const deleteArticle = async id => {
  await axios
    .delete(`${BASE_URL}/articles/${id}`)
    .catch(err => console.log(err));
};
