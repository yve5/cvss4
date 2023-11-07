import React from 'react';
import { connect } from 'react-redux';

import * as All from '../actions/All';
import { getScore } from '../utils';

const Header = ({
  root: {
    cvss4: { metrics },
  },
  resetScore,
}) => (
  <header style={{ marginTop: '6rem' }}>
    <div className="container fixed-top bg-body">
      <div className="row">
        <div className="col-lg-8 offset-lg-2 border-bottom">
          <div className="row">
            <div className="col-6 fs-3">CVSS v4.0</div>
            <div className="col-6 fs-3 text-end">
              Score : {getScore(metrics)}
            </div>
          </div>
          <div className="row">
            <div className="col-6 fs-3">VECTOR</div>
            <div className="col-6 fs-3 text-end">
              <button
                className="btn btn-sm btn-outline-primary mb-2"
                onClick={() => resetScore(metrics)}
                data-testid="button-reset-score"
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  root: state,
});

const mapDispatchToProps = {
  ...All,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
