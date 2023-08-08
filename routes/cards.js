const router = require('express').Router();

const {
  createCard,
  getCard,
  deleteCard,
  makeLike,
  removeLike,
} = require('../controllers/cards');

// создаёт карточку
router.post('/', createCard);

// возвращает все карточку
router.get('/', getCard);

// удаляет карточку по идентификатору
router.delete('/:cardId', deleteCard);

// поставить лайк карточке
router.put('/:cardId/likes', makeLike);

// убрать лайк с карточки
router.delete('/me/:cardId/likes', removeLike);

module.exports = router;
