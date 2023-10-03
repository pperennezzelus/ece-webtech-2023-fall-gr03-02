const express = require('express')
const router = express.Router()
const db = require('./db')
const { v4: uuidv4 } = require('uuid')
 
router.use(express.json())

router.post('/articles', (req, res) => {
  const id = uuidv4();
  const {title, content, date, author } = req.body;
  const newArticle = {
    title,
    content,
    date,
    author,
  }

  db.articles.push(newArticle);
  res.status(201).json(newArticle);
})

  router.post('/articles/:articleId/comments', (req, res) => {

    const timestamp = Date.now()
    const id = uuidv4();
    const { content, articleId, author} = req.params;
    const newComment = {
        content,
        articleId,
        author,
      }

    db.comments.push(newComment);
    res.status(201).json(newComment);
  })
  
  module.exports = router