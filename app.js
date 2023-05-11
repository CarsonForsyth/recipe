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

app.get('/api/postRecipe', (req, res) => {
    const recipe = new Recipe({
        name: req.body.name,
        author: req.body.author,
        timestamp: new Date(),
        public: req.body.public,
        categories: req.body.categories,
        prepTime: req.body.prepTime,
        cookTime: req.body.cookTime,
        sections: req.body.sections,
        servingSuggestions: req.body.servingSuggestions,
        variations: req.body.variations
    });
    recipe.save()
        .then(result => {
            res.status(201).json({
                message: 'Recipe created successfully',
                createdRecipe: {
                    name: result.name,
                    author: result.author,
                    timestamp: result.timestamp,
                    public: result.public,
                    categories: result.categories,
                    prepTime: result.prepTime,
                    cookTime: result.cookTime,
                    sections: result.sections,
                    servingSuggestions: result.servingSuggestions,
                    variations: result.variations
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

