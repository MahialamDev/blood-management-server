import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const createToken = (
  payload: JwtPayload,
  secrect: string,
  options: SignOptions,
) => {
  const token = jwt.sign(payload, secrect, options);

  return token;
};

export const jwtUtils = {
  createToken,
};
