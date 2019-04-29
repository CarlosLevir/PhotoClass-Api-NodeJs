const mongoose = require('mongoose');

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', User);
