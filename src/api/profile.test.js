import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';

beforeEach(() => vi.resetModules());
afterEach(() => vi.unstubAllGlobals());

function mockFetch(status, body) {
  return vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

describe('getProfile()', () => {
  test('GETs /profile and returns profile data', async () => {
    const profile = { fullName: 'Jane Doe', email: 'jane@example.com' };
    const fetchMock = mockFetch(200, profile);
    vi.stubGlobal('fetch', fetchMock);

    const { getProfile } = await import('./profile');
    const result = await getProfile();

    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toContain('/profile');
    expect(opts.credentials).toBe('include');
    expect(result).toEqual(profile);
  });

  test('throws Unauthorized error on 401', async () => {
    vi.stubGlobal('fetch', mockFetch(401, { message: 'Unauthorized' }));
    const { getProfile } = await import('./profile');
    await expect(getProfile()).rejects.toThrow('Unauthorized');
  });
});

describe('updateProfile()', () => {
  test('PUTs to /profile with correct body', async () => {
    const updated = { fullName: 'Jane Smith', location: 'Penang' };
    const fetchMock = mockFetch(200, updated);
    vi.stubGlobal('fetch', fetchMock);

    const { updateProfile } = await import('./profile');
    const result = await updateProfile({ fullName: 'Jane Smith', location: 'Penang' });

    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toContain('/profile');
    expect(opts.method).toBe('PUT');
    expect(JSON.parse(opts.body)).toMatchObject({ fullName: 'Jane Smith', location: 'Penang' });
    expect(result).toEqual(updated);
  });
});

describe('changePassword()', () => {
  test('PUTs to /profile/password with current and new password', async () => {
    const fetchMock = mockFetch(200, { message: 'Password updated' });
    vi.stubGlobal('fetch', fetchMock);

    const { changePassword } = await import('./profile');
    await changePassword({ current: 'oldpass', newPass: 'newpass123' });

    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toContain('/profile/password');
    expect(opts.method).toBe('PUT');
    expect(JSON.parse(opts.body)).toEqual({ current: 'oldpass', newPass: 'newpass123' });
  });
});

describe('deleteAccount()', () => {
  test('sends DELETE to /profile', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 204, json: () => Promise.resolve(null) });
    vi.stubGlobal('fetch', fetchMock);

    const { deleteAccount } = await import('./profile');
    await deleteAccount();

    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toContain('/profile');
    expect(opts.method).toBe('DELETE');
  });
});
