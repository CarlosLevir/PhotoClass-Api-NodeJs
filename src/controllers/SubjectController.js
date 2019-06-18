const Subject = require('../models/Subject');
const User = require('../models/User');

class SubjectController {
  async store(req, res) {
    const { title } = req.body;
    const { userId } = req;

    const user = await User.findById(userId);

    const subject = await Subject.create({
      title,
      userId
    });

    user.subjects.push(subject);

    await user.save();

    req.io.sockets.in(user._id).emit('subject', subject);

    return res.json(subject);
  }

  async show(req, res) {
    const subject = await Subject.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(subject);
  }
}

module.exports = new SubjectController();
