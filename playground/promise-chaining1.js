require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5f99c5e1530a4e2210352121')
//   .then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const deleteTaskAndCount = async (id, countStatus) => {
  const deleteTask = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: countStatus });
  return count;
};

deleteTaskAndCount('5f99c4e0f1d8ea0fe0930547', false)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
