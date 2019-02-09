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
            res.status(201).json(game);
    }   else {
        res.status(422).json({error: 'Please include a title and genre'});
    }
})

module.exports = server
