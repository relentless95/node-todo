const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

// we now use async wrapper
// const getAllTasks = async (req, res) => {
//   // res.send("get all tasks");
//   try {
//     const tasks = await Task.find({});
//     //  with es6 if the name of the file is the same as the value we can do this below:
//     // res.status(200).json({tasks})
//     // the above code is the same as below
//     // res.status(200).json({ tasks: tasks });

//     res.status(200).json({ tasks: tasks });

//     // different types of responses

//     // res.status(200).json({ tasks, amount: tasks.length });
//     // res.status(200).json({ success: true, data: {tasks, nbHits: tasks.length}});
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// async wrapper
const getAllTasks = asyncWrapper(async (req, res) => {
  // res.send("get all tasks");
  const tasks = await Task.find({});
  res.status(200).json({ tasks: tasks });
});

// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     // res.json(req.body);
//     res.status(201).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// using asyncWrapper
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// const getTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOne({ _id: taskID });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id: ${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

// using asyncWrapper
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // const error = new Error("Not Found");
    // error.status = 404;
    // return next(error);

    // using custom error
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ task });
});

// const deleteTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOneAndDelete({ _id: taskID });

//     if (!task) {
//       return res.status(404).json({ msg: `No task with id: ${taskID}` });
//     }
//     res.status(200).json({ task });
//     // we could also do this below
//     // res.status(200).send();
//     // res.status(200).json({ task: null, status: "success" });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
//   // res.send("delete task");
// };

// using asyncWrapper
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
    // using custom error
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

// const updateTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;

//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       // new true to return the updated property
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id: ${taskID}` });
//     }

//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
//   // res.send("update task");
// };

// using asyncWrapper
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    // new true to return the updated property
    new: true,
    runValidators: true,
  });
  if (!task) {
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });

    // using custom error
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }

  res.status(200).json({ task });
});

// const editTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;

//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       // new true to return the updated property
//       new: true,
//       runValidators: true,
//       overwrite: true,
//     });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id: ${taskID}` });
//     }

//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
//   // res.send("update task");
// };

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  // editTask,
};
