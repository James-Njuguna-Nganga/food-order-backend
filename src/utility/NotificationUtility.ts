export const GenerateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 90000)
  let expiry = new Date()
  expiry.setTime(new Date().getTime() + (30 * 60 * 1000))

  return { otp, expiry }

}

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
  const accountSid = ""; //secret in twilio
  const authToken = "";
  const client = require('twilio')(accountSid, authToken);

  const response = await client.messages.create({
    body: 'Your OTP is ${otp}',
    from: '+254799619817',
    to: `+254${toPhoneNumber}`,
  });

  return response;
}