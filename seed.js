const db = require('./db/db');
const Student = require('./db/models/students');
const Test = require('./db/models/tests');
const faker = require('faker');

db.sync({ force: true })
  .then(() => {
    return Promise.all([
      Student.create({
        firstName: 'Jordan',
        lastName: 'Walke',
        email: 'jw@react.com',
      }),
      Student.create({
        firstName: 'Dan',
        lastName: 'Abramov',
        email: 'da@react.com',
      }),
      Student.create({
        firstName: 'James',
        lastName: 'Dean',
        email: 'jd@eastofeden.com',
      }),
      Student.create({
        firstName: 'John',
        lastName: 'Wayne',
        email: 'jw@truegrit.com',
      }),
      Student.create({
        firstName: 'Cary',
        lastName: 'Grant',
        email: 'cg@ithappened1nite.com',
      }),
    ]);
  })
  .then(() => {
    return Promise.all([
      Test.create({
        subject: 'Computer Science',
        grade: 45,
        studentId: 1,
      }),
      Test.create({
        subject: 'Art History',
        grade: 67,
        studentId: 2,
      }),
      Test.create({
        subject: 'Business',
        grade: 29,
        studentId: 3,
      }),
      Test.create({
        subject: 'History',
        grade: 88,
        studentId: 4,
      }),
      Test.create({
        subject: 'English',
        grade: 90,
        studentId: 5,
      }),
      Test.create({
        subject: 'Art',
        grade: 60,
        studentId: 1,
      }),
      Test.create({
        subject: 'Social Sciences',
        grade: 70,
        studentId: 2,
      }),
      Test.create({
        subject: 'Math',
        grade: 88,
        studentId: 2,
      }),
      Test.create({
        subject: 'Birds',
        grade: 50,
        studentId: 3,
      }),
      Test.create({
        subject: 'Art',
        grade: 66,
        studentId: 4,
      }),
      Test.create({
        subject: 'Anything',
        grade: 20,
        studentId: 5,
      }),
      Test.create({
        subject: faker.lorem.word(),
        grade: 45,
        studentId: 1,
      }),
      Test.create({
        subject: faker.lorem.word(),
        grade: 67,
        studentId: 2,
      }),
      Test.create({
        subject: faker.lorem.word(),
        grade: 29,
        studentId: 3,
      }),
      Test.create({
        subject: faker.lorem.word(),
        grade: 88,
        studentId: 4,
      }),
      Test.create({
        subject: faker.lorem.word(),
        grade: 90,
        studentId: 5,
      }),
    ]);
  })
  .then(() => {
    console.log('yay we did it!');
    db.close();
  })
  .catch(err => {
    console.log('an error ack');
    console.log(err.stack);
    db.close();
  });
