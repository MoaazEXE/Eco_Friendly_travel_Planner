import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';

const ECO_OPTIONS = [
  { id: 1, name: 'Green Leaf Boutique', city: 'kl', category: 'Accommodation', eco: 5 },
  { id: 2, name: 'The Organic Kitchen', city: 'kl', category: 'Restaurant', eco: 4 },
];

const RAW_STOPS = [
  { _id: 'stop-1', ecoOptionId: 1, plannedDate: '2025-01-10', notes: 'Bring sunscreen' },
  { _id: 'stop-2', ecoOptionId: 2, plannedDate: '2025-01-11', notes: '' },
];

function makeFetch(responses) {
  let callIndex = 0;
  return vi.fn().mockImplementation(() => {
    const resp = responses[callIndex++] ?? responses[responses.length - 1];
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(resp),
    });
  });
}

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getItinerary()', () => {
  test('enriches stops with eco option data', async () => {
    vi.stubGlobal('fetch', makeFetch([RAW_STOPS, ECO_OPTIONS]));

    const { getItinerary } = await import('./itinerary');
    const result = await getItinerary();

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      _id: 'stop-1',
      name: 'Green Leaf Boutique',
      plannedDate: '2025-01-10',
      notes: 'Bring sunscreen',
    });
    expect(result[1]).toMatchObject({
      _id: 'stop-2',
      name: 'The Organic Kitchen',
    });
  });

  test('filters out stops whose ecoOptionId does not match any eco option', async () => {
    const stopsWithOrphan = [
      ...RAW_STOPS,
      { _id: 'stop-orphan', ecoOptionId: 999, plannedDate: '2025-01-12', notes: '' },
    ];
    vi.stubGlobal('fetch', makeFetch([stopsWithOrphan, ECO_OPTIONS]));

    const { getItinerary } = await import('./itinerary');
    const result = await getItinerary();

    expect(result).toHaveLength(2);
    expect(result.find(s => s._id === 'stop-orphan')).toBeUndefined();
  });
});

describe('addStop()', () => {
  test('POSTs to /itinerary with correct body', async () => {
    const newRawStop = { _id: 'stop-3', ecoOptionId: 1, plannedDate: '2025-02-01', notes: 'Test' };
    const mockFetch = makeFetch([newRawStop, ECO_OPTIONS]);
    vi.stubGlobal('fetch', mockFetch);

    const { addStop } = await import('./itinerary');
    await addStop({ ecoOptionId: 1, plannedDate: '2025-02-01', notes: 'Test' });

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('/itinerary');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body)).toMatchObject({
      ecoOptionId: 1,
      plannedDate: '2025-02-01',
      notes: 'Test',
    });
  });

  test('returns enriched stop after adding', async () => {
    const newRawStop = { _id: 'stop-3', ecoOptionId: 1, plannedDate: '2025-02-01', notes: '' };
    vi.stubGlobal('fetch', makeFetch([newRawStop, ECO_OPTIONS]));

    const { addStop } = await import('./itinerary');
    const result = await addStop({ ecoOptionId: 1, plannedDate: '2025-02-01' });

    expect(result).toMatchObject({
      _id: 'stop-3',
      name: 'Green Leaf Boutique',
      plannedDate: '2025-02-01',
    });
  });
});

describe('updateStop()', () => {
  test('PUTs to /itinerary/:id with correct body', async () => {
    const updatedRaw = { _id: 'stop-1', ecoOptionId: 1, plannedDate: '2025-03-01', notes: 'Updated' };
    const mockFetch = makeFetch([updatedRaw, ECO_OPTIONS]);
    vi.stubGlobal('fetch', mockFetch);

    const { updateStop } = await import('./itinerary');
    await updateStop('stop-1', { notes: 'Updated', plannedDate: '2025-03-01' });

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('/itinerary/stop-1');
    expect(options.method).toBe('PUT');
    expect(JSON.parse(options.body)).toMatchObject({ notes: 'Updated', plannedDate: '2025-03-01' });
  });
});

describe('deleteStop()', () => {
  test('sends DELETE to /itinerary/:id', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ ok: true, status: 204, json: () => Promise.resolve(null) });
    vi.stubGlobal('fetch', mockFetch);

    const { deleteStop } = await import('./itinerary');
    await deleteStop('stop-1');

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toContain('/itinerary/stop-1');
    expect(options.method).toBe('DELETE');
  });
});
