const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((error) => {
      if (error.name === 'validationError') {
        res.status(400).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Внутренняя ошибка сервера' });
      }
    });
};

module.exports.getCard = (req, res) => {
  Card.find({})
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Внутренняя ошибка сервера' }));
};

module.exports.deleteCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка не найдена' });
          return;
        }
        res.send({ message: 'Карточка удалена успешно' });
      })
      .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
  } else {
    res.status(400).send({ message: 'Неправльно введён id' });
  }
};

module.exports.makeLike = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: 'true' },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка не найдена' });
          return;
        }
        res.send(card);
      })
      .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
  } else {
    res.status(400).send({ message: 'Карточка не найдена' });
  }
};

module.exports.removeLike = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: 'true' },
    )
      .populate(['owner', 'likes'])
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка не найдена' });
          return;
        }
        res.send(card);
      })
      .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
  } else {
    res.status(400).send({ message: 'Карточка не найдена' });
  }
};
