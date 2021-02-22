const { Router } = require('express');
const meetingRoutes = require('./meetingRoutes');
const userRoutes = require('./userRoutes');
const zoomIntegrationRoutes = require('./zoomIntegrationsRoutes');

const router = new Router();

router.get('/', (req, res) => {
  return res.json({
    message: 'Zoom Integration API working!',
  });
});

meetingRoutes(router);
userRoutes(router);
zoomIntegrationRoutes(router);

module.exports = router;
