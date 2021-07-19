const { Schema, model } = require("mongoose");
const User = require("./user.model")

const ScenarioSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, ref: 'User',
    required: true,
  },
  picture: {
    type: String,
    default: '/defaultScenario.png'
  },
});

module.exports = model("Scenario", ScenarioSchema);

