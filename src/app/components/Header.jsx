import React from 'react';
import { connect } from 'react-redux';

import * as All from '../actions/All';
import { getScore, getVector } from '../../cvss4';

const Header = ({
  root: {
    cvss4: { metrics },
  },
  resetScore,
}) => {
  const currentVector = getVector(metrics);
  const currentScore = getScore(metrics);

  return (
    <header style={{ marginTop: '7rem' }}>
      <div className="container fixed-top bg-body">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 border-bottom">
            <div className="d-flex justify-content-between align-self-center">
              <span className="display-5">CVSS 4.0</span>
              <span className="display-5 text-end">
                Score:{currentScore.toFixed(1)}
              </span>
            </div>

            <div className="input-group input-group-sm my-2">
              <button
                className="btn btn-outline-secondary"
                data-testid="button-copy-vector"
                type="button"
                onClick={() =>
                  // eslint-disable-next-line
                  window.prompt(
                    'Copy to clipboard: Ctrl+C, Enter',
                    currentVector
                  )
                }
              >
                Copy
              </button>

              <input
                className="form-control"
                value={currentVector}
                type="text"
                readOnly
              />

              <button
                className="btn btn-outline-danger"
                data-testid="button-reset-score"
                onClick={() => resetScore()}
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  root: state,
});

const mapDispatchToProps = {
  ...All,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
