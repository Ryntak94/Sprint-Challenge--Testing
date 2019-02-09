const express = require('express');
const server = express();
const parser = express.json();
const PORT = "4000";
const dbConfig = require('./knexfile');
const knex = require('knex');
const db = knex(dbConfig.development);
server.use(express.json());

server.post('/games',   async   (req, res)  =>  {
    const game = req.body;
    if(game.title && game.genre)    {
            const response = await db('games').insert(game)
            res.status(201).json(response);
    }   else {
        res.status(422).json({error: 'Please include a title and genre'});
    }
})

server.get('/', async   (req, res)  =>  {
    const response = await db('games');
    res.status(200).json(response);
})

module.exports = server
