const request = require('supertest')

const server = require('./server.js');

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
        expect(response.json.length).toEqual(1);
        expect(response.json[0]).toEqual(1);
})
