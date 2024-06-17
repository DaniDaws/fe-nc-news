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

export const getArticles = () => {
  return api.get("/articles").then((response) => response.data.articles);
};
