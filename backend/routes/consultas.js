var express = require('express');
const { insertMany } = require('../models/User');
var router = express.Router();
const Consulta = require('../models/Consulta');
var bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
  Consulta.find()
  .then(consulta => {
    res.json(consulta);
  })
  .catch(e => {
    console.log(e)
  })});

router.post('/add', function (req, res, next) {
    if (req.body.lengtg == 0) return;
    const { name, user, telefono, email, consulta } = req.body;
    // console.log(name, telefono, email, consulta);
    Consulta.create({
        name,
        user,
        telefono,
        email,
        consulta
    }, (err, consulta) => {
        if (err) return res.status(500).send(err);
        // console.log(err);
        res.json(consulta);
    })
});

router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { name, user, telefono, email, consulta } = req.body;
  Consulta.findByIdAndUpdate(id, {
    name,
    user,
    telefono,
    email,
    consulta
  }, (err, consulta) => {
    if (err) return res.status(500).send(err);
    res.send(`Consulta updated`);
  })
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  Consulta.findByIdAndDelete(id, (err, consulta) => {
    if (err) return res.status(500).send(err);
    res.send(`Consulta deleted`);
  })
});

module.exports = router;
