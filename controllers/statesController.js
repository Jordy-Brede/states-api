const State = require('../models/States');
const statesData = require('../statesData.json');


const isValidStateCode = (code) => {
  return statesData.some(state => state.code.toUpperCase() === code.toUpperCase());
};


const findState = (code) => statesData.find(s => s.code === code.toUpperCase());


const getMergedStateData = async () => {
  const dbStates = await State.find();
  return statesData.map(state => {
    const match = dbStates.find(db => db.stateCode === state.code);
    return match ? { ...state, funfacts: match.funfacts } : state;
  });
};


const getAllStates = async (req, res) => {
  const contig = req.query.contig;
  let states = await getMergedStateData();

  if (contig === 'true') {
    states = states.filter(s => s.code !== 'AK' && s.code !== 'HI');
  } else if (contig === 'false') {
    states = states.filter(s => s.code === 'AK' || s.code === 'HI');
  }

  res.json(states);
};


const getState = async (req, res) => {
  const code = req.params.state.toUpperCase();
  const states = await getMergedStateData();
  const state = states.find(s => s.code === code);

  if (!state) return res.status(400).json({ error: 'Invalid state abbreviation parameter' });
  res.json(state);
};


const getRandomFunFact = async (req, res) => {
    const code = req.params.state.toUpperCase();
    if (!isValidStateCode(code)) {
      return res.status(400).json({ error: 'Invalid state abbreviation parameter' });
    }
  
    const dbState = await State.findOne({ stateCode: code });
  
    if (!dbState || !dbState.funfacts || dbState.funfacts.length === 0) {
      return res.status(404).json({ message: `No Fun Facts found for ${code}` });
    }
  
    const fact = dbState.funfacts[Math.floor(Math.random() * dbState.funfacts.length)];
    res.json({ funfact: fact });
  };



const getCapital = (req, res) => {
  const code = req.params.state.toUpperCase();
  if (!isValidStateCode(code)) {
    return res.status(400).json({ error: 'Invalid state abbreviation parameter' });
  }

  const state = findState(code);
  res.json({ state: state.state, capital: state.capital_city });
};


const getNickname = (req, res) => {
  const code = req.params.state.toUpperCase();
  if (!isValidStateCode(code)) {
    return res.status(400).json({ error: 'Invalid state abbreviation parameter' });
  }

  const state = findState(code);
  res.json({ state: state.state, nickname: state.nickname });
};


const getPopulation = (req, res) => {
  const code = req.params.state.toUpperCase();
  if (!isValidStateCode(code)) {
    return res.status(400).json({ error: 'Invalid state abbreviation parameter' });
  }

  const state = findState(code);
  res.json({ state: state.state, population: state.population });
};


const getAdmission = (req, res) => {
  const code = req.params.state.toUpperCase();
  if (!isValidStateCode(code)) {
    return res.status(400).json({ error: 'Invalid state abbreviation parameter' });
  }

  const state = findState(code);
  res.json({ state: state.state, admitted: state.admission_date });
};


const postFunFacts = async (req, res) => {
  const code = req.params.state.toUpperCase();
  if (!isValidStateCode(code)) {
    return res.status(400).json({ error: 'Invalid state abbreviation parameter' });
  }

  const { funfacts } = req.body;

  if (!Array.isArray(funfacts)) {
    return res.status(400).json({ message: 'State fun facts value must be an array' });
  }

  let state = await State.findOne({ stateCode: code });

  if (state) {
    state.funfacts.push(...funfacts);
  } else {
    state = new State({ stateCode: code, funfacts });
  }

  await state.save();
  res.json(state);
};


const patchFunFact = async (req, res) => {
  const code = req.params.state.toUpperCase();
  if (!isValidStateCode(code)) {
    return res.status(400).json({ error: 'Invalid state abbreviation parameter' });
  }

  const { index, funfact } = req.body;

  if (!index || !funfact) {
    return res.status(400).json({ message: 'State fun fact index and value are required' });
  }

  const state = await State.findOne({ stateCode: code });
  if (!state || !state.funfacts || index < 1 || index > state.funfacts.length) {
    return res.status(404).json({ message: 'No Fun Fact found at that index for the state' });
  }

  state.funfacts[index - 1] = funfact;
  await state.save();
  res.json(state);
};


const deleteFunFact = async (req, res) => {
  const code = req.params.state.toUpperCase();
  if (!isValidStateCode(code)) {
    return res.status(400).json({ error: 'Invalid state abbreviation parameter' });
  }

  const { index } = req.body;

  if (!index) {
    return res.status(400).json({ message: 'State fun fact index is required' });
  }

  const state = await State.findOne({ stateCode: code });
  if (!state || !state.funfacts || index < 1 || index > state.funfacts.length) {
    return res.status(404).json({ message: 'No Fun Fact found at that index for the state' });
  }

  state.funfacts.splice(index - 1, 1);
  await state.save();
  res.json(state);
};


module.exports = {
  getAllStates,
  getState,
  getRandomFunFact,
  getCapital,
  getNickname,
  getPopulation,
  getAdmission,
  postFunFacts,
  patchFunFact,
  deleteFunFact
};
