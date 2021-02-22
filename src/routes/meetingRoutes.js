const { makeValidator } = require('../helpers/index');
const MeetingController = require('../controllers/meetingController');
const { createMeetingValidationSchema } = require('../controllers/validators/meetingValidators');

const meetingController = new MeetingController();

module.exports = (router) => {
  router.get('/users/:id/meetings', meetingController.getUserMeetings);

  router.post(
    '/users/:id/meetings',
    // makeValidator(createMeetingValidationSchema),
    meetingController.createMeeting
  );
};
