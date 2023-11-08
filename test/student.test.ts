import request from 'supertest';
import {app} from '../src/index';
import dbObj from './db/db'

describe('get all students if authorize only', () => {
    test('get user with auth', async () => {
        await request(app).get('/students/')
        .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
        .expect(200)
    })
    test('get user without auth', async () => {
        await request(app).get('/students/')
        .set('Authorization', `Bearer ${dbObj.studentOne.authToken}`)
        .expect(403)
    })
})

describe('get  students by id if authorize only', () => {
    test('get user with auth', async () => {
        await request(app).get('/students/654b1e1270bc0fe2094b7c7c')
        .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
        .expect(200)
    })
    test('get user without auth', async () => {
        await request(app).get('/students/654b1e1270bc0fe2094b7c7c')
        .set('Authorization', `Bearer ${dbObj.studentOne.authToken}`)
        .expect(403)
    })
})

describe('add  students authorize only', () => {
    // test('get user with auth', async () => {
    //     await request(app).post('/students/signup')
    //     .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
    //     .send(dbObj.studentThree)
    //     .expect(201)
    // })
    test('add user without auth', async () => {
        await request(app).post('/students/signup')
        .set('Authorization', `Bearer ${dbObj.studentOne.authToken}`)
        .send(dbObj.studentTwo)
        .expect(403)
    })
})

describe('update  students authorize only', () => {
    test('get user with auth', async () => {
        await request(app).patch('/students/update/654b25e847641633d5cce9b2')
        .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
        .send({
            name: 'Bhado'
        })
        .expect(200)
    })
    test('update user without auth', async () => {
        await request(app).patch('/students/update/654b25e847641633d5cce9b2')
        .set('Authorization', `Bearer ${dbObj.studentOne.authToken}`)
        .send({
            name: "Bhado"
        })
        .expect(403)
    })
})
describe('delete  students authorize only', () => {
    test('delete student without auth', async () => {
        await request(app).delete('/students/delete/654b25e847641633d5cce9b2')
        .set('Authorization', `Bearer ${dbObj.studentOne.authToken}`)
       
        .expect(403)
    })
    test('delete student with auth', async () => {
        await request(app).delete('/students/delete/654b25e847641633d5cce9b2')
        .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
       
        .expect(200)
    })
   
})

