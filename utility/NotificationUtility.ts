export const GenerateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 90000)
  let expiry = new Date()
  expiry.setTime( new Date().getTime() + (30 * 60 * 1000))

  return { otp, expiry}
  
}

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
  const accountSid = "AC861a4936e850902ee05e6cc03f8fe3b9";
  const authToken = "f721c27c7fe11c0e6004ba8f7356ccd4";
  const client = require('twilio')(accountSid, authToken);

  const response = await client.messages.create({
      body: 'Your OTP is ${otp}',
      from: '+254799619817',
      to: `+254${toPhoneNumber}`,
  });

  return response;
}