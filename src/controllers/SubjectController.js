const Subject = require('../models/Subject');

class SubjectController {
  async store(req, res) {
    const subject = await Subject.create({ title: req.body.title });

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
