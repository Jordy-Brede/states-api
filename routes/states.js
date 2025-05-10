const express = require('express');
const router = express.Router();
const controller = require('../controllers/statesController');

router.get('/', controller.getAllStates);


router.get('/:state/funfact', controller.getRandomFunFact);
router.get('/:state/capital', controller.getCapital);
router.get('/:state/nickname', controller.getNickname);
router.get('/:state/population', controller.getPopulation);
router.get('/:state/admission', controller.getAdmission);
router.get('/:state', controller.getState);

router.post('/:state/funfact', controller.postFunFacts);
router.patch('/:state/funfact', controller.patchFunFact);
router.delete('/:state/funfact', controller.deleteFunFact);

module.exports = router;
