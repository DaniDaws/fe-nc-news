import axios from "axios";

const api = axios.create({
  baseURL: "https://be-nc-news-r6yn.onrender.com/api",
});

export const getArticleById = (articleId) => {
  return api
    .get(`/articles/${articleId}`)
    .then((response) => response.data.article);
};

export const getCommentsByArticleId = (articleId) => {
  return api
    .get(`/articles/${articleId}/comments`)
    .then((response) => response.data.comments);
};

export const patchArticleVotes = (articleId, incVotes) => {
  return api
    .patch(`/articles/${articleId}`, { newVotes: incVotes })
    .then((response) => response.data.article);
};

export const getArticles = (topic, sortBy = "created_at", order = "desc") => {
  let url = `/articles?sort_by=${sortBy}&order=${order}`;
  if (topic) {
    url += `&topic=${topic}`;
  }
  return api.get(url).then((response) => response.data.articles);
};

export const postComment = (articleId, comment) => {
  return api
    .post(`/articles/${articleId}/comments`, comment)
    .then((response) => response.data.comment);
};

export const deleteComment = (commentId) => {
  return api.delete(`/comments/${commentId}`);
};

export const getTopics = () => {
  return api.get("/topics").then((response) => response.data.topics);
};
