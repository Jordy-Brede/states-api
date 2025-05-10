const mongoose = require('mongoose');
const State = require('./models/States');
require('dotenv').config();

const seedStates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Optional: clear existing data
    await State.deleteMany({});

    // Seed fun facts for specific states
    await State.insertMany([
      {
        stateCode: 'KS',
        funfacts: [
          'Kansas has more cows than people.',
          'The geographic center of the contiguous U.S. is in Kansas.',
          'It’s illegal to serve wine in teacups in Kansas.'
        ]
      },
      {
        stateCode: 'NE',
        funfacts: [
          'Nebraska has more miles of river than any other state.',
          'The Reuben sandwich was invented in Omaha.',
          'Kool-Aid was invented in Hastings, Nebraska.'
        ]
      },
      {
        stateCode: 'OK',
        funfacts: [
          'Oklahoma has more man-made lakes than any other state.',
          'The parking meter was invented in Oklahoma City.',
          'The state meal of Oklahoma includes fried okra and chicken-fried steak.'
        ]
      },
      {
        stateCode: 'MO',
        funfacts: [
          'Missouri is known as the "Show Me State."',
          'St. Louis was the first American city to host the Olympics (1904).',
          'Missouri has more than 6,000 known caves.'
        ]
      },
      {
        stateCode: 'CO',
        funfacts: [
          'Colorado has the highest average elevation of any state.',
          'The cheeseburger was trademarked in Denver in 1935.',
          'Colorado is home to the world’s largest natural hot springs swimming pool.'
        ]
      }
    ]);

    console.log('✅ Fun facts seeded successfully');
    mongoose.disconnect();
  } catch (err) {
    console.error('Seeding failed:', err);
    mongoose.disconnect();
  }
};

seedStates();
