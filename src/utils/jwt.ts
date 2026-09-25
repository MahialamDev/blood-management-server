import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";




const createToken = (
  payload: JwtPayload,
  secrect: string,
  expiresIn: SignOptions,
) => {
  const token = jwt.sign(payload, secrect, {
    expiresIn,
  } as SignOptions);

  return token
};


export const jwtUtils = {
	createToken,
};
