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
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return [user, count];
};

updateAgeAndCount('5f997881051b075e6cad16c7', 0)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
