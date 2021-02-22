const { Joi } = require('express-validation');

const createMeetingValidationSchema = {
  body: Joi.object({
    topic: Joi.string(),
    type: Joi.string().required(),
    start_time: Joi.string(), // yyyy-mm-dd T HH:mm:ss
    password: Joi.string(),
    agenda: Joi.string(),
    settings: Joi.object({
      host_video: Joi.boolean(),
      participant_video: Joi.boolean(),
      join_before_host: Joi.boolean(),
      mute_upon_entry: Joi.boolean(),
      use_pmi: Joi.boolean(),
      approval_type: Joi.number(), // 0:automatically 1:Manually: 2:No registration required
    }),
  }),
};

module.exports = {
  createMeetingValidationSchema,
};
