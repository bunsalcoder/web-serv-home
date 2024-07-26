const express = require('express');
const articleRoutes = express.Router();

const articleController = require('../controllers/articleController');

articleRoutes.get('/articles', articleController.getAllArticleController);
articleRoutes.get(
  '/articles/sort',
  articleController.getArticleByPageController
);
articleRoutes.get(
  '/articles/search',
  articleController.getArticleByFilterSearch
);
articleRoutes.get('/articles/:id', articleController.getArticleByIdController);
articleRoutes.post('/articles', articleController.createNewArticleController);
articleRoutes.put(
  '/articles/:id',
  articleController.updateArticleByIdController
);
articleRoutes.delete(
  '/articles/:id',
  articleController.deleteArticleByIdController
);

module.exports = articleRoutes;
