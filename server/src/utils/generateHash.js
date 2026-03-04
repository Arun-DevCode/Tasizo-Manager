// JWT - Login Secure
// Bcrypt / Bcryptjs - Secure Sensitive Information

import bcrypt from "bcryptjs";

// 1. Hashing - function to generate hashing key (mixed up)

// 2. Salting - Round of mixed
// 3. compare - rawPassword , hashing password

export async function generateHashedPassword(rawPassword) {
  const hashedPassword = await bcrypt.hash(rawPassword, 10); // Hashing Password (Key)
  return hashedPassword;
}

export async function compareHashPassword(rawPassword, dbPassword) {
  try {
    // Valid password
    const isValid = await bcrypt.compare(rawPassword, dbPassword); // T or F
    if (!isValid) {
      return { error: true, isValidPassword: isValid };
    }

    return { error: false, isValidPassword: isValid };
  } catch (error) {
    return console.log("failed to generate hash password!");
  }
}
