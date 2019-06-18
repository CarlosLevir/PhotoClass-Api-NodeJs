const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: function validateEmail(email) {
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
      }
    },
    password: {
      type: String,
      required: true,
      select: false,
      validate: function validatePassword(password) {
        return password.length >= 8;
      }
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
      }
    ]
  },
  {
    timestamps: true
  }
);

User.pre('save', async function preSave(next) {
  if (this.isModified('password')) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }

  next();
});

module.exports = mongoose.model('User', User);
