import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import fs from 'fs';
import {join}  from 'path';
import { Student } from '../../src/modules/students/student.model';
import { Department } from '../../src/modules/department/department.model';
import { User } from '../../src/modules/users/user.model';



const departmentOneId = new mongoose.Types.ObjectId();
const departmentOne = {
    '_id': departmentOneId,
    'name': 'Civil Engineering',
    'initial': 'CIV',
    'TotalSeats': 60,
    'occupiedSeats': 10,
    'batch': 2022
};
const privateKey = fs.readFileSync(join(__dirname, '../../keys/private.key'));
const studentOneId = new mongoose.Types.ObjectId();
const studentOne = {
    "_id": studentOneId,
            "name": "prince",
            "role": "STUDENT",
            "email": "prince@gmail.com",
            "mobile": 123,
            "password": "123",
            "department": departmentOneId,
            "sem": 7,
            'authToken': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRiMWUxMjcwYmMwZmUyMDk0YjdjN2MiLCJyb2xlIjoiU1RVREVOVCIsImlhdCI6MTY5OTQyMTcxNH0.eqR8DnDkPpYcs8-w8_JA65T64feF_SnZCdKAmx8rMKO4s_rd8OrmvDeV1thugp3OIzeBr1j7iw7yNOFI3mReoZFJRgZ_HiMn609t2NpMmkQoFTzW2PwmXdQ7JD1rou-uuf_fsewOLZ-XlU4ly46qxbFQHv6udm51-TXJ9TIghuWP7mElMwNWM-2UtFn48SQWJZQfgMRWtf1JWWjLVg_KJ2Zdgj-xoMCR4ZSrUQG3HAipKdytxxnata3qPyW2jN-K4hIa17aH5BlppgVzsc9QnYs-9oZYvalvNPJmVKf2DfvY_T9gmon3r-SVEb0HP94GZZ6ElYIAt9V9_BTW2pAhdQ'
};

const studentTwoId = new mongoose.Types.ObjectId();
const studentTwo = {
    "_id": studentTwoId,
            "name": "kunj",
            "role": "STUDENT",
            "email": "kunj@gmail.com",
            "mobile": 123,
            "password": "123",
            "department": departmentOneId,
            "sem": 7,
            "authToken": jwt.sign({_id: studentTwoId, role: 'STUDENT'}, privateKey,  {algorithm: 'RS256'})
};
const studentThreeId = new mongoose.Types.ObjectId();
const studentThree = {
    "_id": studentThreeId,
            "name": "rishit",
            "email": "rishit@gmail.com",
            "mobile": 123,
            "password": "123",
            "department": '654a1f7cbf6dc50d476d0a03',
            "sem": 7,
            "authToken": jwt.sign({_id: studentThreeId, role: 'STUDENT'}, privateKey,  {algorithm: 'RS256'})
};

const staffOneId = new mongoose.Types.ObjectId();
const staffOne = {
    "_id": staffOneId,
    "name": "keval",
    "role": "STAFF",
    "designation": "teacher",
    "email": "keval@gmail.com",
    "mobile": 12,
    "password": "123",
    "department": departmentOneId,
    'authToken': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRiMTQzZjY5ZDMzOWYxZTkyMDFlNTYiLCJyb2xlIjoiU1RBRkYiLCJpYXQiOjE2OTk0MTkxOTl9.m3oLOP5fnnrYxlf3w3-2vdO_etCKwN2fu89hyjH0UiqIUdnMLS_a6zFXvthMuIYCFSobCdKW5V-8nE72swXOTuhS9TSkav8CgFGAOMu_DZhbFftnRepPvD99ORVO9DgzoWcYgHit7Gn9p9RQsM9gvI3L3TM62T5ZqVHD6qrEPWp4ZhATtK5keJBeoRf-jlsMSDSViXonajqNGTTNEGVNvpbXg6h9dd9JC4Ch-aQRqI5cJzdJztVI2rqwBksb16ZF9ReY1TAuL9qWwpgk0vayVNYSeR-VjvZ_AZ4NDyLWKfI_gE8XgHEYa7Ll67d9rQHfJU5XrVzzrWmwpzxrsIcIyA'
}

const adminId = new mongoose.Types.ObjectId();
const admin = {
    "_id": adminId,
    "name": "dev",
    "role": "ADMIN",
    "designation": "HOD",
    "email": "dev@gmail.com",
    "mobile": 1,
    "password": "123",
    "department": departmentOneId,
    'authToken': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRiMWYwOGI4YWU0M2JjODI1NzBjNTkiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTk0MjE5NjB9.UEWn_I2Zt4ziTF4UgUY0BFD_bCzpHlmg26aZmt4ypTW5MJJvDodDFvo3TtUKa1KbAYZY_WjqITg2ZXK1QiR6PJaJeGfzQYplyvTgISrw_C7hJ2P2eH5FwBKAC0OKuwAlAP1tjNgf1XXKCVphyE5k5kyQ0Xzi9-XS41Fxxu85Ma75JCwsOGMQ1J8PTpiboH3rByzKA-4ixx36Fiy-DkGB5-jFcmtzHL1AhqR8vavD_NuxuxqbaXbzLaNRS6_J-mKBP5ncKOIOxsEodGxI4_B5Maz2ylNMDPElbJ318hlfRTLiV00EkDcRtOeF9DA5Af4llUtymroxr1ASfk7yyirEvA'
}

const setupDatabase = async () => {
    // await Student.deleteMany();
    // await User.deleteMany();
    // await Department.deleteMany();
    // await new Department(departmentOne).save();
    // await new User(staffOne).save();
    // await new User(admin).save();
    // await new Student(studentOne).save();
    // await new Student(studentTwo).save();
};

export default {
    departmentOne,
    departmentOneId,
    staffOne,
    staffOneId,
    studentOne,
    studentOneId,
    studentTwo,
    studentTwoId,
    admin,
    adminId,
    setupDatabase,
    studentThreeId,
    studentThree
}