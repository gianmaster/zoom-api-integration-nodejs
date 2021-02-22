const ZoomIntegrationController = require('../controllers/zoomIntegrationController');
const MeetingController = require('../controllers/meetingController');

const zoomIntegrationController = new ZoomIntegrationController();
const meetingController = new MeetingController();

module.exports = (router) => {
  // signature
  router.post('/zoom/signature', zoomIntegrationController.generateSignature);
  // webhook
  router.post('/notification-subscriber/meeting-ended', meetingController.onMeetingEndedHook);
};
