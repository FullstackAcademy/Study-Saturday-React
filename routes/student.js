const router = require('express').Router();
const Student = require('../db/models/students');
const Test = require('../db/models/tests');

router.get('/:studentId', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.studentId);
    if (!student) return res.sendStatus(404);
    res.json(student);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll({
      include: Test
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { firstName, lastName, email } = req.body;
    const student = await Student.findByPk(req.params.id);
    const updatedStudent = await student.update({
      firstName,
      lastName,
      email,
    });
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
