const request = require('supertest');
const expect = require('chai').expect;
let baseUrl = 'http://localhost:3000';
const {faker} = require('@faker-js/faker');

const {postMethod} = require("./Methods/PostMethod")

// import postMethod from "./Methods/PostMethod";

let userEmail = faker.internet.email();
// let userEmail = "asdsd@email.com";
let userPassword = "passwordPass";
let token;


describe('API test', () => {


    let someId;

    it('Get all posts ', (done) => {
        request(baseUrl)
            .get('/posts')
            .end(function (err, res) {
                expect(res.status).to.eq(200);
                expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");
                if (err) {
                    throw err;
                }
                done();
            })
    });

    it('get authorization token ', (done) => {
        request(baseUrl)
            .post('/register')
            .send({
                "email": userEmail,
                "password": userPassword
            })
            .end(function (err, res) {
                expect(res.status).to.eq(201);
                expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");

                if (err) {
                    throw err;
                }
                done();
            })

    })

    it('Get auth Token ', (done) => {
        request(baseUrl)
            .post('/login')
            .send({
                "email": userEmail,
                "password": userPassword
            })
            .end(function (err, res) {
                expect(res.status).to.eq(200);
                expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");
                expect(res.body).to.have.property('accessToken');
                token = res.body.accessToken;
                if (err) {
                    throw err;
                }
                done();
            })
    });




    it('Create empty post', (done) => {
        let userEmail = faker.internet.email();


        request(baseUrl)
            .post('/register')
            .send({
                "email": userEmail,
                "password": userPassword
            })
            .end(function (err, res) {
                expect(res.status).to.eq(201);
                expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");
                expect(res.body).to.have.property('accessToken');
                token = res.body.accessToken;


                request(baseUrl)
                    .post('/664/posts')
                    .set({
                        "Authorization": `Bearer ${token}`
                    })
                    .send({})
                    .end(function (err, res) {
                        expect(res.status).to.eq(201)
                        expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");
                        console.log(res.status)
                        console.log(res.status)
                        console.log(res.status)


                        if (err) {
                            throw err;
                        }
                        someId = res.status;
                        done();
                    })
            })
    })

    async function returnResponseBody() {
        let userEmail = faker.internet.email();

        return new Promise((resolve, reject) => {
            request(baseUrl)
                .post('/register')
                .send({
                    "email": userEmail,
                    "password": userPassword
                })
                .end((err, res) => {
                    expect(res.status).to.eq(201);
                    expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");
                    token = res.body.accessToken;

                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(res.body);

                });
        });
    }

    it('create a post with function ', (done) => {
        // request(baseUrl)
        //     .post('/login')
        //     .send({
        //         "email": userEmail,
        //         "password": userPassword
        //     })
        //     .end(function (err, res) {
        //         expect(res.status).to.eq(200);
        //         expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");
        //         expect(res.body).to.have.property('accessToken');
        //         token = res.body.accessToken;
        //         if (err) {
        //             throw err;
        //         }
        //         done();
        //     })


        returnResponseBody()
            .then((responseBody) => {
                console.log('Response Body:', responseBody);
                done();
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    });


})





