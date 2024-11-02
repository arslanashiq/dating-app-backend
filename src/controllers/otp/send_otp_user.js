const {
  send_user_otp_validation_schema,
} = require("../../utilities/validation/otp");
const catch_validation_errors = require("../../utilities/catch_validation_errors");

const { sendUserOTP } = require("../../services/otp");

const send_otp_user = async (req, res) => {
  try {
    try {
      await send_user_otp_validation_schema.validate(req.body, {
        abortEarly: false,
      });
      const { message, data, error } = await sendUserOTP(req.body);

      if (error) {
        return res.status(400).json({
          status: 400,
          message: message,
          data,
        });
      }

      res.status(200).json({
        code: 200,
        message: message,
        data,
      });
    } catch (err) {
      catch_validation_errors(res, err);
    }
  } catch (error) {
    res.status(400).send({ status: 400, message: error.message });
  }
};

module.exports = send_otp_user;
