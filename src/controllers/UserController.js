const User = require('../models/User');
const AuthController = require('../controllers/AuthController');

class UserController {
  async register(req, res) {
    const { name, email, password } = req.body;

    console.log(req.body);

    if (!name || !email || !password) return res.status(400).json({ error: 'Invalid data' });

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
      return res.status(400).json({ error: 'Registration failed. Please, verify your data' });
    }
  }
}

module.exports = new UserController();
