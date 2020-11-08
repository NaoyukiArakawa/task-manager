const express = require('express');
const mongoose = require('mongoose');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findbyCredentials(
      req.body.email,
      req.body.password
    );

    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/users', async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  const ObjectId = mongoose.Types.ObjectId.isValid(_id);

  // console.log(ObjectId); ObjectId validation added

  if (!ObjectId) {
    return res.status(404).send('Input Id is not valid');
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
});

router.patch('/users/:id', async (req, res) => {
  const _id = req.params.id;
  const ObjectId = mongoose.Types.ObjectId.isValid(_id);
  const inputItems = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = inputItems.every((item) =>
    allowedUpdates.includes(item)
  );

  if (!ObjectId) {
    return res.status(404).send({ error: 'Requested ID is not valid' });
  }
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Requested params are not valid.' });
  }
  try {
    const user = await User.findById(_id);

    inputItems.forEach((item) => {
      user[item] = req.body[item];
    });

    await user.save();

    if (!user) {
      return res.status(404).send({ error: 'User ID is not found' });
    }
    res.send(user);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete('/users/:id', async (req, res) => {
  const _id = req.params.id;
  const ObjectId = mongoose.Types.ObjectId.isValid(_id);

  if (!ObjectId) {
    return res.status(400).send({ error: 'User Id is not valid' });
  }
  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
