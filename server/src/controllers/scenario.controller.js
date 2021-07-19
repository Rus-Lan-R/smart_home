const Scenarios = require('../models/scenario.model')

const getScenarios = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const allUserScenarios = await Scenarios.find({ user: userId });
    res.json(allUserScenarios);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { getScenarios };



