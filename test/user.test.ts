import request from 'supertest';
import {app} from '../src/index';
import dbObj from './db/db'

describe('get all users if authorize only', () => {
    test('get user with auth', async () => {
        await request(app).get('/users/')
        .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
        .expect(200)
    })
    test('get user without auth', async () => {
        await request(app).get('/users/')
        .set('Authorization', `Bearer ${dbObj.studentOne.authToken}`)
        .expect(403)
    })
})

describe('get  users by id if authorize only', () => {
    test('get user with auth', async () => {
        await request(app).get('/users/654a0ec6853f3a59d8cdcdfa')
        .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
        .expect(200)
    })
    test('get user without auth', async () => {
        await request(app).get('/users/654b167d84c3d16b39827075')
        .set('Authorization', `Bearer ${dbObj.studentOne.authToken}`)
        .expect(403)
    })
})

describe('post users if authorize only', () => {
    // test('post user with auth', async () => {
    //     await request(app).post('/users/signup')
    //     .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
    //     .send(dbObj.staff)
    //     .expect(201)
    // })
    test('post user without auth', async () => {
        await request(app).post('/users/signup')
        .set('Authorization', `Bearer ${dbObj.staffOne.authToken}`)
        .send(dbObj.studentTwo)
        .expect(403)
    })
})

describe('update users if authorize only', () => {
    test('update user with auth', async () => {
        await request(app).patch('/users/update/654a0ec6853f3a59d8cdcdfa')
        .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
        .send({
            "designation": "peon"
        })
        .expect(200)
    })
    test('update user without auth', async () => {
        await request(app).patch('/users/update/654a0ec6853f3a59d8cdcdfb')
        .set('Authorization', `Bearer ${dbObj.staffOne.authToken}`)
        .send({
            "designation": "peon"
        })
        .expect(403)
    })
})



describe('delete users if authorize only', () => {
    
    test('delete user without auth', async () => {
        await request(app).delete('/users/delete/654a0ec6853f3a59d8cdcdfb')
        .set('Authorization', `Bearer ${dbObj.staffOne.authToken}`)
        .send({
            "designation": "peon"
        })
        .expect(403)
    })

    // test('delete user with auth', async () => {
    //     await request(app).delete('/users/delete/654a0ec6853f3a59d8cdcdfb')
    //     .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
    //     .send({
    //         "designation": "peon"
    //     })
    //     .expect(200)
    // })
})