import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ECO_OPTIONS, CITY_LABELS } from '../data/ecoOptions';
import ItineraryForm from '../components/itinerary/ItineraryForm';
import RecommendationsList from '../components/itinerary/RecommendationsList';
import SavedItinerary from '../components/itinerary/SavedItinerary';
import '../styles/itinerary.css';

export default function ItineraryPage() {
  const { savedPlan, addStop, removeStop, updateStop } = useAppContext();

  const [form, setForm] = useState({
    destination: '',
    travelDate: '',
    notes: '',
    interests: ['nature'],
    budget: 250,
  });
  const [recommendations, setRecommendations] = useState(null);
  const [planError, setPlanError]             = useState('');
  const [editingKey, setEditingKey]           = useState(null);
  const [editForm, setEditForm]               = useState({ notes: '', plannedDate: '' });

  function handleFormChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function toggleInterest(value) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(value)
        ? f.interests.filter((i) => i !== value)
        : [...f.interests, value],
    }));
  }

  function handleBudgetChange(e) {
    const value = Number(e.target.value);
    setForm((f) => ({ ...f, budget: value }));
    e.target.style.setProperty('--slider-fill', `${(value / 1000) * 100}%`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const input = form.destination.toLowerCase().trim();
    const filtered = ECO_OPTIONS.filter((item) => {
      const cityLabel = (CITY_LABELS[item.city] || '').toLowerCase();
      const matchesCity = item.city === input || cityLabel === input;
      return matchesCity && item.budget <= form.budget && form.interests.includes(item.type);
    });
    setRecommendations(filtered);
    setPlanError('');
  }

  async function addToPlan(id) {
    if (!form.travelDate) {
      setPlanError('Please select a Date of Visit first!');
      return;
    }
    const duplicate = savedPlan.some((p) => p.id === id && p.plannedDate === form.travelDate);
    if (duplicate) {
      setPlanError('This activity is already in your plan for this date!');
      return;
    }
    setPlanError('');
    try {
      await addStop({ ecoOptionId: id, plannedDate: form.travelDate, notes: form.notes });
    } catch (err) {
      setPlanError(err.message || 'Failed to add stop. Please try again.');
    }
  }

  async function removeFromPlan(_id) {
    try {
      await removeStop(_id);
    } catch {
      setPlanError('Failed to remove stop. Please try again.');
    }
  }

  function startEdit(item) {
    setEditingKey(item._id);
    setEditForm({ notes: item.notes || '', plannedDate: item.plannedDate });
  }

  async function saveEdit(_id) {
    try {
      await updateStop(_id, editForm);
      setEditingKey(null);
    } catch {
      setPlanError('Failed to update stop. Please try again.');
    }
  }

  function handleEditChange(field, value) {
    setEditForm((f) => ({ ...f, [field]: value }));
  }

  return (
    <main className="eco-inner-page">
      <div className="container">
        <div className="mb-4">
          <h1 className="eco-page-title">Plan Your Green Journey</h1>
          <p className="eco-lead">Discover sustainable destinations, compare eco-impact, and build an itinerary that&apos;s good for you — and the planet.</p>
        </div>

        <ItineraryForm
          form={form}
          onFormChange={handleFormChange}
          onToggleInterest={toggleInterest}
          onBudgetChange={handleBudgetChange}
          onSubmit={handleSubmit}
        />

        <div className="row g-4 align-items-start">
          <div className="col-lg-7">
            <RecommendationsList
              recommendations={recommendations}
              planError={planError}
              onAdd={addToPlan}
            />
          </div>
          <div className="col-lg-5">
            <SavedItinerary
              savedPlan={savedPlan}
              editingKey={editingKey}
              editForm={editForm}
              onEdit={startEdit}
              onSave={saveEdit}
              onCancel={() => setEditingKey(null)}
              onRemove={removeFromPlan}
              onEditChange={handleEditChange}
            />
          </div>
        </div>

      </div>
    </main>
  );
}
