const User = require('../models/userModel');
const ZoomService = require('../services/zoomService');

const service = new ZoomService();

module.exports = class UserController {
  async getUsers(req, res) {
    const users = await User.find({});

    return res.json({ data: users });
  }

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ id: req.params.id }, req.body);
      return res.json({ data: user });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  async getUserById(req, res) {
    const user = await User.findOne(req.params.id);

    return res.json({ data: user });
  }

  async deleteUser(req, res) {
    try {
      const user = await User.findById(req.params.id);
      // await service.deleteUser(user.zoomReference.id); // not posible
      user.remove();
      return res.status(204).json({ data: undefined });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  async createUser(req, res) {
    try {
      const zoomUserPayload = {
        action: 'custCreate',
        user_info: {
          first_name: req.body.firstName,
          last_name: req.body.lastName,
          email: req.body.email,
          type: 1,
        },
      };

      const { data: zoomUser } = await service.createUser(zoomUserPayload);
      const userPayload = {
        zoomReference: {
          id: zoomUser.id,
          type: zoomUser.type,
        },
        ...req.body,
      };

      const user = new User(userPayload);
      user.save();

      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
};
