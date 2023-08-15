const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch((error) => next(error));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => {
      res.send(card);
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

module.exports.makeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: 'true' },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректный  id'));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка с таким id не найдена'));
      } else {
        next(error);
      }
    });
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: 'true' },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequestError('Некорректный  id'));
      } else if (error.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточка с таким id не найдена'));
      } else {
        next(error);
      }
    });
};
