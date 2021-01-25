const db = require('./db/db');
const Student = require('./db/models/students');
const Test = require('./db/models/tests');
const faker = require('faker');

const students = [
  {
    firstName: 'Jordan',
    lastName: 'Walke',
    email: 'jw@react.com',
  },
  {
    firstName: 'Dan',
    lastName: 'Abramov',
    email: 'da@react.com',
  },
  {
    firstName: 'James',
    lastName: 'Dean',
    email: 'jd@eastofeden.com',
  },
  {
    firstName: 'John',
    lastName: 'Wayne',
    email: 'jw@truegrit.com',
  },
  {
    firstName: 'Cary',
    lastName: 'Grant',
    email: 'cg@ithappened1nite.com',
  },
];

const tests = [
  {
    subject: 'Computer Science',
    grade: 45,
    studentId: 1,
  },
  {
    subject: 'Art History',
    grade: 67,
    studentId: 2,
  },
  {
    subject: 'Business',
    grade: 29,
    studentId: 3,
  },
  {
    subject: 'History',
    grade: 88,
    studentId: 4,
  },
  {
    subject: 'English',
    grade: 90,
    studentId: 5,
  },
  {
    subject: 'Art',
    grade: 60,
    studentId: 1,
  },
  {
    subject: 'Social Sciences',
    grade: 70,
    studentId: 2,
  },
  {
    subject: 'Math',
    grade: 88,
    studentId: 2,
  },
  {
    subject: 'Birds',
    grade: 50,
    studentId: 3,
  },
  {
    subject: 'Art',
    grade: 66,
    studentId: 4,
  },
  {
    subject: 'Anything',
    grade: 20,
    studentId: 5,
  },
  {
    subject: faker.lorem.word(),
    grade: 45,
    studentId: 1,
  },
  {
    subject: faker.lorem.word(),
    grade: 67,
    studentId: 2,
  },
  {
    subject: faker.lorem.word(),
    grade: 29,
    studentId: 3,
  },
  {
    subject: faker.lorem.word(),
    grade: 88,
    studentId: 4,
  },
  {
    subject: faker.lorem.word(),
    grade: 90,
    studentId: 5,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    // Students
    await Student.bulkCreate(students);
    console.log('Seeded students');

    // Tests
    await Test.bulkCreate(tests);
    console.log('Seeded tests');

    console.log('Database sucessfully seeded');
    db.close();
  } catch (error) {
    console.log('Error seeding database');
    console.log(error.stack);
    db.close();
  }
};

seed();
