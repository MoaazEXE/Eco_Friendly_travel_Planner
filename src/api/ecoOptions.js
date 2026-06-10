import { request } from './client';

// Module-level cache — fetched once per browser session, reused everywhere.
let _cache = null;

export async function getEcoOptions() {
  if (_cache) return _cache;
  _cache = await request('/eco-options');
  return _cache;
}