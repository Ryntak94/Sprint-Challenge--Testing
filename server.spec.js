const request = require('supertest')

const server = require('./server.js');
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
            expect(response.json.length).toEqual(1);
            expect(response.json[0]).toEqual(1);
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
            const game1 =   { title: 'Pacman', genre: 'Arcade', year: 1980 };
            const game2 =   { title: 'Kingdom Hearts 3', genre: 'RPG', year: 2019 };
            await request(server).post('/games').send(game1);
            await request(server).post('/games').send(game2);
            const response = await request(server).get('/');
            console.log(response);
            expect(response.status).toBe(999);
        })
    });
})
