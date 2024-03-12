var express = require('express');
var router = express.Router();
const Cita = require('../models/Cita');

router.get('/', function(req, res, next) {
  Cita.find()
  .then(cita => {
    res.json(cita);
  })
  .catch(e => {
    console.log(e)
  })});

router.post('/add', function (req, res, next) {
    if (req.body.lengtg == 0) return;
    const { username, artist, cita, descripcion } = req.body;
    Cita.create({
      username,  
      artist,
      cita,
      descripcion
    }, (err, cita) => {
      if (err) return res.status(500).send(err);
      // console.log(err);
      res.json(cita);
    })
});

router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { username, artist, cita, descripcion } = req.body;
  Cita.findByIdAndUpdate(id, {
    username,
    artist,
    cita,
    descripcion
  }, (err, cita) => {
    if (err) return res.status(500).send(err);
    res.send(`Cita updated`);
  })
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  Cita.findByIdAndDelete(id, (err, cita) => {
    if (err) return res.status(500).send(err);
    res.send(`Cita deleted`);
  })
});

module.exports = router;
