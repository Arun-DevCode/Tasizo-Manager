import jwt from "jsonwebtoken";

const secretKey = "entri@2026";

// Signature : Create
export function generateAccessToken(payload) {
  const accessToken = jwt.sign(payload, "entri@2026");
  if (!accessToken) {
    return null;
  }
  return accessToken;
}

// Verify : Signature
export function verifySignToken(accessToken) {
  const isVerified = jwt.verify(accessToken, secretKey);

  if (!isVerified) {
    return null;
  }

  return isVerified;
}
