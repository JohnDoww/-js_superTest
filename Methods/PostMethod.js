// import AllMethods from "./AllMethods";
// import request from "supertest";
// import {expect} from "chai";
//
// const request = require('supertest');
// const expect = require('chai').expect;
// let baseUrl = 'http://localhost:3000';
// const {faker} = require('@faker-js/faker');
// let userEmail = faker.internet.email();
// let userPassword = "123123123";
//
//
// class PostMethod extends AllMethods {
//
//     constructor() {
//         super();
//         this.variables.token;
//     }
//
//
//     // async makeGETRequest() {
//     //     return new Promise((resolve, reject) => {
//     //         request(baseUrl)
//     //             .post('/register')
//     //             .send({
//     //                 "email": userEmail,
//     //                 "password": userPassword
//     //             })
//     //             .end((err, res) => {
//     //                 expect(res.status).to.eq(201);
//     //                 expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");
//     //                 this.variables.token = res.body.accessToken;
//     //
//     //                 if (err) {
//     //                     reject(err);
//     //                     return;
//     //                 }
//     //                 resolve(res.body);
//     //             });
//     //     });
//     // }
//
//
//     // gettingAuthToken() {
//     //     let userEmail = faker.internet.email();
//     //     let userPassword = "123123123";
//     //
//     //     return ((done) => {
//     //         request(baseUrl)
//     //             .post('/register')
//     //             .send({
//     //                 "email": userEmail,
//     //                 "password": userPassword
//     //             })
//     //             .end(function (err, res) {
//     //                 expect(res.status).to.eq(201);
//     //                 expect(res.headers).to.have.property('content-type', "application/json; charset=utf-8");
//     //                 this.variables.token = res.body.accessToken;
//     //
//     //                 if (err) {
//     //                     throw err;
//     //                 }
//     //                 done();
//     //             }).then(() => {
//     //             return this.variables.token;
//     //         })
//     //     })
//     // }
//
// }
//
// export default new PostMethod();