'use strict';
const expect = require('chai').expect;
const request = require('supertest');

const app = require('../app');
const agent = request.agent(app);

const db = require('../db/db');
const Promise = require('bluebird');
const Student = require('../db/models/students');
const Test = require('../db/models/tests');
describe('Routes', () => {
  before(() => {
    return db.sync({ force: true });
  });

  afterEach(() => {
    return Promise.all([
      Student.truncate({ cascade: true }),
      Test.truncate({ cascade: true })
    ]);
  });

  describe('Student Routes', () => {
    let pepper;
    let peter;
    let charlie;

    beforeEach(() => {
      const creatingStudents = [
        {
          firstName: 'Pepper',
          lastName: 'Potts',
          email: 'saltn@pepper.com'
        },
        {
          firstName: 'Peter',
          lastName: 'Parker',
          email: 'spidey@email.com'
        },
        {
          firstName: 'Charlie',
          lastName: 'Brown',
          email: 'cb@cbdb.com'
        }
      ].map(data => Student.create(data));
      return Promise.all(creatingStudents).then(createdStudents => {
        pepper = createdStudents[0];
        peter = createdStudents[1];
        charlie = createdStudents[2];
      });
    });

    describe('GET /student', () => {
      xit('retrieves all the students', () => {
        return agent
          .get('/student')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect(res => {
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body).to.have.length(3);
          });
      });
    });

    describe('GET /student/:id', () => {
      xit('retrieves a single student by their id', () => {
        return agent
          .get(`/student/${pepper.id}`)
          .expect(200)
          .expect(res => {
            if (typeof res.body === 'string') res.body = JSON.parse(res.body);
            expect(res.body.fullName).to.equal('Pepper Potts');
          });
      });

      xit('returns a 404 error if student does not exist in DB', () => {
        return agent.get('/student/09432').expect(404);
      });
    });

    describe('POST /student', () => {
      xit('creates a new Student instance', () => {
        return agent
          .post('/student')
          .send({
            firstName: 'SQL',
            lastName: 'PRK',
            email: 'sqlprk@db.com'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body.fullName).to.equal('SQL PRK');
          });
      });
    });

    describe('PUT /student/:id', () => {
      xit('updates an instance of a student', () => {
        return agent
          .put(`/student/${pepper.id}`)
          .send({ firstName: 'Salty' })
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body.fullName).to.equal('Salty Potts');
          });
      });
    });

    describe('DELETE /student/:id', () => {
      xit('deletes an instance of a student', () => {
        return agent
          .delete(`/student/${charlie.id}`)
          .expect(204)
          .expect(() => {
            return Student.findById(charlie.id).then(res =>
              expect(res).to.equal(null)
            );
          });
      });
    });
  });

  describe('Test Routes', () => {
    let funTest;
    let badTest;
    let hardTest;
    let crayTest;
    beforeEach(() => {
      const creatingTests = [
        {
          subject: 'Tree-Climbing',
          grade: 81
        },
        {
          subject: 'Outdoor Wilderness Survival',
          grade: 43
        },
        {
          subject: 'Wind-Surfing',
          grade: 85
        },
        {
          subject: 'Outdoor Wilderness Survival',
          grade: 66
        }
      ].map(data => Test.create(data));
      return Promise.all(creatingTests).then(createdTests => {
        funTest = createdTests[0];
        badTest = createdTests[1];
        hardTest = createdTests[2];
        crayTest = createdTests[3];
      });
    });
    afterEach(() => {
      return Promise.all([
        Student.truncate({ cascade: true }),
        Test.truncate({ cascade: true })
      ]);
    });

    describe('GET /test', () => {
      xit('retrieves all tests', () => {
        return agent
          .get('/test')
          .expect(200)
          .expect(res => {
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body).to.have.length(4);
          });
      });
    });

    describe('GET /test/:id', () => {
      xit('gets the test instance by id', () => {
        return agent
          .get(`/test/${funTest.id}`)
          .expect(200)
          .expect(res => {
            expect(res.body.subject).to.equal(funTest.subject);
          });
      });
    });

    describe('GET /test/passing', () => {
      xit('gets all the tests that are passing', () => {
        return agent
          .get('/test/passing')
          .expect(200)
          .expect(res => {
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body).to.have.length(2);
          });
      });
    });

    describe('GET /test/subject/:subject', () => {
      xit('gets all the tests by subject', () => {
        return agent
          .get(`/test/subject/${badTest.subject}`)
          .expect(200)
          .expect(res => {
            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body).to.have.length(2);
          });
      });
    });

    describe('POST /test/student/:studentId', () => {
      let student;
      beforeEach(() => {
        return Student.create({
          firstName: 'Pepper',
          lastName: 'Potts',
          email: 'saltn@pepper.com'
        }).then(newStudent => {
          student = newStudent;
        });
      });
      xit('creates a new Test instance for a student', () => {
        return agent
          .post(`/test/student/${student.id}`)
          .send({
            subject: 'Outdoor Wilderness Survival',
            grade: 43
          })
          .expect(201)
          .expect('Content-Type', /json/)
          .expect(res => {
            expect(res.body.studentId).to.equal(student.id);
          });
      });
    });
    describe('DELETE /test/:id', () => {
      xit('deletes an instance of test by its id', () => {
        return agent
          .delete(`/test/${crayTest.id}`)
          .expect(204)
          .expect(() => {
            return Test.findById(crayTest.id).then(res => {
              expect(res).to.equal(null);
            });
          });
      });
    });
  });
});
