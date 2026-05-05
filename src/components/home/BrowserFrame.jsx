import PropTypes from 'prop-types';

export default function BrowserFrame({ url, children }) {
  return (
    <div className="browser-frame">
      <div className="browser-chrome">
        <div className="d-flex gap-1" style={{ flexShrink: 0 }}>
          <div className="browser-dot browser-dot-red" />
          <div className="browser-dot browser-dot-amber" />
          <div className="browser-dot browser-dot-green" />
        </div>
        <div className="browser-url">ecoway.app/{url}</div>
      </div>
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

BrowserFrame.propTypes = {
  url:      PropTypes.string,
  children: PropTypes.node.isRequired,
};

BrowserFrame.defaultProps = {
  url: '',
};
