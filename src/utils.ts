import { AuthenticationError } from "apollo-server";
import { verify } from "jsonwebtoken";

export const getUserId = (req: any): string => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AuthenticationError("Unauthorized");
  }

  const token = authHeader.replace("Bearer ", "");

  if (!token){
    throw new AuthenticationError("Unauthorized");
  }

  let payload;

  try {
    payload = verify(token, process.env.APP_SECRET);
  } catch (e) {
    throw new AuthenticationError(e);
  }

  const payloadContent = typeof(payload) === "string" ? payload : payload.userId;

  if (!payloadContent) {
    throw new AuthenticationError("Unauthorized");
  }

  return payloadContent;
};