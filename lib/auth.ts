import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'auth_token';

export const setAuthToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
};

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE_NAME)?.value;
};

export const removeAuthToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
};

export const isAuthenticated = async () => {
  const token = await getAuthToken();
  return !!token;
};
