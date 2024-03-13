var express = require('express');
var router = express.Router();
const Opinion = require('../models/Opinion');

router.get('/', function(req, res, next) {
  Opinion.find()
  .then(opiniones => {
    res.json(opiniones);
  })
  .catch(e => {
    console.log(e)
  })});

router.post('/add', function (req, res, next) {
  if (req.body.lengtg == 0) return;
  const { artist, imgArtist, user, imgUser, titulo, opinion } = req.body;
  Opinion.create({
    artist,
    imgArtist,
    user,
    imgUser,
    titulo,
    opinion
  }, (err, opinion) => {
      if (err) return res.status(500).send(err);
      // console.log(err);
      res.json(opinion);
  })
});

router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { imgUser, titulo, opinion } = req.body;
  Opinion.findByIdAndUpdate(id, {
    imgUser,
    titulo,
    opinion
  }, (err, opinion) => {
    if (err) return res.status(500).send(err);
    res.send(`Opinion updated`);
  })
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  Opinion.findByIdAndDelete(id, (err, opinion) => {
    if (err) return res.status(500).send(err);
    res.send(`Opinion deleted`);
  })
});

module.exports = router;
