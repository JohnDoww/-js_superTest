const request = require('supertest');
const expect = require('chai').expect;
let baseUrl = 'http://localhost:3000';
const {faker} = require('@faker-js/faker');


let userEmail = faker.internet.email();
let userPassword = "passwordPass";
let accessToken;
let newUserId;
let commentTitle = faker.lorem.word(10);

async function returnNewUsersTokenAndId() {
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
                expect(res.body).to.have.property('accessToken');
                expect(res.body.user).to.have.property('id' && 'email');
                if (err) {
                    reject(err);
                    return;
                }
                resolve(res.body);

            });
    });
}


describe('API test', () => {

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

    it('New user registration ', (done) => {
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

    it('Login ', (done) => {
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
                accessToken = res.body.accessToken;


                request(baseUrl)
                    .post('/664/posts')
                    .set({
                        "Authorization": `Bearer ${accessToken}`
                    })
                    .send({})
                    .end(function (err, res) {
                        expect(res.status).to.eq(201)
                        expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");

                        if (err) {
                            throw err;
                        }
                        done();
                    })
            })
    })


    it('create a post with function ', (done) => {

        returnNewUsersTokenAndId()
            .then((responseBody) => {
                accessToken = responseBody.accessToken;
                newUserId = responseBody.user.id;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        request(baseUrl)
            .post('/posts')
            .set({
                "Authorization": `Bearer ${accessToken}`
            })
            .send({
                "userId": newUserId,
                "title": commentTitle
            })
            .end(function (err, res) {
                expect(res.status).to.eq(201)
                expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");

                if (err) {
                    throw err;
                }
                done();
            });
    });

})



