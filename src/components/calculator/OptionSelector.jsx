import PropTypes from "prop-types";

export default function OptionSelector({ options, selected, onChange }) {
  return (
    <div className="row g-3 mb-3">
      {options.map((opt) => (
        <div className="col-6 col-md-3" key={opt.key}>
          <button
            type="button"
            className={`btn-eco-selector${selected === opt.key ? " active" : ""}`}
            onClick={() => onChange(opt.key)}
          >
            <opt.icon size={20} className="me-2" style={{ display: "inline" }} />
            {opt.label}
          </button>
        </div>
      ))}
    </div>
  );
}

OptionSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key:   PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon:  PropTypes.elementType.isRequired,
    })
  ).isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
