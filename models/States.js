const mongoose = require('mongoose');

const statesSchema = new mongoose.Schema({
  stateCode: {
    type: String,
    required: true,
    unique: true
  },
  funfacts: [String]
});

module.exports = mongoose.model('State', statesSchema);
