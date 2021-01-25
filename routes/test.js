const router = require('express').Router();
const Test = require('../db/models/tests');
const Student = require('../db/models/students');

// GET /api/tests
router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.json(tests);
  } catch (error) {
    next(error);
  }
});

// GET /api/tests/passing
router.get('/passing', async (req, res, next) => {
  try {
    const passingTests = await Test.getPassing();
    res.json(passingTests);
  } catch (error) {
    next(error);
  }
});

// GET /api/tests/subjects/:subject
router.get('/subjects/:subject', async (req, res, next) => {
  try {
    const testsBySubject = await Test.findAll({
      where: {
        subject: req.params.subject,
      },
    });
    res.json(testsBySubject);
  } catch (error) {
    next(error);
  }
});

// GET /api/tests/:id
router.get('/:id', async (req, res, next) => {
  try {
    const test = await Test.findByPk(req.params.id);
    res.json(test);
  } catch (error) {
    next(error);
  }
});

// POST /api/tests/students/:studentId
router.post('/students/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    let test = await Test.create(req.body);
    test = await test.setStudent(student);
    res.status(201).json(test);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/tests/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const test = await Test.findByPk(req.params.id);
    if (test) {
      await test.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
