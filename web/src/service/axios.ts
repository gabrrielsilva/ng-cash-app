import axios from 'axios';
import { parseCookies } from 'nookies';

export function APIClient(ctx?: any) {
  const { 'ng.token': token } = parseCookies();
  const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
  if (token) api.defaults.headers['Authorization'] = `Bearer ${token}`;
  return api;
}