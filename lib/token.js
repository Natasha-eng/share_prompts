// const jwt = require("jsonwebtoken");
import * as jose from "jose";

const MAX_AGE = 7 * 24 * 60 * 60;

export const createToken = async (username, userId) => {
  const payload = {
    username: username,
    userId: userId,
  };
  const token = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(username)
    .setAudience(userId)
    .setExpirationTime(Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60))
    .sign(new TextEncoder().encode(process.env.PRIVATE_KEY));

  // var token = jwt.sign(
  //   {
  //     username,
  //     userId,
  //     iat: Math.floor(Date.now() / 1000),
  //     exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
  //   },
  //   process.env.PRIVATE_KEY
  // );

  return token;
};

export const verifyToken = async (token) => {
  try {
    if (token) {
      const {
        payload: { userId, username },
      } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.PRIVATE_KEY),
        {
          issuer: process.env.JWT_ISSUER, // issuer
          audience: process.env.JWT_AUDIENCE, // audience
        }
      );
      return { username: username, userId: userId };
    } else return null;
  } catch (err) {
    console.log("error verifying token", err);
  }
};
