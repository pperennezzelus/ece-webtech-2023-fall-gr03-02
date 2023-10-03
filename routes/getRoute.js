const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/articles', (req, res) => {
    res.json(db)
  })

  router.get('/articles/:articleId', (req, res) => {
    const { articleId } = req.params;
    const article = db.articles.find((a) => a.id === articleId)
  
    if (article) {
      res.json(article)
    } else {
      res.status(404).json({ error: 'Article not found' })
    }
  })


  router.get('/articles/:articleId/comments', (req, res) => {
    const { articleId } = req.params
    const comments = db.comments.find((comment) => comment.articleId === articleId)
    

    if (comment) {
      res.json(comment)
    } else {
      res.status(404).json({ error: 'Article not found' })
    }
  })
  

module.exports = router;