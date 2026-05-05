import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

export default function FloatingCard({ children, style, delay, animate }) {
  const motionProps = animate
    ? {
        initial:    { opacity: 0, scale: 0.85, y: 10 },
        animate:    { opacity: 1, scale: 1,    y: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
      }
    : {
        initial:     { opacity: 0, scale: 0.85, y: 10 },
        whileInView: { opacity: 1, scale: 1,    y: 0 },
        viewport:    { once: true },
        transition:  { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay },
      };

  return (
    <motion.div {...motionProps} className="floating-card" style={{ ...style }}>
      {children}
    </motion.div>
  );
}

FloatingCard.propTypes = {
  children: PropTypes.node.isRequired,
  style:    PropTypes.object,
  delay:    PropTypes.number,
  animate:  PropTypes.bool,
};

FloatingCard.defaultProps = {
  style:   {},
  delay:   0,
  animate: false,
};
