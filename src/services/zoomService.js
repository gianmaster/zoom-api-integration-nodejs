const jwt = require('jsonwebtoken');
const {
  zoom: { JWT: zoomJWT },
} = require('../config');
const axios = require('axios');
const crypto = require('crypto');

module.exports = class ZoomService {
  constructor() {
    this.rq = axios.create({
      baseURL: 'https://api.zoom.us/v2',
      timeout: 4000,
      headers: {
        'User-Agent': 'Zoom-api-Jwt-Request',
        'content-type': 'application/json',
      },
    });
  }

  generateClientSignature(meetingNumber, role /** 0=participant, 1=host */) {
    const { apiKey, apiSecret } = zoomJWT;
    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(apiKey + meetingNumber + timestamp + role).toString('base64');
    const hash = crypto.createHmac('sha256', apiSecret).update(msg).digest('base64');
    const signature = Buffer.from(
      `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`
    ).toString('base64');

    return { apiKey, signature, meetingNumber };
  }

  generateToken() {
    const payload = {
      iss: zoomJWT.apiKey,
      exp: new Date().getTime() + 5000,
    };
    return jwt.sign(payload, zoomJWT.apiSecret);
  }

  getAuthHeader() {
    return {
      Authorization: `Bearer ${this.generateToken()}`,
    };
  }

  createUser(params) {
    return this.rq.post('/users', params, { headers: this.getAuthHeader() });
  }

  getUser(userId) {
    return this.rq.get(`/users/${userId}`, {}, { headers: this.getAuthHeader() });
  }

  deleteUser(userId) {
    return this.rq.delete(`/users/${userId}`, {}, { headers: this.getAuthHeader() });
  }

  createMeeting(userId, params) {
    return this.rq.post(`/users/${userId}/meetings`, params, { headers: this.getAuthHeader() });
  }

  deleteMeeting(userId, meetingId) {
    return this.rq.delete(
      `/users/${userId}/meetings/${meetingId}`,
      {},
      { headers: this.getAuthHeader() }
    );
  }

  getMeetingList(userId) {
    // this will no consider instant meetings, only scheduled meetings
    return this.rq.get(`/users/${userId}/meetings`, {}, { headers: this.getAuthHeader() });
  }
};
