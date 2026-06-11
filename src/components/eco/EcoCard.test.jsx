import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import EcoCard from './EcoCard';

vi.mock('../../data/ecoOptions', () => ({
  CITY_LABELS: { kl: 'Kuala Lumpur', penang: 'Penang', melaka: 'Melaka', sabah: 'Sabah' },
}));

const item = {
  id: 1,
  name: 'Green Leaf Boutique',
  city: 'kl',
  category: 'Accommodation',
  eco: 5,
  desc: 'Solar-powered eco-resort.',
  image: 'https://example.com/img.jpg',
};

describe('EcoCard', () => {
  test('renders item name', () => {
    render(<EcoCard item={item} isFavourite={false} onToggleFavourite={() => {}} />);
    expect(screen.getByText('Green Leaf Boutique')).toBeInTheDocument();
  });

  test('renders city label', () => {
    render(<EcoCard item={item} isFavourite={false} onToggleFavourite={() => {}} />);
    expect(screen.getByText('Kuala Lumpur')).toBeInTheDocument();
  });

  test('renders category badge', () => {
    render(<EcoCard item={item} isFavourite={false} onToggleFavourite={() => {}} />);
    expect(screen.getByText('Accommodation')).toBeInTheDocument();
  });

  test('renders description', () => {
    render(<EcoCard item={item} isFavourite={false} onToggleFavourite={() => {}} />);
    expect(screen.getByText('Solar-powered eco-resort.')).toBeInTheDocument();
  });

  test('favourite button title changes based on isFavourite prop', () => {
    const { rerender } = render(
      <EcoCard item={item} isFavourite={false} onToggleFavourite={() => {}} />
    );
    expect(screen.getByTitle('Add to favourites')).toBeInTheDocument();

    rerender(<EcoCard item={item} isFavourite={true} onToggleFavourite={() => {}} />);
    expect(screen.getByTitle('Remove from favourites')).toBeInTheDocument();
  });

  test('calls onToggleFavourite when heart button is clicked', () => {
    const handler = vi.fn();
    render(<EcoCard item={item} isFavourite={false} onToggleFavourite={handler} />);
    fireEvent.click(screen.getByTitle('Add to favourites'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
