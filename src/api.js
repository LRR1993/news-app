import axios from 'axios';

const BASE_URL = `http://nc-news-letisha.herokuapp.com/api/`;

export const updateVote = async (inc_votes, id, comments) => {
  if (!comments) {
    const {
      data: { article }
    } = await axios.patch(`${BASE_URL}articles/${id}`, { inc_votes });
    return article.votes;
  } else {
    const {
      data: { comment }
    } = await axios.patch(`${BASE_URL}${comments}/${id}`, { inc_votes });
    return comment.votes;
  }
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

export const addComment = async (id, body) => {
  const {
    data: { article }
  } = await axios.post(`${BASE_URL}articles/${id}/comment`, body);
  return article;
};

export const deleteComment = async (id) => {
  await axios.delete(`${BASE_URL}/comments/${id}`)
}

