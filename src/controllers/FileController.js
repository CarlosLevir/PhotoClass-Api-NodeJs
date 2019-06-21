const File = require('../models/File');
const Subject = require('../models/Subject');

class FileController {
  async store(req, res) {
    const { userId } = req;
    const subject = await Subject.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });

    subject.files.push(file);

    await subject.save();

    req.io.sockets.in(userId).emit('updatedSubject', subject);
    req.io.sockets.in(subject._id).emit('newFile', subject);

    return res.json(file);
  }
}

module.exports = new FileController();
