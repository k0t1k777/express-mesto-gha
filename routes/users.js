const router = require('express').Router();

const {
  getAllUsers,
  createUser,
  getUserId,
  updateProfile,
  updateAvatar,

} = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getAllUsers);

// создаёт пользователя
router.post('/', createUser);

// возвращает пользователя по _id
router.get('/:userId', getUserId);

// обновляет профиль
router.patch('/me', updateProfile);

// обновляет аватар
router.patch('/me/avatar', updateAvatar);

module.exports = router;
