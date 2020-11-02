const express = require('express');
require('./db/mongoose.js');
const User = require('./models/user');
const Task = require('./models/task');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users', async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  const ObjectId = mongoose.Types.ObjectId.isValid(_id);

  console.log(ObjectId);

  if (ObjectId === false) {
    res.status(404).send('Input Id is not valid');
  }
  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(500).send();
  }

  // if (ObjectId == false) {
  //   res.status(404).send('Input Id is not valid');
  // } else {
  //   User.findById(_id)
  //     .then((user) => {
  //       if (!user) {
  //         return res.status(404).send();
  //       }
  //       res.send(user);
  //     })
  //     .catch((error) => {
  //       res.status(500).send(error);
  //     });
  // }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const task = await Task.find({});
    res.send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  const ObjectId = mongoose.Types.ObjectId.isValid(_id);

  // if (!ObjectId) {
  //   res.status(404).send('Requested ID is not valid');
  // }

  try {
    const task = await Task.findById(_id);

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

// Task.findById(_id)
//   .then((task) => {
//     if (!task) {
//       return res.status(404).send();
//     }
//     res.send(task);
//   })
//   .catch((e) => {
//     res.status(400).send(e);
//   });

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
