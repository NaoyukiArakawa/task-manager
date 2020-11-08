const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const Task = require('../models/task');

router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const task = await Task.find({});
    res.send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  const ObjectId = mongoose.Types.ObjectId.isValid(_id);

  if (!ObjectId) {
    return res.status(404).send('Requested ID is not valid');
  }

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  const ObjectId = mongoose.Types.ObjectId.isValid(_id);
  const inputItems = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = inputItems.every((item) => {
    return allowedUpdates.includes(item);
  });

  if (!ObjectId) {
    return res.status(400).send({ error: 'Requested ID is not valid' });
  }
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Requested params are not valid' });
  }

  try {
    const task = await Task.findById(_id);

    inputItems.forEach((item) => {
      task[item] = req.body[item];
      console.log(task[item]);
    });

    await task.save();

    if (!task) {
      return res.status(404).send({ error: 'Task ID is not found' });
    }
    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  const ObjectId = mongoose.Types.ObjectId.isValid(_id);

  if (!ObjectId) {
    return res.status(400).send({ error: 'Task Id is not valid' });
  }
  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
