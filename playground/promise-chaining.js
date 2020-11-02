require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5f997881051b075e6cad16c7', { age: 1 })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age: age });
  const count = await User.countDocuments({ age: age });
  return user, count;
};

updateAgeAndCount('5f997881051b075e6cad16c7', 4)
  .then((user, count) => {
    console.log(user);
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
