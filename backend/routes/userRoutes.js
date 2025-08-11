const express = require('express');
const router = express.Router();
const authMiddleware = require('../milddlewares/authMiddleware');
const { getUsers, createUser,getUserById, checkUser, aboutPage } = require('../controllers/userController');

router.get('/',  getUsers);

router.post('/', createUser);
router.get('/about',  aboutPage);
router.post('/login', checkUser);

// router.get('/:id', getUserById);

module.exports = router;
