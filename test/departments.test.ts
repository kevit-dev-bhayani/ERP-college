import request from 'supertest';
import {app} from '../src/index';
import mongoose from "mongoose";
import dbObj from './db/db'

beforeEach(dbObj.setupDatabase)


// describe("add department", ()=>{
//     test('should add department to authorized user',async ()=>{
//         await request(app)
//         .post('/departments/new')
//         .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
//         .send(dbObj.departmentOne)
        
//         .expect(200)
//     })
// })

describe("add department", ()=>{
    test('should add department to authorized user',async ()=>{
        await request(app)
        .post('/departments/new')
        // .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
        .send(dbObj.departmentOne)
        
        .expect(401)
    })
})

describe("getDepartments", ()=>{
    test('should get all departments to authorized user',async ()=>{
        await request(app).get('/departments')
        .expect(401)
    })
})
// describe("getDepartments", ()=>{
//     test('should get all departments to authorized user',async ()=>{
//         await request(app).get('/departments')
//         .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
        
//         .expect(200)
//     })
// })

describe("getDepartments by id", ()=>{
    test('should get all departments to authorized user',async ()=>{
        await request(app).get('/departments/id/654a1f7cbf6dc50d476d0a03')
        // .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
        
        .expect(401)
    })
})
// describe("getDepartments by id", ()=>{
//     test('should get all departments to authorized user',async ()=>{
//         await request(app).get('/departments/id/654a1f7cbf6dc50d476d0a03')
//         .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
        
//         .expect(200)
//     })
// })

describe("update Department", ()=>{
    test("should not update department if not authorized", async ()=>{
        await request(app).patch(`/departments/update/654a1f7cbf6dc50d476d0a03`)
        
        .send({
            initial: 'abc'
        })
        .expect(401)
    })
})
// describe("update Department", ()=>{
//     test("should not update department if not authorized", async ()=>{
//         await request(app).patch(`/departments/update/654a1f7cbf6dc50d476d0a03`)
//         .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
//         .send({
//             initial: 'abc'
//         })
//         .expect(200)
//     })
// })

// describe("delete Department", ()=>{
//     test("should not delete department if not authorized", async ()=>{
//         await request(app).delete(`/departments/delete/654a1f7cbf6dc50d476d0a03`)
//         .set('Authorization', `Bearer ${dbObj.admin.authToken}`)
//         .send()
//         .expect(200)
//     })
// })
describe("delete Department", ()=>{
    test("should not delete department if not authorized", async ()=>{
        await request(app).delete(`/departments/delete/654a1f7cbf6dc50d476d0a03`)
        .send()
        .expect(401)
    })
})

