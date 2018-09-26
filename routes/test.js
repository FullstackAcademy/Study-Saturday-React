const router = require('express').Router();
const Test = require('../db/models/tests');
const Student = require('../db/models/students');

router.get('/passing', function(req, res, next) {
  Test.passing()
    .then(tests => res.json(tests))
    .catch(next);
});

router.get('/', function(req, res, next) {
  Test.findAll()
    .then(tests => res.json(tests))
    .catch(next);
});

router.get('/:id', function(req, res, next) {
  Test.findById(req.params.id)
    .then(test => res.json(test))
    .catch(next);
});

router.get('/subject/:subject', function(req, res, next) {
  Test.findAll({
    where: {
      subject: req.params.subject
    }
  })
    .then(test => res.json(test))
    .catch(next);
});

router.post('/student/:studentId', function(req, res, next) {
  Student.findById(req.params.studentId)
    .then(student => {
      return Test.create(req.body).then(test => {
        return test.setStudent(student);
      });
    })
    .then(test => {
      res.status(201).json(test);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  Test.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;