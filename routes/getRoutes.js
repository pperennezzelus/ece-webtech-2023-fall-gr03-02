const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/hello/:name', (req, res) => {
  res.send("Hello " + req.params.name)
})

router.get('/articles', (req, res) => {
  res.json(db)
})

router.get('/articles/:articleId', (req, res) => {
  const id = req.params.articleId

  const article = db.articles.find((article) => article.id === id)

  if (!article) {
    res.status(404).json({ error: 'Article not found' })
  } else {
    res.json(article)
  }
})

router.get('/articles/:articleId/comment', (req, res) => {
  const id = req.params.articleId

  const comment = db.comments.find((comment) => comment.articleId === id)

  if (!comment) {
    res.status(404).json({ error: 'Article not found' })
  } else {
    res.json(comment)
  }
})

module.exports = router
