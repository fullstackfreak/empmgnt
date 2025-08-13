const express = require('express');
const router = express.Router();
const authMiddleware = require('../milddlewares/authMiddleware');
const { getUsers,updateUser, createUser,getUserById, checkUser, aboutPage } = require('../controllers/userController');

router.get('/',  getUsers);

router.post('/', createUser);
router.get('/about',  aboutPage);
router.post('/login', checkUser);
router.patch('/update/:token', updateUser);


// router.get('/:id', getUserById);

module.exports = router;
