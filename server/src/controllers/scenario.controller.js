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
    let action = null;
    const currentStatus = req.body.isActive
    action = currentStatus ? "off" : "on"
    switch (req.body.nameScenario.toLowerCase()) {
      case "goodbye elbrus":
        currentStatus ? api = `http://192.168.1.238:80/api/esp/ledStrip/off` : api = `http://192.168.1.238:80/api/esp/ledStrip/juggle`
        const responseSwitchLedq = await fetch("http://192.168.1.148:3001/api/refetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ api }),
        });
        break;
      case "ruslik party":
        //включить ленту
        currentStatus ? api = `http://192.168.1.238:80/api/esp/ledStrip/off` : api = `http://192.168.1.238:80/api/esp/ledStrip/rainbow`
        const responseSwitch = await fetch("http://192.168.1.148:3001/api/refetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ api }),
        });
        break;
      case "ptichka v gnezde":
        //включить свет
        await Devices.updateMany({ user: userId, device: "Lamp", status: currentStatus }, { status: !currentStatus }, { new: true })
        const allUserOffLamps = await Devices.find({ user: userId, device: "Lamp" })
        allUserOffLamps.forEach(async (device) => {
          const api = `${device.apiURL}${action}`
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
      case "sector clear":
        //выключить свет
        await Devices.updateMany({ user: userId, device: "Lamp", status: currentStatus }, { status: !currentStatus }, { new: true })
        const allUserOnLamps = await Devices.find({ user: userId, device: "Lamp" })
        allUserOnLamps.forEach(async (device) => {
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
      case "order 66":
        currentStatus ? api = `http://192.168.1.238:80/api/esp/ledStrip/off` : api = `http://192.168.1.238:80/api/esp/ledStrip/confetti`
        const responseSwitchLed = await fetch("http://192.168.1.148:3001/api/refetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ api }),
        });
        break;
      case "relax":
        currentStatus ? api = `http://192.168.1.238:80/api/esp/ledStrip/off` : api = `http://192.168.1.238:80/api/esp/ledStrip/sinelon`
        const responseSwitchLedk = await fetch("http://192.168.1.148:3001/api/refetch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ api }),
        });
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
