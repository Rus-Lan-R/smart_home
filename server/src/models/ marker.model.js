const { Schema, model } = require('mongoose');
const Room = require('./room.model');

const MarkerSchema = Schema({
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  
});

module.exports = model('Marker', MarkerSchema);
