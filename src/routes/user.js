const router = require('express').Router();

const { userController } = require('../controllers');
const { joiValidation } = require('../middlewares');
const { validationUtil } = require('../utils');

router.route('/register')
  .post(joiValidation(validationUtil.bodySchema, 'body'), userController.createUser);

router.route('/login')
  .post(joiValidation(validationUtil.bodySchema, 'body'), userController.loginUser);

router.route('/validate')
  .post(userController.validateUser);

router.route('/logout')
  .get(userController.logoutUser);

module.exports = router;
