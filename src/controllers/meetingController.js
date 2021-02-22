const Meeting = require('../models/meetingModel');
const User = require('../models/userModel');
const ZoomService = require('../services/zoomService');

const service = new ZoomService();

const {
  zoom: { webhooks },
} = require('../config');

const meetingTypes = {
  1: 'instant_meeting',
  2: 'scheduled_meeting',
  3: 'recurrent_meeting_with_no_fixed_time',
  8: 'recurrent_meeting_with_fixed_time',
};

const meetingStatus = {
  active: 'active',
  done: 'done',
};

module.exports = class MeetingController {
  async createMeeting(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const { data: zoomMeeting } = await service.createMeeting(user.zoomReference.id, req.body);
      const meetingPayload = {
        type: meetingTypes[zoomMeeting.type],
        username: user.email,
        zoomReference: zoomMeeting,
        status: meetingStatus.active,
      };
      const meeting = await Meeting.create(meetingPayload);
      return res.json({ data: meeting });
    } catch (error) {
      console.log('ERROR', error);
      return res.status(500).json({ error: error.toString() });
    }
  }

  async getUserMeetings(req, res) {
    try {
      let meetings;
      if (req.params.id === 'all') {
        meetings = await Meeting.find({});
      } else {
        const user = await User.findById(req.params.id);
        meetings = await Meeting.find({ username: user.email });
      }
      return res.json({ data: meetings });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }

  async onMeetingEndedHook(req, res) {
    const authorizationToken = webhooks['meeting-ended'];
    if (req.headers.authorization === authorizationToken) {
      await Meeting.setStatusDone(req.body.payload.object.id);
      console.log(req.body, 'meeting status updated to done!');
    } else {
      console.log('Unauthorized webhook request: [meeting-ended]');
    }
  }
};
