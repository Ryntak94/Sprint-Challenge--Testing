const request = require('supertest')

const server = require('./server.js');

const dbConfig = require('./knexfile');
const knex = require('knex');
const db = knex(dbConfig.development);

describe('the route handlers',  ()    =>    {
    describe('POST /games', ()  =>  {
        it('responds with 201', async   ()  =>  {
            const body = { title: 'Pacman', genre: 'Arcade', year: 1980 };
            const response = await request(server).post('/games').send(body);
            expect(response.status).toBe(201);
        });

        it('responds with 422', async   ()  =>  {
            const body = {};
            const response = await request(server).post('/games').send(body);
            expect(response.status).toBe(422);
        })

        it('responds with the id', async ()  =>  {
            const body  =   { title: 'Kingdom Hearts 3', genre: 'RPG', year: 2019 };
            const response = await request(server).post('/games').send(body);
            expect(response.text[0].length).toEqual(1)
        })

    });

    describe('GET /',   ()  =>  {

        it('responds with 200', async   ()  =>  {
            const response = await request(server).get('/');
            expect(response.status).toBe(200);
        });

        it('responds with json',    async   ()  =>  {
            const response = await request(server).get('/');
            expect(response.type).toBe('application/json');
        })

        it('responds with a list of games', async   ()  =>  {
            const response = await request(server).get('/');
            const responseLength = response.text.length >= 2 ? true : false;
            expect(responseLength).toBe(true);
            expect(response.body.constructor === Array).toBe(true);
        })
    });
})
