const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => res.status(500).send({ message: error.message }));
};

module.exports.getUserId = (req, res) => {
  if (req.params.userId.length === 24) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'Пользователь не найден' });
          return;
        }
        res.send(user);
      })
      .catch(() => res.status(404).send({ message: 'Пользователь не найден' }));
  } else {
    res.status(500).send({ message: 'Внутренняя ошибка сервера' });
  }
};

module.exports.updateAvatar = (req, res) => {
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: 'true', runValidators: true })
      .then((user) => res.send(user))
      .catch((error) => {
        if (error.name === 'ValidationError') {
          res.status(400).send({ message: error.message });
        } else {
          res.status(404).send({ message: error.message });
        }
      });
  } else {
    res.status(500).send({ message: 'Внутренняя ошибка сервера' });
  }
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
      .then((user) => res.send(user))
      .catch((error) => {
        if (error.name === 'ValidationError') {
          res.status(400).send({ message: error.message });
        } else {
          res.status(404).send({ message: error.message });
        }
      });
  } else {
    res.status(500).send({ message: 'Внутренняя ошибка сервера' });
  }
};
