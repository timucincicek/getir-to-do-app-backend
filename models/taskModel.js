const mongoose = require('mongoose');

const taskScheme = new mongoose.Schema(
  {
    createdAt: {
      type: Number
    },
    title: {
      type: String,
      //trim: true,
      required: [true, 'A task must have a title'],
      maxlength: [50, 'A task name must have less or equal then 50 characters']
    },
    description: {
      type: String,
      required: [true, 'A task must have a description'],
      maxlength: [
        150,
        'A task description must have less or equal then 150 characters'
      ]
      //trim: true
    },
    isOngoing: {
      type: Boolean,
      default: true
    },
    __v: { type: Number, select: false }
  },
  { versionKey: false },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Task = mongoose.model('Task', taskScheme);

module.exports = Task;
