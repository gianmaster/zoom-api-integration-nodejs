const ZoomService = require('../services/zoomService');
const service = new ZoomService();

module.exports = class ZoomIntegrationController {
  async generateSignature(req, res) {
    try {
      const { meetingNumber, role } = req.body;
      const data = await service.generateClientSignature(meetingNumber, role);

      return res.json({ data });
    } catch (error) {
      return res.status(500).json({ error: error.toString() });
    }
  }
};
