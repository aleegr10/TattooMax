var express = require('express');
var router = express.Router();
const Horario = require('../models/Horario')


router.get('/', function (req, res, next) {
  Horario.find()
    .then(horarios => {
      res.json(horarios);
    })
    .catch(e => {
      console.log(e)
    })
});

router.post('/add', function (req, res, next) {
  if (req.body.lengtg == 0) return;
  const { artist, horas } = req.body;
  Horario.create({
      artist,
      horas
  }, (err, horario) => {
      if (err) return res.status(500).send(err);
      // console.log(err);
      res.json(horario);
  })
});


router.put('/:id', function (req, res) {
  const { id } = req.params;
  const { horas } = req.body;
  Horario.findByIdAndUpdate(id, {
    horas
  }, (err, horario) => {
    if (err) return res.status(500).send(err);
    res.send('Horario updated');
  })
})

router.delete('/:id', function (req, res) {
  const { id } = req.params;
  Horario.findByIdAndDelete(id, (err, horario) => {
    if (err) return res.status(500).send(err);
    res.send('Horario deleted');
  })
})

router.delete('/all/:id', function (req, res, next) {
  const { id } = req.params;
  const { horarios } = req.body
  Horario.deleteMany({ artist: id }, (err, horarios) => {
    if (err) return res.status(500).send(err);
    console.log(horarios);
    res.send(`Delete all horarios`);
  })
});


module.exports = router;
