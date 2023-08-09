const mongoose = require('mongoose');

// описание схемы пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name не может быть пустым'],
    minlength: [2, 'Имя пользователя не может быть короче 2 символов'],
    maxlength: [30, 'Имя пользователя не может быть длиннее 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Поле about не может быть пустым'],
    minlength: [2, 'Имя пользователя не может быть короче 2 символов'],
    maxlength: [30, 'Имя пользователя не может быть длиннее 30 символов'],
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(http) {
        return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/.test(http);
      },
      message: 'Неправильно введен Url',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
