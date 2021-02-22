const { makeValidator } = require('../helpers/index');
const UserController = require('../controllers/userController');
const {
  createUserValidationSchema,
  updateUserValidationSchema,
} = require('../controllers/validators/userValidators');

const userController = new UserController();

module.exports = (router) => {
  router.get('/users', userController.getUsers);

  router.get('/users/:id', userController.getUserById);

  router.post('/users', makeValidator(createUserValidationSchema), userController.createUser);

  router.put('/users/:id', makeValidator(updateUserValidationSchema), userController.updateUser);

  router.delete('/users/:id', userController.deleteUser);
};
