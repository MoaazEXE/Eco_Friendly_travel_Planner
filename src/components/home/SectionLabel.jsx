import PropTypes from 'prop-types';
import { Leaf } from 'lucide-react';

export default function SectionLabel({ children, dark }) {
  return (
    <div className={dark ? 'section-label-dark' : 'section-label'} style={{ marginBottom: '1.25rem' }}>
      <Leaf size={12} />
      {children}
    </div>
  );
}

SectionLabel.propTypes = {
  children: PropTypes.node.isRequired,
  dark:     PropTypes.bool,
};

SectionLabel.defaultProps = {
  dark: false,
};
