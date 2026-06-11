import { vi, describe, test, expect, afterEach } from 'vitest';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.resetModules();
});

function mockFetch(status, body) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

describe('login()', () => {
  test('POSTs to /auth/login with credentials and JSON body', async () => {
    const mockRes = { user: { id: '1', fullName: 'Jane' } };
    const fetchMock = mockFetch(200, mockRes);
    vi.stubGlobal('fetch', fetchMock);

    const { login } = await import('./auth');
    const result = await login({ email: 'jane@example.com', password: 'pass123' });

    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toContain('/auth/login');
    expect(opts.method).toBe('POST');
    expect(opts.credentials).toBe('include');
    expect(JSON.parse(opts.body)).toEqual({ email: 'jane@example.com', password: 'pass123' });
    expect(result).toEqual(mockRes);
  });

  test('throws with server message on error response', async () => {
    vi.stubGlobal('fetch', mockFetch(401, { message: 'Invalid credentials' }));
    const { login } = await import('./auth');
    await expect(login({ email: 'x@x.com', password: 'wrong' })).rejects.toThrow('Invalid credentials');
  });
});

describe('register()', () => {
  test('POSTs to /auth/register with user data', async () => {
    const fetchMock = mockFetch(201, { user: { id: '2' } });
    vi.stubGlobal('fetch', fetchMock);

    const { register } = await import('./auth');
    await register({ fullName: 'Jane', email: 'jane@example.com', password: 'pass123' });

    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toContain('/auth/register');
    expect(opts.method).toBe('POST');
    expect(JSON.parse(opts.body)).toMatchObject({ fullName: 'Jane', email: 'jane@example.com' });
  });
});

describe('getMe()', () => {
  test('GETs /auth/me and returns user data when authenticated', async () => {
    const mockRes = { user: { id: '1', fullName: 'Jane' } };
    vi.stubGlobal('fetch', mockFetch(200, mockRes));

    const { getMe } = await import('./auth');
    const result = await getMe();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/me'),
      expect.objectContaining({ method: 'GET', credentials: 'include' })
    );
    expect(result).toEqual(mockRes);
  });

  test('returns null (does not throw) on 401', async () => {
    vi.stubGlobal('fetch', mockFetch(401, {}));
    const { getMe } = await import('./auth');
    const result = await getMe();
    expect(result).toBeNull();
  });
});

describe('logout()', () => {
  test('POSTs to /auth/logout with credentials', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 204, json: () => Promise.resolve(null) });
    vi.stubGlobal('fetch', fetchMock);

    const { logout } = await import('./auth');
    await logout();

    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toContain('/auth/logout');
    expect(opts.method).toBe('POST');
    expect(opts.credentials).toBe('include');
  });
});
