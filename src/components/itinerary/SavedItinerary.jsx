import PropTypes from 'prop-types';
import { ClipboardList, CalendarCheck, Wallet } from 'lucide-react';
import { groupByDate } from '../../utils/groupByDate';
import PlanCard from './PlanCard';

export default function SavedItinerary({ savedPlan, editingKey, editForm, onEdit, onSave, onCancel, onRemove, onEditChange }) {
  return (
    <section>
      <div className="itin-section-head">
        <span className="itin-step-pill">STEP 3</span>
        <h4 className="itin-section-title">Your Saved Itinerary</h4>
        {savedPlan.length > 0 && (
          <span className="itin-count">
            {savedPlan.length} stop{savedPlan.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {savedPlan.length === 0 ? (
        <div className="itin-empty">
          <div className="itin-empty-icon"><ClipboardList size={40} strokeWidth={1.5} /></div>
          <p className="itin-empty-title">Your plan is empty</p>
          <p className="itin-empty-sub">
            Add eco-spots from the recommendations to start building your green trip.
          </p>
        </div>
      ) : (
        <div className="itin-date-groups">
          {Object.entries(groupByDate(savedPlan)).map(([date, stops]) => {
            const totalBudget = stops.reduce((sum, s) => sum + s.budget, 0);
            const formattedDate = new Date(date).toLocaleDateString('en-GB', {
              weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
            });
            return (
              <div className="itin-date-group" key={date}>
                <div className="itin-date-header">
                  <span className="itin-date-label">
                    <CalendarCheck size={13} strokeWidth={2.5} className="me-1" />
                    {formattedDate}
                  </span>
                  <span className="itin-date-total">
                    <Wallet size={12} strokeWidth={2.5} className="me-1" />
                    RM{totalBudget} total
                  </span>
                </div>
                {stops.map((item) => {
                  const key = `${item.id}-${item.plannedDate}`;
                  return (
                    <PlanCard
                      key={key}
                      item={item}
                      isEditing={editingKey === key}
                      editForm={editForm}
                      onEdit={onEdit}
                      onSave={onSave}
                      onCancel={onCancel}
                      onRemove={onRemove}
                      onEditChange={onEditChange}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

SavedItinerary.propTypes = {
  savedPlan: PropTypes.array.isRequired,
  editingKey: PropTypes.string,
  editForm: PropTypes.shape({
    notes: PropTypes.string.isRequired,
    plannedDate: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onEditChange: PropTypes.func.isRequired,
};
