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
