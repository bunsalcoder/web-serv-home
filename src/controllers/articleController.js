const articles = require('../models/articles') || [];
const Response = require('../responseBody/Response');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllArticleController = async (req, res) => {
  try {
    const articles = await prisma.article.findMany();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
};

const createNewArticleController = (req, res) => {
  const body = req.body;
  const { title, content } = body;
  const newArticle = {
    id: articles.length + 1,
    title,
    content,
  };
  articles.push(newArticle);
  res.send(newArticle);
};

const getArticleByIdController = (req, res) => {
  try {
    const { params } = req;

    const { id } = params;
    const foundArticles = articles.filter((article) => {
      return article.id == id;
    });
    new Response(res).setResponse(foundArticles[0]).send();
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const updateArticleByIdController = (req, res) => {
  try {
    const { params, body } = req;
    const { id } = params;

    const foundIndex = articles.findIndex((article) => {
      return article.id == id;
    });

    if (foundIndex < 0) {
      new Response(res).setStatusCode(404).setCustomCode(10001).send();
    } else {
      articles[foundIndex] = {
        ...articles[foundIndex],
        ...body,
      };
      new Response(res).setResponse(articles[foundIndex]).send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const deleteArticleByIdController = (req, res) => {
  try {
    const { params } = req;
    const { id } = params;

    const foundIndex = articles.findIndex((article) => {
      return article.id == id;
    });

    if (foundIndex < 0) {
      new Response(res).setStatusCode(404).setCustomCode(10001).send();
    } else {
      articles.splice(foundIndex, 1);
      new Response(res).setResponse({}).send();
    }
  } catch (error) {
    console.log(error);
    new Response(res).setStatusCode(500).setCustomCode(10000).send();
  }
};

const filterArticles = (articles, filters) => {
  const { created_by, is_published, title, content } = filters;

  return articles.filter((article) => {
    let matches = true;
    if (created_by) {
      matches =
        matches &&
        article.created_by.toLowerCase() === created_by.toLowerCase();
    }
    if (is_published !== undefined) {
      const isPublishedBool = is_published.toLowerCase() === 'true';
      matches = matches && article.is_published === isPublishedBool;
    }
    if (title) {
      matches =
        matches && article.title.toLowerCase().includes(title.toLowerCase());
    }
    if (content) {
      matches =
        matches &&
        article.content.toLowerCase().includes(content.toLowerCase());
    }
    return matches;
  });
};
const getArticleByFilterSearch = (req, res) => {
  try {
    const { created_by, is_published, title, content } = req.query;
    console.log(created_by, is_published, title, content);

    const filters = { created_by, is_published, title, content };
    const filteredArticles = filterArticles(articles, filters);

    res.json(filteredArticles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error', code: 10000 });
  }
};

const getArticleByPageController = (req, res) => {
  const { query } = req;

  const limit = parseInt(query.limit, 10) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const resultArticles = articles.slice(startIndex, endIndex);

  new Response(res).setResponse(resultArticles).send();
};

module.exports = {
  getAllArticleController,
  createNewArticleController,
  getArticleByIdController,
  updateArticleByIdController,
  deleteArticleByIdController,
  getArticleByPageController,
  getArticleByFilterSearch,
};
