const Scenarios = require("../models/scenario.model");
const Devices = require("../models/device.model");
const fetch = require("node-fetch");

const getScenarios = async (req, res) => {
  // try {
  //   const userId = req.session.user.id;
  //   const allUserScenarios = await Scenarios.find({ user: userId });
  //   res.json(allUserScenarios);
  // } catch (error) {
  //   res.sendStatus(500);
  // }
};

const statusScenario = async (req, res) => {
  try {
    const userId = req.session.user.id
    console.log("req.body====>>>", req.body)
    console.log("userId", userId)
    let action = null;
    const currentStatus = req.body.isActive
    currentStatus ? action = "off" : action = "on";
    switch (req.body.nameScenario.toLowerCase()) {
      case "ruslik party":
        //включить ленту
        break;
      case "i'm in home":
        //включить свет
        await Devices.updateMany({ user: userId, device: "Lamp", status: currentStatus }, { status: !currentStatus }, { new: true })
        const allUserOffLamps = await Devices.find({ user: userId, device: "Lamp" })
        allUserLamps.forEach(async (device) => {
          const api = `${device.apiURL}${action}`
          console.log(api)
          const responseSwitch = await fetch("http://192.168.1.148:3001/api/refetch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ api }),
          });
        })
        //выключить датчик движения
        break;
      case "i'm not home":
        //выключить свет
        await Devices.updateMany({ user: userId, device: "Lamp", status: currentStatus }, { status: !currentStatus }, { new: true })
        const allUserOnLamps = await Devices.find({ user: userId, device: "Lamp" })
        allUserLamps.forEach(async (device) => {
          const api = `${device.apiURL}${action}`
          const responseSwitch = await fetch("http://192.168.1.148:3001/api/refetch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ api }),
          });
        })
        //включить датчик движения
        break;
      default:
        break;
    }
    res.json(!currentStatus);
  } catch (error) {
    res.sendStatus(500);
  }
}

module.exports = { getScenarios, statusScenario };
