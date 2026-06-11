import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';

// Reset the module cache between tests so the module-level _cache is cleared
beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getEcoOptions()', () => {
  test('calls the correct URL', async () => {
    const mockData = [{ id: 1, name: 'Green Leaf Boutique' }];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    }));

    const { getEcoOptions } = await import('./ecoOptions');
    const result = await getEcoOptions();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/eco-options'),
      expect.objectContaining({ credentials: 'include' })
    );
    expect(result).toEqual(mockData);
  });

  test('returns cached result on second call without calling fetch again', async () => {
    const mockData = [{ id: 1, name: 'Green Leaf Boutique' }];
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockData),
    });
    vi.stubGlobal('fetch', mockFetch);

    const { getEcoOptions } = await import('./ecoOptions');
    await getEcoOptions();
    await getEcoOptions();

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test('throws when the server returns an error status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ message: 'Server error' }),
    }));

    const { getEcoOptions } = await import('./ecoOptions');
    await expect(getEcoOptions()).rejects.toThrow('Server error');
  });
});
