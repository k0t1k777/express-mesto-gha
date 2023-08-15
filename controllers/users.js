const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res
      .status(201)
      .send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => next(error));
};

module.exports.getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректный  id'));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с таким id не найден'));
      } else {
        next(error);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        // console.log(error.name);
        next(new BadRequestError(error.message));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с таким id не найден'));
      } else {
        next(error);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Пользователь с таким id не найден'));
      } else {
        next(error);
      }
    });
};
