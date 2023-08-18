const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/\S+$/i),
    email: Joi.string().required().email(),
    password: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

module.exports = router;
