const User = require('../models/User');
const AuthController = require('../controllers/AuthController');

class UserController {
  async register(req, res) {
    const { name, email, password } = req.body;
    try {
      if (await User.findOne({ email })) return res.status(400).json({ error: 'User already exists' });

      const user = await User.create({
        name,
        email,
        password
      });

      const token = AuthController.generateToken({ id: user._id });

      user.password = undefined;

      return res.json({ user, token });
    } catch (err) {
      return res.status(400).json({ error: 'Registration failed' });
    }
  }

  async show(req, res) {
    const user = await User.findById(req.params.id);

    return res.json(user);
  }
}

module.exports = new UserController();
