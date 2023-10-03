const express = require('express')
const router = express.Router()
const db = require('../database')
const { v4: uuidv4 } = require('uuid');

router.use(express.json())

router.post('/articles', (req, res) => {
  
  const {title, content, date, author } = req.body
  const id = uuidv4()
  const newArticle = {
    id,
    title,
    content,
    date,
    author,
  }

  db.articles.push(newArticle)
  res.status(201).json(newArticle)
})

router.post('/articles/:articleId/comments', (req, res) => {
  
  const {content, author } = req.body
  const id = uuidv4()
  const articleId = req.params.articleId
  const timestamp = Date.now()
  const newComment = {
    id,
    timestamp,
    content,
    articleId,
    author,
  }

  db.comments.push(newComment)
  res.status(201).json(newComment)
})

module.exports = router
