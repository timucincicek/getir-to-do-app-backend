const Task = require('./../models/taskModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllTasks = async (req, res) => {
  try {
    const features = new APIFeatures(Task.find(), req.query).filter().sort();
    const tasks = await features.query;
    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: {
        tasks
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTask = async (req, res) => {
  try {
    req.body.createdAt = new Date().setHours(0, 0, 0, 0);
    const newTask = await Task.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        task: newTask
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.deleteMany({
      _id: {
        $in: req.body.ids
      }
    });
    res.status(200).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: {
        task
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
};
