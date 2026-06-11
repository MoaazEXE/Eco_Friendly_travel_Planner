import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import FavouriteItem from './FavouriteItem';

vi.mock('../../data/ecoOptions', () => ({
  CITY_LABELS: { kl: 'Kuala Lumpur', penang: 'Penang', melaka: 'Melaka', sabah: 'Sabah' },
}));

const item = {
  _id: 'fav-123',
  name: 'Green Leaf Boutique',
  category: 'Accommodation',
  city: 'kl',
};

describe('FavouriteItem', () => {
  test('renders item name', () => {
    render(<FavouriteItem item={item} onRemove={() => {}} />);
    expect(screen.getByText('Green Leaf Boutique')).toBeInTheDocument();
  });

  test('renders category', () => {
    render(<FavouriteItem item={item} onRemove={() => {}} />);
    expect(screen.getByText('Accommodation')).toBeInTheDocument();
  });

  test('renders city label', () => {
    render(<FavouriteItem item={item} onRemove={() => {}} />);
    expect(screen.getByText(/Kuala Lumpur/)).toBeInTheDocument();
  });

  test('calls onRemove with item _id when trash button is clicked', () => {
    const onRemove = vi.fn();
    render(<FavouriteItem item={item} onRemove={onRemove} />);
    fireEvent.click(screen.getByTitle('Remove'));
    expect(onRemove).toHaveBeenCalledWith('fav-123');
  });
});
