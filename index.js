const express = require('express');
const app = express();
const getRoutes = require('./routes/getRoutes');
const postRoutes = require('./routes/postRoutes');
const putRoutes = require('./routes/putRoutes');
const deleteRoutes = require('./routes/deleteRoutes');

app.set('port', 8080);

app.use('/get', getRoutes);

app.use('/post', postRoutes);
app.use('/put', putRoutes);
app.use('/delete', deleteRoutes);

app.listen(
  app.get('port'),
  () => console.log(`Server listening on ${app.get('port')}`)
);