const express = require('express');
require('./db/mongoose.js');
const User = require('./models/user');
const Task = require('./models/task');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get('/users', (req, res) => {
  User.find({}, 'name age')
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

app.get('/users/:id', (req, res) => {
  const _id = req.params.id;

  const ObjectId = mongoose.Types.ObjectId.isValid(_id);

  console.log(ObjectId);

  if (ObjectId == false) {
    res.status(404).send('Input Id is not valid');
  } else {
    User.findById(_id)
      .then((user) => {
        if (!user) {
          return res.status(404).send();
        }
        res.send(user);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  }
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get('/tasks', (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get('/tasks/:id', (req, res) => {
  const _id = req.params.id;
  const ObjectId = mongoose.Types.ObjectId.isValid(_id);

  if (!ObjectId) {
    res.status(404).send('Requested ID is not valid');
  } else {
    Task.findById(_id)
      .then((task) => {
        if (!task) {
          return res.status(404).send();
        }
        res.send(task);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  }
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
