const Rooms = require("../models/room.model");


const updateMarker = async (req, res) => {
  try {console.log('reqbody',req.body);
   await Rooms.findByIdAndUpdate(
    req.body._id,
    {
      color: req.body.color,
      left: req.body.left,
      position: req.body.position,
      top: req.body.top,
      visibility: req.body.visibility,
    },
    { new: true }
  )
  res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = { updateMarker };
