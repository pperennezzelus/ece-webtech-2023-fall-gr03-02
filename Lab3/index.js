const express = require('express');
const app = express();

const getRouter = require('./routes/getRoute.js');
const deleteRouter = require('./routes/deleteRoute.js');
const putRouter = require('./routes/putRoute.js');
const postRouter = require('./routes/postRoute.js');

app.set('port', 8080);

app.use('/get', getRouter);
app.use('/delete', deleteRouter);
app.use('/put', putRouter);
app.use('/post', postRouter);

app.listen(app.get('port'), () => {
  console.log(`Server is listening on ${app.get('port')}`);
});
