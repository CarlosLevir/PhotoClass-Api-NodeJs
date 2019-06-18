const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthController {
  generateToken(params = {}) {
    return jwt.sign(params, process.env.JWT_SECRET, {
      expiresIn: 86400
    });
  }

  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email })
      .select('+password')
      .populate({
        path: 'subjects',
        populate: {
          path: 'files',
          options: { sort: { createdAt: -1 } }
        },
        options: { sort: { createdAt: -1 } }
      });

    if (!user) return res.status(400).json({ error: 'User not found' });

    if (!(await bcrypt.compare(password, user.password))) return res.status(400).json({ error: 'Invalid password' });

    const token = this.generateToken({ id: user._id });

    user.password = undefined;

    return res.json({ user, token });
  }
}

module.exports = new AuthController();
