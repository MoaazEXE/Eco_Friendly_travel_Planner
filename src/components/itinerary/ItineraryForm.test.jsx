import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ItineraryForm from './ItineraryForm';

const defaultForm = {
  destination: '',
  travelDate: '',
  notes: '',
  interests: ['nature'],
  budget: 250,
};

describe('ItineraryForm', () => {
  test('renders destination input', () => {
    render(
      <ItineraryForm
        form={defaultForm}
        onFormChange={() => {}}
        onToggleInterest={() => {}}
        onBudgetChange={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(screen.getByPlaceholderText(/e.g. KL, Penang/i)).toBeInTheDocument();
  });

  test('renders notes textarea', () => {
    render(
      <ItineraryForm
        form={defaultForm}
        onFormChange={() => {}}
        onToggleInterest={() => {}}
        onBudgetChange={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(screen.getByPlaceholderText(/bring reusables/i)).toBeInTheDocument();
  });

  test('renders all four interest buttons', () => {
    render(
      <ItineraryForm
        form={defaultForm}
        onFormChange={() => {}}
        onToggleInterest={() => {}}
        onBudgetChange={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(screen.getByRole('button', { name: /nature/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /culture/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /food/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cycling/i })).toBeInTheDocument();
  });

  test('calls onFormChange with field and value when destination is typed', () => {
    const onFormChange = vi.fn();
    render(
      <ItineraryForm
        form={defaultForm}
        onFormChange={onFormChange}
        onToggleInterest={() => {}}
        onBudgetChange={() => {}}
        onSubmit={() => {}}
      />
    );
    fireEvent.change(screen.getByPlaceholderText(/e.g. KL, Penang/i), {
      target: { value: 'Penang' },
    });
    expect(onFormChange).toHaveBeenCalledWith('destination', 'Penang');
  });

  test('calls onToggleInterest with value when an interest button is clicked', () => {
    const onToggleInterest = vi.fn();
    render(
      <ItineraryForm
        form={defaultForm}
        onFormChange={() => {}}
        onToggleInterest={onToggleInterest}
        onBudgetChange={() => {}}
        onSubmit={() => {}}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /culture/i }));
    expect(onToggleInterest).toHaveBeenCalledWith('culture');
  });

  test('calls onSubmit when the form is submitted', () => {
    const onSubmit = vi.fn((e) => e.preventDefault());
    render(
      <ItineraryForm
        form={defaultForm}
        onFormChange={() => {}}
        onToggleInterest={() => {}}
        onBudgetChange={() => {}}
        onSubmit={onSubmit}
      />
    );
    fireEvent.submit(screen.getByRole('button', { name: /find spots/i }).closest('form'));
    expect(onSubmit).toHaveBeenCalled();
  });

  test('displays current budget value', () => {
    render(
      <ItineraryForm
        form={{ ...defaultForm, budget: 500 }}
        onFormChange={() => {}}
        onToggleInterest={() => {}}
        onBudgetChange={() => {}}
        onSubmit={() => {}}
      />
    );
    expect(screen.getByText(/RM 500/)).toBeInTheDocument();
  });
});
