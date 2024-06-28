'use server';

import { User } from 'firebase/auth';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY ?? '';

export const generateJWT = async (payload: object = {}) => {
  const token = jwt.sign(payload, secretKey);

  return token;
};

export async function verifyJWT(token: string) {
  try {
    const result = jwt.verify(token, secretKey);

    if (result) return true;
  } catch (error) {
    return false;
  }
}

export async function DecodeJWT(token: string) {
  try {
    const result = jwt.decode(token);

    const res = result as User;

    if (result) return res;
  } catch (error) {
    return false;
  }
}
