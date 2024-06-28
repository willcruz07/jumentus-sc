'use server';

import { cookies } from 'next/headers';

interface ISetCookie {
  key: string;
  value: string;
}

async function setCookie({ key, value }: ISetCookie) {
  cookies().set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // One day
    path: '/',
  });
}

async function deleteCookie(key: string) {
  cookies().delete(key);
}

async function getCookies(key: string) {
  return cookies().has(key) ? cookies().get(key)?.value ?? '' : null;
}

export { setCookie, deleteCookie, getCookies };
