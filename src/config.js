module.exports = {
  port: 3002,
  zoom: {
    JWT: {
      apiKey: 'YOUR_API_KEY',
      apiSecret: 'YOUT_API_SECRET',
    },
    webhooks: {
      'meeting-ended': 'YOUR_HOOK_KEY',
    },
  },
  mongoUri: 'YOUR_MONGO_URI',
};
