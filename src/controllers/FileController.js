const File = require('../models/File');
const Subject = require('../models/Subject');

class FileController {
  async store(req, res) {
    const subject = await Subject.findById(req.params.id);

    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });

    subject.files.push(file);

    await subject.save();

    req.io.sockets.in(subject._id).emit('file', file);

    return res.json(file);
  }
}

module.exports = new FileController();
