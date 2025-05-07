const mongoose = require('mongoose');
const dotenv = require('dotenv');
const State = require('./models/States');

dotenv.config();

const seedData = [
  {
    stateCode: 'KS',
    funfacts: [
      'Kansas is known for having the geographic center of the 48 contiguous United States.',
      'Dodge City, KS, is the windiest city in the U.S.',
      'The first woman mayor in the U.S. was elected in Argonia, KS in 1887.'
    ]
  },
  {
    stateCode: 'MO',
    funfacts: [
      'Missouri is home to the world’s largest chess piece in St. Louis.',
      'The ice cream cone was invented at the 1904 World’s Fair in St. Louis.',
      'Mark Twain, the famous author, was born in Missouri.'
    ]
  },
  {
    stateCode: 'OK',
    funfacts: [
      'Oklahoma has more man-made lakes than any other state.',
      'The state capitol has an oil well under it.',
      'The parking meter was invented in Oklahoma City in 1935.'
    ]
  },
  {
    stateCode: 'NE',
    funfacts: [
      'Nebraska has more miles of river than any other state.',
      'The Reuben sandwich originated in Omaha.',
      'Nebraska is the only state with a unicameral legislature.'
    ]
  },
  {
    stateCode: 'CO',
    funfacts: [
      'Colorado is the only state to turn down the Olympics (1976).',
      'The world’s largest flat-top mountain is in Colorado: Grand Mesa.',
      'Denver is exactly one mile high.'
    ]
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await State.deleteMany(); // Clear previous entries
    await State.insertMany(seedData);
    console.log('Database seeded successfully!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
