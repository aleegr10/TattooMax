var express = require('express');
const { insertMany } = require('../models/User');
var router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(e => {
      console.log(e)
    })
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  User.findByIdAndDelete(id, (err, user) => {
    if (err) return res.status(500).send(err);
    res.send(`User ${ user.username } deleted`);
  })
});

router.put('/:id', function (req, res, next) {
  const { id } = req.params;
  const { username, fullname, password, email, telefono, imagen } = req.body;

  // Verificar si se proporcionó una nueva contraseña
  if (password) {
    // Encriptar la nueva contraseña
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).send(err);

      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return res.status(500).send(err);

        // Actualizar usuario con la contraseña encriptada
        updateUser(id, username, fullname, hash, email, telefono, imagen, res);
      });
    });
  } else {
    // Si no se proporciona una nueva contraseña, actualizar otros campos excepto la contraseña
    updateUser(id, username, fullname, password, email, telefono, imagen, res);
  }
});

function updateUser(id, username, fullname, password, email, telefono, imagen, res) {
  User.findByIdAndUpdate(id, {
    username,
    fullname,
    password,
    email,
    telefono,
    imagen
  }, (err, user) => {
    if (err) return res.status(500).send(err);
    res.send(`User ${user.username} updated`);
  });
}


router.post('/signin', function (req, res, next) {
  const { username, password } = req.body;
  User.findOne({ username }).then(user => {
    if (!user) return res.status(404).send("User not found");

    user.comparePassword(password, (err, isMatch) => {
      if (err) return res.status(500).send(err);
      if (!isMatch) return res.status(401).send("Incorrect password");

      User.findOne({ username }).then(user => {
        res.json(user);
      })
    })
  })
})

router.post('/signup', function (req, res, next) {
  // if (req.body.length == 0) return;
  const { username, fullname, password, email, telefono, imagen } = req.body;
  User.create({
    username,
    fullname,
    password,
    email,
    telefono,
    imagen
  }, (err, user) => {
    if (err) return res.status(500).send(err);
    res.json(user);
  })

});
module.exports = router;