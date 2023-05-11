const express = require('express');
const path = require('path')
const app = express();

const publicPath = path.join(__dirname, 'public');
app.use('/public', express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, '/index.html'));
});

app.get('/recipeCreator', (req, res) => {
    res.sendFile(path.join(publicPath, '/recipeCreator.html'));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

