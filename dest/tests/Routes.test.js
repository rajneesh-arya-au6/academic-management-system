"use strict";

var app = require("../../app");

var supertest = require("supertest");

var request = supertest(app);
var auth = {};

require("@babel/polyfill");

test("user login", function (done) {
  jest.setTimeout(50000);
  request.post("/login").send({
    email: "rajneesharya94@gmail.com",
    password: "admin"
  }).expect(200).end(function (err, res) {
    auth.token = res.body.token;
    console.log(auth.token);

    if (err) {
      console.log(err);
      return done(err);
    }

    ;
    done();
  });
}); // test('Post status 200 /addstudent', function (done) {
//     request.post('/addstudent')
//         .expect(200).set({
//             Authorization: `Bearer ${auth.token}`
//         })
//         .send({name:"student",
//         email:"teststudent1@gmail.com",
//         password:"student",
//         role:"student"})
//         .end(function (err, res) {
//             if (err) {
//                 console.log(err)
//                 return done(err)};
//             done();
//         });
// })
// test('Post status 200 /addprofessor', function (done) {
//     request.post('/addprofessor')
//         .expect(200).set({
//             Authorization: `Bearer ${auth.token}`
//         })
//         .send({name:"professor",
//         email:"testprofessor1@gmail.com",
//         password:"professor",
//         role:"professor"})
//         .end(function (err, res) {
//             if (err) {
//                 console.log(err)
//                 return done(err)};
//             done();
//         });
// })
// test('Post status 200 /addlibrarian', function (done) {
//     request.post('/addlibrarian')
//         .expect(200).set({
//             Authorization: `Bearer ${auth.token}`
//         })
//         .send({name:"librarian",
//         email:"testlibrarian1@gmail.com",
//         password:"librarian",
//         role:"librarian"})
//         .end(function (err, res) {
//             if (err) {
//                 console.log(err)
//                 return done(err)};
//             done();
//         });
// })
// test('Post status 200 /createevent', function (done) {
//     request.post('/createevent')
//         .expect(200).set({
//             Authorization: `Bearer ${auth.token}`
//         })
//         .send({name:"diwali festival",
//         description:"happy diwali",
//         day:"2020-03-06"
//         })
//         .end(function (err, res) {
//             if (err) {
//                 console.log(err)
//                 return done(err)};
//             done();
//         });
// })
// test('Get status 200 /viewevents/:day', function (done) {
//     request.get("/viewevents/2020-03-06")
//     .set({  Authorization: `Bearer ${auth.token}` })
//         .end(function (err, res) {
//             console.log(res.body.Name)
//             expect(res.body.Name).toBe("diwali festival")
//             expect(res.status).toBe(200)
//             if (err) return done(err);
//             done();
//         })
// });
// test('Post status 200 /deleteevent', function (done) {
//     request.post('/deleteevent')
//         .expect(200).set({
//             Authorization: `Bearer ${auth.token}`
//         })
//         .send({name:"diwali festival",
//         day:"2020-03-06"
//         })
//         .end(function (err, res) {
//             if (err) {
//                 console.log(err)
//                 return done(err)};
//             done();
//         });
// })
// test('Post status 200 /addmarksheet', function (done) {
//     request.post('/addmarksheet')
//         .set({
//             Authorization: `Bearer ${auth.token}`
//         })
//         .send({studentId:"4",
//         physics:"33",
//         chemistry:"44",
//         maths:"65"
//         })
//         .end(function (err, res) {
//             expect(res.status).toBe(200)
//             expect(res.body.Success).toBe('Marksheet added succesfully')
//             console.log(res.body)
//             if (err) {
//                 console.log(err)
//                 return done(err)};
//             done();
//         });
// })
// test('Get status 200 /viewmarksheet/:studentId', function (done) {
//     let studentId = 4
//     request.get(`/viewmarksheet/${studentId}`)
//         .set({
//             Authorization: `Bearer ${auth.token}`
//         })
//         .end(function (err, res) {
//             console.log(res.body)
//             expect(res.status).toBe(200)
//             expect(res.body.Roll_no).toBe(studentId)
//             if (err) {
//                 console.log(err)
//                 return done(err)};
//             done();
//         });
// })
// test('Post status 200 /addbooks', function (done) {
//     request.post('/addbooks')
//         .expect(200).set({
//             Authorization: `Bearer ${auth.token}`
//         })
//         .send({name:"Advance radar",
//         subject:"EC",
//         isIssued:"false"
//         })
//         .end(function (err, res) {
//             if (err) {
//                 console.log(err)
//                 return done(err)};
//             done();
//         });
// })
// test('Post status 200 /issuebooks', function (done) {
//     request.post('/issuebooks')
//         .expect(200).set({
//             Authorization: `Bearer ${auth.token}`
//         })
//         .send({bookId:"1",
//         studentId:"1",
//         date:"2020-05-01"
//         })
//         .end(function (err, res) {
//             if (err) {
//                 console.log(err)
//                 return done(err)};
//             done();
//         });
// })

/*Testing for view library route */
// test('Get status 200 /viewlibrary/:id', function (done) {
//     request.get("/viewlibrary/1")
//     .set({  Authorization: `Bearer ${auth.token}` })
//         .end(function (err, res) {
//             console.log(res.body.Name)
//             expect(res.status).toBe(200)
//             if (err) return done(err);
//             done();
//         })
// });

test('Get status 200 /createattendance', function (done) {
  request.get("/createattendance").set({
    Authorization: "Bearer ".concat(auth.token)
  }).end(function (err, res) {
    console.log(res.body.link);
    expect(res.status).toBe(200);

    if (err) {
      console.log(err);
      return done(err);
    }

    ;
    done();
  });
}); // test('Get status 200 /viewattendance', function (done) {
//     request.get(`/viewattendance`).expect(200)
//         .set({
//             Authorization: `Bearer ${auth.token}`
//         })
//         .end(function (err, res) {
//             if (err) {
//                 console.log(err)
//                 return done(err)};
//             done();
//         });
// })