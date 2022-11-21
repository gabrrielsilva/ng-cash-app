'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, { createContext, useEffect, useState } from 'react';
import { api } from '../service/api';

type User = {
  username: string,
  accountId: string
}

type Credentials = {
  username: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  register: (credentials: Credentials) => Promise<void>
  login: (credentials: Credentials) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const router = useRouter();

  useEffect(() => {
    const { 'ng.token': token } = parseCookies();
    if (token) {
      decodeToken(token).then(decoded => {
        setUser({ username: decoded.sub, accountId: decoded.accountId })
      })
    }
  }, [])

  async function register({ username, password }: Credentials) {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
      username, 
      password
    })
  }

  async function decodeToken(token: string) {
    const response = await api.post(`${process.env.NEXT_PUBLIC_API_URL}/api/decode`, {
      token
    })
    const decoded = response.data as { sub: string, accountId: string };
    return decoded;
  }

  async function login({ username, password }: Credentials) {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      username, 
      password
    })

    const token = response.data.token;
    setCookie(undefined, 'ng.token', token, {
      maxAge: 60*60*1*24 // 24h,
    });
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    const decodedToken = await decodeToken(token);
    setUser({ username: decodedToken.sub, accountId: decodedToken.accountId });
    router.push('/dashboard');
  }

  const isAuthenticated = !!user;

  async function logout () {
    destroyCookie(null, 'ng.token', { path: '/' });
    setUser(null);
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}