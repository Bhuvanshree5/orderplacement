const request = require('supertest');
const app = require('../../src/server');
const pool = require('../../src/database');
// beforeAll(async()=>{
//     const sql =`create table user_info (
//         id int AUTO_INCREMENT PRIMARY KEY,name varchar(255) not null,email varchar(255) not null UNIQUE,role varchar(255) not null)`
//     await connection.execute(sql)
// })
// afterAll(async ()=>{
//     const sql = `DROP TABLE IF EXISTS user_info`
//     await connection.execute(sql)
// })
beforeAll(async () => {
    // Create the user_info table before all tests
    const sql = `
        CREATE TABLE IF NOT EXISTS user_info (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            role VARCHAR(255) NOT NULL
        )
    `;
    await pool.execute(sql); // Ensure you await the execution
});

afterAll(async () => {
    // Drop the user_info table after all tests
    const sql = `DROP TABLE IF EXISTS user_info`; // Correct SQL syntax
    await pool.execute(sql); // Ensure you await the execution
});

describe('user Registration',()=>{
    test('should register a user',async ()=>{
        const reqBody = {
            name:'bhuvi',
            email:'bhuvi@gmail.com',
            password:'bhuvi@bhuvi',
            role:'admin'
        }
        const response = await request(app).post('/api/users/register').send(reqBody)
        console.log(response.text);
        expect(response.statusCode).toBe(201)
        expect(response.text).toBe('user created successfully')
        const [result] = await pool.execute(`select * from user_info where email = ?`,[reqBody.email])
        expect(result[0].name).toBe(reqBody.name)
        expect(result[0].email).toBe(reqBody.email)
        expect(result[0].role).toBe(reqBody.role)
     })
     test('should check if name is required',async ()=>{
        const reqBody = {
            name :"",
            email:'bhuvi@bhuvi',
            password:'bhuvi@bhuvi',
            role:'admin'
        }
        const response = await request(app).post('/api/users/register').send(reqBody)
        expect(response.statusCode).toBe(400)
        expect(response.text).toBe('All fields are required')
    })
    test('should check if email is required',async ()=>{
        const reqBody = {
            name:'bhuvi',
            email:'',
            password:'bhuvi@bhuvi',
            role:'admin'
        }
        const response = await request(app).post('/api/users/register').send(reqBody)
        expect(response.statusCode).toBe(400)
        expect(response.text).toBe('All fields are required')
    })
    test('should check if password is required',async ()=>{
        const reqBody = {
            name:'bhuvi',
            email:'bhuvi@bhuvi',
            password:'',
            role:'admin'
        }    
        const response = await request(app).post('/api/users/register').send(reqBody)
        expect(response.statusCode).toBe(400)
        expect(response.text).toBe('All fields are required')
    })
    test('should check if role is required',async ()=>{
        const reqBody = {
            name:'bhuvi',
            email:'bhuvi@bhuvi',
            password:'bhuvi@bhuvi',
            role:''
        }    
        const response = await request(app).post('/api/users/register').send(reqBody)
        expect(response.statusCode).toBe(400)
        expect(response.text).toBe('All fields are required')
    })

})