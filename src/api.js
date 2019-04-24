import axios from 'axios';

const BASE_URL = `http://nc-news-letisha.herokuapp.com/api/`;

export const updateVote = async(inc_votes, id) => {
  const { data } = await axios.patch(`${BASE_URL}articles/${id}`, {inc_votes});
};
export const fetchUser = async () => {
  const {
    data: { users }
  } = await axios.get(`${BASE_URL}users`);
  return users[5]; // remeber to change when logged in page updated
};

export const fetchTopic = async () => {
  const {
    data: { topics }
  } = await axios.get(`${BASE_URL}topics`);
  return topics;
};

export const fetchArticle = async articleId => {
  const {
    data: { article }
  } = await axios.get(`${BASE_URL}articles/${articleId}`);
  return article;
};
export const fetchComments = async articleId => {
  const {
    data: { comments }
  } = await axios.get(`${BASE_URL}articles/${articleId}/comments`);
  return comments;
};

export const fetchArticles = async () => {
  const {
    data: { articles }
  } = await axios.get(`${BASE_URL}articles`);
  return articles;
};
