const express = require('express');
const router = express.Router();

router.get('/hello/:name', (req, res) => {
  res.send("Hello " + req.params.name);
});


module.exports = router;
