const { Schema, model } = require('mongoose');

const MeetingSchema = new Schema({
  type: String,
  username: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  status: String,
  zoomReference: Object,
});

MeetingSchema.statics.setStatusDone = (zoomMeetingId) => {
  return this.findOneAndUpdate({ 'zoomReference.id': zoomMeetingId }, { status: 'done' });
};

module.exports = model('Meetings', MeetingSchema);
