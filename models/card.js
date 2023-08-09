const mongoose = require('mongoose');

// описание схемы карточки
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name не может быть пустым'],
    minlength: [2, 'Название карточки не может быть короче 2 символов'],
    maxlength: [30, 'Название карточки не может быть длиннее 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле link не может быть пустым'],
    validate: {
      validator(http) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(http);
      },
      message: 'Неправильно введен Url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
