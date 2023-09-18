const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

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

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    // res.json(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
    // we could also do this below
    // res.status(200).send();
    // res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // res.send("delete task");
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      // new true to return the updated property
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
  // res.send("update task");
};

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
