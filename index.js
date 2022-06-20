const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , pug = require('pug')
    , morgan = require('morgan');

const crystal = require('./src/crystal.json');

const PORT = process.env.PORT || 8008;

// config
app.use(bodyParser.urlencoded({extended: true}));  
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'pug');
app.use(morgan('tiny'));

app.get('/web/search', (req, res) => {
    res.render('index', {crystals: crystal});
});

app.get('/web/:crystal', (req, res) => {
    if (!req.params || !req.params['crystal'])
        return res.status(400).send({error: 'crystal not provided'});

    const query = req.params['crystal'];

    res.render('crystal', {query: query, result: crystal[query]});
});

app.post('/api/search', (req, res) => {
    if (!req.body || !req.body.query)
        return res.status(400).send({error: 'crystal not provided'});
    
    const query = req.body.query;
    const result = crystal[query];
    res.render('crystal', {query: query, result: result})
});

app.get('/api/crystals', (req, res) => {
    res.json(crystal);
});

// /api/:amethyst
app.get('/api/:name', (req, res) => {
    if (!req.params || !req.params['name'])
        return res.status(400).send({error: 'crystal not provided'});
    
    const name = req.params['name'];
    res.json(crystal[name]);
});

app.get('/', (req, res) => {
    res.status(400).send({'error': 'params not provider'});
});

app.get('*', (req, res) => {
    res.status(404).send({error: 'not found'})
});

app.listen(PORT, () => {
    console.log(`watching on ${PORT}`);
});

