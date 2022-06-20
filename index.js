const express = require('express')
    , app = express();

const crystal = require('./src/crystal.json');

const PORT = process.env.PORT || 8008;

app.get('/:name', (req, res) => {
    if (!req.params || !req.params['name'])
        res.status(400).send({error: 'crystal not provided'});
    
    const name = req.params['name'];
    res.send(crystal[name]);
});

app.get(['/', '*'], (req, res) => {
    res.status(404).send({error: 'not found'})
});

app.listen(PORT, () => {
    console.log(`watching on ${PORT}`);
})