var express = require('express');
var router = express.Router();
const HorarioLocal = require('../models/HorarioLocal')


router.get('/', function (req, res, next) {
  HorarioLocal.find()
    .then(horarioLocal => {
      res.json(horarioLocal);
    })
    .catch(e => {
      console.log(e)
    })
});

router.post('/add', function (req, res, next) {
  if (req.body.lengtg == 0) return;
  const { dias, horas } = req.body;
  HorarioLocal.create({
      dias,
      horas
  }, (err, horario) => {
      if (err) return res.status(500).send(err);
      // console.log(err);
      res.json(horario);
  })
});


router.put('/:id', function (req, res) {
  const { id } = req.params;
  const { dias, horas } = req.body;
  HorarioLocal.findByIdAndUpdate(id, {
    dias,
    horas
  }, (err, horario) => {
    if (err) return res.status(500).send(err);
    res.send('HorarioLocal updated');
  })
})

router.delete('/:id', function (req, res) {
  const { id } = req.params;
  HorarioLocal.findByIdAndDelete(id, (err, horario) => {
    if (err) return res.status(500).send(err);
    res.send('HorarioLocal deleted');
  })
})

router.delete('/all/:id', function (req, res, next) {
  const { id } = req.params;
  const { horario } = req.body
  HorarioLocal.deleteMany({ artist: id }, (err, horario) => {
    if (err) return res.status(500).send(err);
    res.send(`Delete all horario`);
  })
});


module.exports = router;
