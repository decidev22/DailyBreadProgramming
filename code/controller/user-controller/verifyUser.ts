// TO BE completed

import { getUserById } from "../../api/user-api/getUserById";

export const verifyUser = async (
  verificationCode: string,
  userId: string
) => {
  const user = await getUserById(userId);
  const now = new Date().toISOString();
  user.verification.timestamp.push(`Code reset on: ${now}`);
  if (verificationCode != user.verification.randomSeed) {
    if (user.verification.failCount < 3) {
      user.verification.failCount += 1;
    } else {
      user.verification.randomSeed = Math.floor(
        Math.random() * (999999 - 100000) + 1
      ).toString();
    }
    user.save();
    return "Incorrect code. Try again";
  } else {
    user.verification.verified = true;
    user.save();
    return "Successful!";
  }
};
