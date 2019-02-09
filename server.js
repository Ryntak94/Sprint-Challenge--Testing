const express = require('express');
const server = express();
const parser = express.json();
const PORT = "4000";
const dbConfig = require('./knexfile');
const knex = require('knex');
const db = knex(dbConfig.development);
server.use(express.json());

module.exports = server
