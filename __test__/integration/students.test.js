const supertest = require('supertest');
const app = require('../../src/app');
const mongoose = require('mongoose');
const Student = require('../../src/models/student.model')
const { generateToken } = require('../../src/common/utils/jwt');



//supertest(app)
//fetch,axios,request
const request = supertest(app);

const TOKEN =  generateToken({test:'test'});

//connect database before testing
// https://github.com/shelfio/jest-mongodb
beforeAll(async ()=>{
    await mongoose.connect(global.__MONGO_URI__);
})

afterAll(async()=>{
    await mongoose.connection.close();
})

describe("/v1/students",()=>{
    beforeEach(async ()=> {
        //make sure the db is empty before runing test to ensure the accuracy
        await Student.deleteMany({}).exec();
    })
    describe("POST / v1/students", ()=>{
        const validStudent =  {
            firstName: 'weib',
            lastName: 'doe',
            email:'john@doe.com'
        };

        it('should save the student if payload is valid', async()=>{
            //set up
        
            //execute
            const res = await request
            .post('/v1/students')
            .set('Authorization',`Bearer ${TOKEN}`)
            .send(validStudent);

            expect(res.statusCode).toBe(201);
            const student = Student.findOne(validStudent).exec();
            expect(student).not.toBeNull();

        })
        //set a variable list to reuse the test
        it.each `
             property       | value 
            ${'firstName'} | ${''}
            ${'lastName'}  | ${''}
            ${'lastName'}  | ${undefined}
            ${'email'}     | ${'invalid@'}
            ${'email'}     | ${'invalid'}
            ${'email'}     | ${'invalid@.c'}
            
        `('should return 400 if request payload is invalid when $property is $value', 
            async({property,value})=>{
            //set up
            //invalid is valid change some property
            const invalidStudent =  {
                ...validStudent,
                [property] : value
            }
            //execute
            const res = await request
            .post('/v1/students')
            .set('Authorization',`Bearer ${TOKEN}`)
            .send(invalidStudent);

            expect(res.statusCode).toBe(400);
            const student =await Student.findOne(invalidStudent).exec();
            expect(student).toBeNull();

        })

    })

})

